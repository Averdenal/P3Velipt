class canvas{
  constructor(){
    this.interface = new interfaceUser();
    this.localData = new localData();
  }
  CreatZoneSignature(element,nom, prenom){
    element.appendChild(this.creaCanvasInfos(nom, prenom));
    element.appendChild(this.creaCanvasSignature());
    element.appendChild(this.creaCanvasSignaturevalide());
  }
  creaCanvasInfos(nom, prenom){
    var p = this.interface.creatDivClassInterface({
      htmlElement:'p',
      contenu:"Bonjour, "+nom+" "+prenom+"<br />Une simple signature pour valider votre réservation"
    });
    return p;
  }
  creaCanvasSignature(){
    var canvas = document.createElement('canvas');
        canvas.setAttribute('width','450px');
        canvas.setAttribute('height','200px');
        canvas.addEventListener('mousedown',()=>{
          let down = true;
          canvas.onmousemove = (evt)=>{
            canvas.onmouseup = ()=>{
              down = false;
            };
            //https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo
            if(down){
                var context = canvas.getContext('2d');
                let position =  this.getMousePos(canvas, evt);
                context.fillStyle = "#000000";
                context.fillRect (position.x, position.y, 4, 4);
            };
          };
        });
    return canvas;
  }

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
      })
    let btValider = this.interface.creatDivClassInterface({
      htmlElement:'button',
      contenu:'Valider',
      idName:'valider',
      className:'bt',
      elementParent:div
    });
    btValider.addEventListener('click',()=>{
      this.localData.localStorageAdd({
        reservationSignature:'OK'
      });
      localStorage.setItem('signatureZone','none');
      document.location.reload(true);
    })
    let btAnnuler = this.interface.creatDivClassInterface({
      htmlElement:'button',
      contenu:'Annuler',
      idName:'annuler',
      className:'bt',
      elementParent:div
    });
    btAnnuler.addEventListener('click',()=>{
      this.localData.localStorageRemouve()
      document.location.reload(true)
    })
    return div
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