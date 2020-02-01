
class Signature{

    constructor(){
        this.canvas = null;
        this.localData = new LocalData();
        this.signature = false;
        this.down = false;
    }

    createSignatureCanvas(){
      this.canvas = document.createElement('canvas');
      this.canvas.setAttribute('width','350px');
      this.canvas.setAttribute('height','200px');
  
      this.canvas.onmousedown = () =>{this.startClick();}
      this.canvas.onmouseup = () =>{this.endClick();}
      this.canvas.onmousemove = (evt)=>{this.moveClick(evt);};
  
      this.canvas.ontouchstart = () =>{this.startClick();}
      this.canvas.ontouchend = () =>{this.endClick();}
      this.canvas.ontouchmove = (evt)=>{this.moveClick(evt);};
          
      return this.canvas;
    }
    
    startClick(){this.down = true;}
  
    endClick(){this.down = false;}

    moveClick1(evt) {
      evt.preventDefault();
      var touches = evt.changedTouches;
      var ctx = this.canvas.getContext('2d');
      ctx.lineWidth = 4;
            
      for (var i=0; i<touches.length; i++) {
        var color = colorForTouch(touches[i]);
        var idx = ongoingTouchIndexById(touches[i].identifier);
    
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
        ctx.lineTo(touches[i].pageX, touches[i].pageY);
        ctx.closePath();
        ctx.stroke();
        ongoingTouches.splice(idx, 1, touches[i]);  // mettre à jour la liste des touchers
      }
    }
    moveClick(evt){
      evt.preventDefault();
      let position =  this.getMousePos(this.canvas, evt);
      var ctx = this.canvas.getContext('2d');
      ctx.closePath();
      if(this.down){
        ctx.lineTo(position.x, position.y); //point d'arrivée
        this.signature = true;
        
      }
        ctx.stroke();  // fin de dessin
        ctx.beginPath();// debut de dessin
        ctx.moveTo(position.x, position.y); //point de départ
    }
    /**
     * récup la position du curseur dans le canvas
     * taille canvas - postion top et left
     * @param {HTML_Element} canvas 
     * @param {Event} evt 
     */
    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect(); //position du canvas dans la page 
        if (evt.type === "mousemove"){
          return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
          };
        }else{
          return {
            x: evt.touches['0'].clientX - rect.left,
            y: evt.touches['0'].clientY - rect.top
          };
        }
    }

    check(){
      if(this.signature){
        
        let time = new Date().getTime();
        this.localData.addSessionStorageReservation({
          signature:'true',
          dateReservation:time
        });
        document.location.reload(true);
      }else{
        this.canvas.style.border = '2px solid red';
      }
    }

    cancel(){
      this.localData.sessionStorageRemove();
      document.location.reload(true);
    }

    delete(){
      this.clearCanvas();
      this.signature = false;
    }

    /**
     * efface ce qui se trouve dans le canvas
     */
    clearCanvas(){
        let canvas = document.querySelector('canvas');
        let context = canvas.getContext('2d');
        context.fillStyle = "#FFF";
        context.fillRect (0, 0, canvas.width, canvas.height);
    }
}