class canvas{
  constructor(){
    this.interface = new interfaceUser();
    this.localData = new localData();
    this.signature = false;
    this.canvas = null;
  }
  CreatZoneSignature(element,nom, prenom){
    element.appendChild(this.creaCanvasInfos(nom, prenom));
    element.appendChild(this.creaCanvasSignature());
    element.appendChild(this.creaCanvasSignaturevalide());
  }

  /**
   * message signature
   * @param {string} nom 
   * @param {string} prenom 
   */
  creaCanvasInfos(nom, prenom){
    var p = this.interface.creatDivClassInterface({
      htmlElement:'p',
      contenu:"Bonjour, "+nom+" "+prenom+"<br />Une simple signature pour valider votre réservation"
    });
    return p;
  }

  /**
   * Gestion de la signature
   */
  creaCanvasSignature(){
    let down = false;
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('width','450px');
    this.canvas.setAttribute('height','200px');
    this.canvas.onmousedown = ()=>{
          down = true;
        };
        this.canvas.ontouchstart = ()=>{
          down = true;
          console.log('demo')
        }
        this.canvas.onmouseup = ()=>{
          down = false;
        };
        this.canvas.ontouchend = ()=>{
          down = false;
        };

        this.canvas.onmousemove = (evt)=>{
          let position =  this.getMousePos(this.canvas, evt);
          var ctx = this.canvas.getContext('2d');
          if(down){
            ctx.lineTo(position.x, position.y); //fin de ligne
            this.signature = true;
          }
            ctx.stroke();  // fin de dessin
            ctx.beginPath();// debut de dessin
            ctx.moveTo(position.x, position.y); // debut de ligne
        };
        this.canvas.ontouchmove = (evt)=>{
          let position =  this.getMousePos(this.canvas, evt);
          var ctx = this.canvas.getContext('2d');
          if(down){
            ctx.lineTo(position.x, position.y); //fin de ligne
          }
            ctx.stroke();  // fin de dessin
            ctx.beginPath();// debut de dessin
            ctx.moveTo(position.x, position.y); // debut de ligne
        };
        
    return this.canvas;
  }

  /**
   * Création des boutons et vérification signature
   */
  creaCanvasSignaturevalide(){
    let div = this.interface.creatDivClassInterface({
      htmlElement:'div',
      className:"flex-container",
      idName:"canvasZoneBt"
    });
    let btClean = this.interface.creatDivClassInterface({
        htmlElement:'button',
        contenu:'Effacer',
        idName:'effacer',
        className:'bt',
        elementParent:div
      });
      btClean.addEventListener('click',()=>{
          this.clearCanvas();
          this.signature = false;
      })
    let btValider = this.interface.creatDivClassInterface({
      htmlElement:'button',
      contenu:'Valider',
      idName:'valider',
      className:'bt',
      elementParent:div
    });
    btValider.addEventListener('click',()=>{
      if(this.signature){
        this.localData.localStorageAdd({
          reservationSignature:'OK'
        });
        localStorage.setItem('signatureZone','none');
        document.location.reload(true);
      }else{
        this.canvas.style.border ='2px solid red';
      }
     
      
    })
    let btAnnuler = this.interface.creatDivClassInterface({
      htmlElement:'button',
      contenu:'Annuler',
      idName:'annuler',
      className:'bt',
      elementParent:div
    });
    btAnnuler.addEventListener('click',()=>{
      this.localData.localStorageRemouve();
      document.location.reload(true);
    });
    return div;
  }
    /**
     * récup la position du curseur dans le canvas
     * taille canvas - postion top et left
     * @param {HTML_Element} canvas 
     * @param {Event} evt 
     */
    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect(); //position du canvas dans la page 
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
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
