class leafletMaps{
    constructor(){
        this.map = null
        this.bounds = []
        this.station = null
    }
    /**
     * chargement de la map
     * @param {HTML_Element} element 
     */
    async laod(element){
        return new Promise((resolve,reject) => {
            this.map = L.map(element)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
            {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map)
            resolve()
        })
    }
    /**
     * ajout d'un marker sur la carte
     * @param {int} lat 
     * @param {int} lng 
     * @param {int} maxPlaces 
     * @param {int} veloDispo 
     */
    addMarket(station){
      if(station.status !== "CLOSED"){
        this.bounds.push(station.position)
        L.marker(station.position,{
          icon: this.selectIcon(station.veloDispo,station.maxPlaces)
        })
        .on('click', function(){
          station.HTML_Contruction()
        })
        .addTo(this.map);
      }
    }
    /**
     * selection du marker
     * @param {int} veloDispo 
     * @param {int} maxPlaces 
     */
    selectIcon(veloDispo,maxPlaces){
      let urlIcon = null
      if(veloDispo/maxPlaces >0.5){
        urlIcon = 'imgs/icons/good.png'
      }else if((veloDispo/maxPlaces >0.25)&&(veloDispo/maxPlaces)<=0.5){
        urlIcon = 'imgs/icons/ok.png'
      }else if((veloDispo/maxPlaces <= 0.25)&&(veloDispo/maxPlaces >0)){
        urlIcon = 'imgs/icons/bad.png'
      }else{
        urlIcon = 'imgs/icons/marker.png'
      }
      var myIcon = L.icon({
        iconUrl: urlIcon,
        iconSize: [38, 38],
        iconAnchor: [22, 38],
        
      });
    return myIcon
    }
    /**
     * center la carte avec le groupe de marker
     */
    centre(){
      this.map.fitBounds(this.bounds)
    }
}

class Station{

    constructor(number,name,adresse,position,status, veloDispo, maxPlaces){
      this.number = number
      this.name = this.nameChange(name)
      this.adresse = adresse
      this.position = position
      this.status = status
      this.veloDispo = veloDispo
      this.maxPlaces = maxPlaces
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
      if(name.substr(0,1) ==='#'){
        name = name.substr(7)
        if (name.substr(0, 1) === "-"){
          name = name.substr(1)
        }
      }else if(name.substr(0,2) ==='00'){
        name = name.substr(6)
      }
      return name
    }

    HTML_Contruction(){

      var $nbStation = document.querySelector('#nbStation')
      razElement($nbStation)
      var htmlNbStation = "<p><span>Station : "+this.number+"</span></p>"
      $nbStation.innerHTML = htmlNbStation

      var $nomStation = document.querySelector('#nomStation')
      razElement($nomStation)
      var htmlNomStation = "<p>"+this.name+"</p>"
      $nomStation.innerHTML = htmlNomStation

      var $addressStation = document.querySelector('#addressStation')
      razElement($addressStation)
      var htmlAddressStation = "<p>Adresse : <br />"+this.adresse+"</p>"
      $addressStation.innerHTML = htmlAddressStation


      var $Reservation = document.querySelector('#reservation')
      razElement($Reservation)

      var nominput = document.createElement('input')
      nominput.placeholder ="Votre nom"
      nominput.setAttribute('id','nom')

      var prenominput = document.createElement('input')
      prenominput.placeholder ="Votre Prénom"
      prenominput.setAttribute('id','prenom')

      var btinput = document.createElement('input')
      btinput.type = 'submit'
      btinput.textContent ="réserver"


      $Reservation.appendChild(nominput)
      $Reservation.appendChild(prenominput)
      $Reservation.appendChild(btinput)


      var $veloDispoStation = document.querySelector('#veloDispoStation')
      razElement($veloDispoStation)
      var htmlVeloDispo = "<p>Vélo disponible.s : "+this.veloDispo+"/"+this.maxPlaces+"</p>"
      $veloDispoStation.innerHTML = htmlVeloDispo
      


      
     
      
      
      
    }
  }