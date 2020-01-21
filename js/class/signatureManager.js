"use strict";
class SignatureManager{
  constructor(){
    this.interface = new InterfaceUser();
    this.signature = new Signature();
  }

  CreatZoneSignature(element,nom, prenom){
    this.interface.createDivClassInterface({
      htmlElement:'p',
      contenu:"Bonjour, "+nom+" "+prenom+"<br />Une simple signature pour valider votre réservation",
      elementParent:element
    });

    element.appendChild(this.signature.creaCanvasSignature());
    element.appendChild(this.creaCanvasSignaturevalide());
  }
  /**
   * Création des boutons et vérification signature
   */
  creaCanvasSignaturevalide(){
    let div = this.interface.createDivClassInterface({
      htmlElement:'div',
      className:"flex-container",
      idName:"canvasZoneBt"
    });
    let btClean = this.interface.createDivClassInterface({
        htmlElement:'button',
        contenu:'Effacer',
        idName:'effacer',
        className:'bt',
        elementParent:div
      });
      btClean.addEventListener('click',()=>{this.signature.effacer();})

    let btValider = this.interface.createDivClassInterface({
      htmlElement:'button',
      contenu:'Valider',
      idName:'valider',
      className:'bt',
      elementParent:div
    });
    btValider.addEventListener('click',()=>{this.signature.valider();})

    let btAnnuler = this.interface.createDivClassInterface({
      htmlElement:'button',
      contenu:'Annuler',
      idName:'annuler',
      className:'bt',
      elementParent:div
    });
    btAnnuler.addEventListener('click',()=>{this.signature.annuler();});
    return div;
  }

    
}