"use strict";
class Signature{

    constructor(){
        this.canvas = null;
        this.localData = new LocalData();
        this.signature = false;
        this.down = false;
    }

    creaCanvasSignature(){
      this.canvas = document.createElement('canvas');
      this.canvas.setAttribute('width','450px');
      this.canvas.setAttribute('height','200px');
  
      this.canvas.onmousedown = () =>{this.debutClick();}
      this.canvas.onmouseup = () =>{this.finClick();}
      this.canvas.onmousemove = (evt)=>{this.moveClick(evt);};
  
      this.canvas.ontouchstart = () =>{this.debutClick();}
      this.canvas.ontouchend = () =>{this.finClick();}
      this.canvas.ontouchmove = (evt)=>{this.moveClick(evt);};
          
      return this.canvas;
    }
    
    debutClick(){this.down = true;}
  
    finClick(){this.down = false;}
  
    moveClick(evt){
      let position =  this.getMousePos(this.canvas, evt);
      var ctx = this.canvas.getContext('2d');
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
            x: evt.targetTouches['0'].clientX - rect.left,
            y: evt.targetTouches['0'].clientY - rect.top
          };
        }
    }

    valider(){
      if(this.signature){
        
        let time = new Date().getTime();
        this.localData.addSessionStorageReservation({
          signature:true,
          dateReservation:time
        });
        document.location.reload(true);
      }else{
        this.canvas.style.border = '2px solid red';
      }
    }

    annuler(){
      this.localData.sessionStorageRemove();
      document.location.reload(true);
    }

    effacer(){
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