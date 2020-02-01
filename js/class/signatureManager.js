
class SignatureManager{
  constructor(){
    this.interface = new InterfaceUser();
    this.signature = new Signature();
  }

  CreateZoneSignature(element,nom, prenom){
    this.interface.createDivClassInterface({
      htmlElement:'p',
      contenu:"Bonjour, "+nom+" "+prenom+"<br />Une simple signature pour valider votre réservation",
      elementParent:element
    });

    element.appendChild(this.signature.createSignatureCanvas());
    element.appendChild(this.createCanvasSignaturevalide());
  }
  /**
   * Création des boutons et vérification signature
   */
  createCanvasSignaturevalide(){
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
      btClean.addEventListener('click',()=>{this.signature.delete();})

    let btValider = this.interface.createDivClassInterface({
      htmlElement:'button',
      contenu:'Valider',
      idName:'valider',
      className:'bt',
      elementParent:div
    });
    btValider.addEventListener('click',()=>{this.signature.check();})

    let btAnnuler = this.interface.createDivClassInterface({
      htmlElement:'button',
      contenu:'Annuler',
      idName:'annuler',
      className:'bt',
      elementParent:div
    });
    btAnnuler.addEventListener('click',()=>{this.signature.cancel();});
    return div;
  }

    
}