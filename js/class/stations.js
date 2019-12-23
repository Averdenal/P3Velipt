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
      var $nbStation = document.querySelector('#nbStation')
      this.interface.actualisationHtmlElement($nbStation)
      var htmlNbStation = "<p>Station : "+this.number+"</p>"
      $nbStation.innerHTML = htmlNbStation

      var $nomStation = document.querySelector('#nomStation')
      this.interface.actualisationHtmlElement($nomStation)
      var htmlNomStation = "<p>"+this.name+"</p>"
      $nomStation.innerHTML = htmlNomStation

      var $addressStation = document.querySelector('#addressStation')
      this.interface.actualisationHtmlElement($addressStation)
      var htmlAddressStation = "<p>Adresse : <br />"+this.adresse+"</p>"
      $addressStation.innerHTML = htmlAddressStation

      var $Reservation = document.querySelector('#reservation')
      this.interface.actualisationHtmlElement($Reservation)
      if(localStorage.getItem('signature') === null && this.veloDispo >0){  
        var nominput = document.createElement('input')
        nominput.placeholder ="Votre nom"
        nominput.setAttribute('id','nom')
        nominput.required = true;
  
        var prenominput = document.createElement('input')
        prenominput.placeholder ="Votre Prénom"
        prenominput.setAttribute('id','prenom')
        prenominput.required = true;
        
        var btinput = document.createElement('button')
        btinput.textContent ="réserver"
        btinput.addEventListener('click',()=>{
          this.htmlContruction.changeBodyFilter();
          var prenom = document.getElementById('prenom').value
          var nom = document.getElementById('nom').value
          if(prenom !== "" && nom !== ""){
            this.localData.localStorageAdd({
              resevationNomStation:this.name,
              reservationDate:new Date().getTime(),
              reservationNom:nom,
              reservationPrenom:prenom
            })
            var canvaszone = document.getElementById('canvas');
            localStorage.setItem('signatureZone','flex');
            canvaszone.style.display = localStorage.getItem('signatureZone');          
            this.canvas.CreatZoneSignature(canvaszone,nom, prenom);
          }
        })
  
        $Reservation.appendChild(nominput)
        $Reservation.appendChild(prenominput)
        $Reservation.appendChild(btinput)
        
      }
      
      var $veloDispoStation = document.querySelector('#veloDispoStation')
      this.interface.actualisationHtmlElement($veloDispoStation)
      var htmlVeloDispo = "<p>Vélo disponible.s : "+this.veloDispo+"/"+this.maxPlaces+"</p>"
      $veloDispoStation.innerHTML = htmlVeloDispo
    }
  }