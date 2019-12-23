class Station{

    constructor(number,name,adresse,position,status, veloDispo, maxPlaces){
      this.localData = new localData();
      this.interface = new interfaceUser();
      this.canvas = new canvas();
      this.htmlContruction = new htmlCreation();
      this.number = number;
      this.name = this.nameChange(name);
      this.adresse = adresse;
      this.position = position;
      this.status = status;
      this.veloDispo = veloDispo;
      this.maxPlaces = maxPlaces;
    }

    
    colorChoix(veloDispo,maxPlaces,element){
      if ((veloDispo/maxPlaces)> 0.5){
        element.style.backgroundColor = "green"
      }else if(((veloDispo/maxPlaces)< 0.5) && ((veloDispo/maxPlaces)>= 0.25)) {
        element.style.backgroundColor = "orange"
      }else{
        element.style.backgroundColor = "red"
      }
    }

    /**
     * retire les infos nombre du nom
     * @param {string} name 
     */
    nameChange(name){
      switch(name.substr(0,1)){
        case '#':
          name = name.substr(7)
          break;
        case '0':
          name = name.substr(6)
          break;
      }
      if (name.substr(0, 1) === "-"){
        name = name.substr(1)
      }
      return name
    }

    HTML_Contruction(){
      var tabInfoZone = [
        {query:'#nbStation',contenu:"Station : "+this.number},
        {query:'#nomStation',contenu:this.name},
        {query:'#addressStation',contenu:"Adresse : <br />"+this.adresse},
        {query:'#veloDispoStation',contenu:"Vélo disponible.s : "+this.veloDispo+"/"+this.maxPlaces}];

      tabInfoZone.forEach(element => {
        var $element = document.querySelector(element.query);
        this.interface.creatDivClassInterface({
          htmlElement:'p',
          contenu:element.contenu,
          raz:true,
          elementParent:$element
        });
      });
      
      var $Reservation = document.querySelector('#reservation')
      this.interface.actualisationHtmlElement($Reservation)
      if(localStorage.getItem('signature') === null && this.veloDispo >0){
        var tabinfo = [
          {placeholder:'votre nom',id:'nom'},
          {placeholder:'votre prénom',id:'prenom'}];
          
        tabinfo.forEach(element => {
          this.interface.creatDivClassInterface({
            htmlElement:'input',
            elementParent:$Reservation,
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