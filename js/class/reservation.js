class reservation{
    constructor(){
        this.interface = new interfaceUser();
        this.localData = new localData();
        this.nom = localStorage.getItem('nom');
        this.prenom = localStorage.getItem('prenom');
        this.signature = localStorage.getItem('signature');
    }

    footerInformationReservationActif($element){
        if( this.signature === 'OK'){
            var time = new Date().getTime()
            if(time < parseInt(localStorage.getItem('resaTime')) + (30*60000)){
                var restantTime = (((parseInt(localStorage.getItem('resaTime'))+(30*60000))- time)/60000).toFixed(0)
                this.interface.creatDivClassInterface({
                    htmlElement:'p',
                    contenu: this.nom+" "+this.prenom + ". Votre reservation de vélo sur la station "+localStorage.getItem('resaStation')+" reste active pendant "+restantTime+"min",
                    elementParent:$element
                })

                var btback = this.interface.creatDivClassInterface({
                    htmlElement:'button',
                    className:'btBack',
                    contenu:'Annuler',
                    elementParent:$element});
    
                btback.addEventListener('click',()=>{
                    this.localData.infoResaRemove($element)
                });
            }else{
                this.localData.infoResaRemove($element);
            }
            
        }
    }
    actualistationReservationInfo($inforesa){
        setInterval(()=>{
            this.interface.razHtmlElement($inforesa);
            this.footerInformationReservationActif($inforesa);
        },1000);
    }
    uiReservation($element){
        this.interface.razHtmlElement($element)
        if(localStorage.getItem('signature') === null && this.veloDispo >0){
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
            elementParent:$Reservation,
            contenu:"réserver"
          });
          btinput.addEventListener('click',()=>{
            var prenom = document.getElementById('prenom');
            var nom = document.getElementById('nom');
            nom.value = nom.value.toUpperCase();
            if(prenom.value !== "" && nom.value !== ""){
    
              this.htmlContruction.changeBodyFilter();
    
              this.localData.localStorageAdd({
                resevationNomStation:this.name,
                reservationDate:new Date().getTime(),
                reservationNom:nom.value,
                reservationPrenom:prenom.value
              });
    
              var canvaszone = document.getElementById('canvas');
              canvaszone.style.display = "flex";          
              this.canvas.CreatZoneSignature(canvaszone,nom.value, prenom.value);
            }else{
              this.interface.verifInputVide(prenom);
              this.interface.verifInputVide(nom);
            }
          })
        }  

    }
}