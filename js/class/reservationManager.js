class reservationManager{
    constructor(){
        this.interface = new interfaceUser();
        this.localData = new localData();
        this.canvas = new canvas();
        this.dateReservation = null;
    }

    footerInformationReservationActif($element){
      let myReservation = this.localData.getReservation();
      console.log("test:"+myReservation.isSignatureOK())
      console.log("canceled"+myReservation.isReservationCanceled())
        if(myReservation.isSignatureOK()){
            if(!myReservation.isReservationCanceled()){
              this.interface.creatDivClassInterface({
                    htmlElement:'p',
                    contenu: myReservation.nom+" "+ myReservation.prenom +
                     ". Votre reservation de vélo sur la station "+myReservation.nomStation+
                     " reste active pendant "+myReservation.getDetailTempsRestant().m+":"+myReservation.getDetailTempsRestant().s,
                    elementParent:$element
                })

                var btback = this.interface.creatDivClassInterface({
                    htmlElement:'button',
                    className:'btBack',
                    contenu:'Annuler',
                    elementParent:$element});
    
                btback.addEventListener('click',()=>{this.localData.localStorageRemove({relaod:true})});
            }else{
                this.localData.localStorageRemove();
            }
            
        }
    }
    
    getDateReservation(){
      return parseInt(this.informationLocal.dateReservation)+(30*60000);
    }

    actualistationReservationInfo($inforesa){
        setInterval(()=>{
            this.interface.razHtmlElement($inforesa);
            this.footerInformationReservationActif($inforesa);
        },1000);
    }
    uiReservation($element,veloDispo,nomStation){
        this.interface.razHtmlElement($element);
        if(localStorage.getItem('signature') === null && veloDispo>0){
          var tabinfo = [
            {placeholder:'votre nom',id:'nom'},
            {placeholder:'votre prénom',id:'prenom'}];
            
          tabinfo.forEach(element => {
            this.interface.creatDivClassInterface({
              htmlElement:'input',
              elementParent:$element,
              idName:element.id,
              placeholder:element.placeholder,
              className:'input__Reservation'
              
            });
          });     
    
            let btinput = this.interface.creatDivClassInterface({
            htmlElement:'button',
            elementParent:$element,
            contenu:"Réserver",
            className:'bt__Reservation'
          });
          btinput.addEventListener('click',()=>{this.validationInfo(nomStation);});
        }  

    }
    validationInfo(nomStation){
        var prenom = document.getElementById('prenom');
        var nom = document.getElementById('nom');
        nom.value = nom.value.toUpperCase();
        if(prenom.value !== "" && nom.value !== ""){
          this.interface.changeBodyFilter();
          this.localData.addReservation({
            nomStation:nomStation,
            nom:nom.value,
            prenom:prenom.value
          });

          var canvaszone = document.getElementById('canvas');
          canvaszone.style.display = "flex";          
          this.canvas.CreatZoneSignature(canvaszone,nom.value, prenom.value);
        }else{
          this.interface.verifInputVide(prenom);
          this.interface.verifInputVide(nom);
        }
      
    }
}