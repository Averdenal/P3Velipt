class reservation{
    constructor(){
        this.interface = new interfaceUser();
        this.localData = new localData();
        this.canvas = new canvas();
        this.informationLocal = this.localData.localStorageRead();
    }

    footerInformationReservationActif($element){
        if( this.informationLocal.signature === 'OK'){
            var time = new Date().getTime()
            if(time < parseInt(localStorage.getItem('resaTime')) + (30*60000)){
                var restantTime = ((parseInt(localStorage.getItem('resaTime'))+(30*60000))- time)
                this.interface.creatDivClassInterface({
                    htmlElement:'p',
                    contenu: this.informationLocal.nom+" "+ this.informationLocal.prenom + ". Votre reservation de vélo sur la station "+localStorage.getItem('resaStation')+" reste active pendant "+new Date(restantTime).getMinutes()+":"+new Date(restantTime).getSeconds(),
                    elementParent:$element
                })

                var btback = this.interface.creatDivClassInterface({
                    htmlElement:'button',
                    className:'btBack',
                    contenu:'Annuler',
                    elementParent:$element});
    
                btback.addEventListener('click',()=>{this.localData.localStorageRemove()});
            }else{
                this.localData.localStorageRemove();
            }
            
        }
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
              placeholder:element.placeholder
              
            });
          });     
    
          var btinput = this.interface.creatDivClassInterface({
            htmlElement:'button',
            elementParent:$element,
            contenu:"réserver"
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

          this.localData.localStorageAdd({
            nomStation:nomStation,
            dateReservation:new Date().getTime(),
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