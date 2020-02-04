"use strict"
class ReservationManager{
    constructor(){
        this.interface = new InterfaceUser();
        this.localData = new LocalData();
        this.canvas = new SignatureManager();
        this.dateReservation = null;
        this.user = this.localData.getReservation();
    }

    footerInformationActivReservation($element){
      let myReservation = this.localData.getReservation();
        if(myReservation.isSignatureOK()){
          if(!myReservation.isCanceled()){
            this.interface.createDivClassInterface({
              htmlElement:'p',
              contenu: myReservation.nom+" "+ myReservation.prenom +
                ". Votre reservation de vélo sur la station "+myReservation.nomStation+
                " reste active pendant "+myReservation.getDetailTimeLeft().m+":"
                +myReservation.getDetailTimeLeft().s,
              elementParent:$element
              })

              var btback = this.interface.createDivClassInterface({
                htmlElement:'button',
                className:'btBack',
                contenu:'Annuler',
                elementParent:$element}
              );
  
              btback.addEventListener('click',()=>{this.localData.sessionStorageRemove({relaod:true})});
          }else{
              this.localData.sessionStorageRemove();
          }
            
        }
    }
    /**
     * actualise la zone réservation footer
     * @param {HTML_Element} $inforesa 
     */
    actualistationReservationInfo($inforesa){
        setInterval(()=>{
            this.interface.razHtmlElement($inforesa);
            this.footerInformationActivReservation($inforesa);
        },1000);
    }
    /**
     * Affiche le zone de réservation
     * @param {HTML_Element} $element 
     * @param {int} veloDispo 
     * @param {string} nomStation 
     */
    uiReservation($element,veloDispo,nomStation){
        this.interface.razHtmlElement($element);
        let myReservation = this.localData.getReservation();
        if(!myReservation.isSignatureOK() && veloDispo>0){
          var tabinfo = [
            {placeholder:'votre nom',id:'nom',value:this.user.nom},
            {placeholder:'votre prénom',id:'prenom',value:this.user.prenom}];
          let $form = this.interface.createDivClassInterface({
            htmlElement:'form',
            elementParent:$element
          })
          tabinfo.forEach(element => {
            this.interface.createDivClassInterface({
              htmlElement:'input',
              elementParent:$form,
              idName:element.id,
              placeholder:element.placeholder,
              className:'input__Reservation',
              required:true,
              value:element.value
              
            });
          });     
    
            let btinput = this.interface.createDivClassInterface({
            htmlElement:'button',
            elementParent:$form,
            contenu:"Réserver",
            className:'bt__Reservation'
          });
          btinput.addEventListener('click',(evt)=>{
            this.validationInfo(nomStation);
            evt.preventDefault();});
            
        }  

    }
    /**
     * vérif input et enregistre les informations de la station dans loueur en local storage
     * @param {string} nomStation 
     */
    validationInfo(nomStation){
        var prenom = document.getElementById('prenom');
        var nom = document.getElementById('nom');
        nom.value = nom.value.toUpperCase();
        if(!this.interface.isEmpty(prenom) && !this.interface.isEmpty(nom)){
          this.interface.changeBodyFilter();
          this.localData.addLocalStorageReservation({
            nom:nom.value,
            prenom:prenom.value
          });
          this.localData.addSessionStorageReservation({
            nomStation:nomStation,
          });

          var canvaszone = document.getElementById('canvas');
          canvaszone.style.display = "flex";          
          this.canvas.CreateZoneSignature(canvaszone,nom.value, prenom.value);
        }
        event.stopPropagation();
    }
}