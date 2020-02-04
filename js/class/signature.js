"use strict"
class Signature{

    constructor(){
        this.canvas = null;
        this.localData = new LocalData();
        this.signature = false;
        this.down = false;
        this.ctx = null;
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
    
    startClick(){
      this.down = true;
    }
  
    endClick(){
      this.down = false;
      this.ctx.beginPath();
    }


    moveClick(evt){
      
      let position =  this.getMousePos(this.canvas, evt);
      this.ctx = this.canvas.getContext('2d');
      if(this.down){
        this.ctx.lineTo(position.x, position.y);
        this.signature = true;        
      }
      this.ctx.stroke();
      this.ctx.moveTo(position.x, position.y); //point de départ
    }
    /**
     * récup la position du curseur dans le canvas
     * taille canvas - postion top et left
     * @param {HTML_Element} canvas 
     * @param {Event} evt 
     */
    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect(); //position du canvas dans la page 
        if (evt.type == "mousemove"){
          return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
          };
        }else{
          return {
            x: evt.changedTouches[0].clientX - rect.left,
            y: evt.changedTouches[0].clientY - rect.top
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