class leafletMaps{
    constructor(){
        this.map = null
        this.bounds = []
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
    addMarket(lat,lng,info){
      let point = [lat,lng]
      this.bounds.push(point)
        L.popup({
            closeButton:false,
            autoClose:false,
            closeOnEscapeKey:false,
            closeOnClick:false,
            className:'popclass'
        })
        .setLatLng(point)
        .setContent(info)
        .openOn(this.map);
    }
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
      this.restant = null
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
      var div = document.createElement("div")
      div.setAttribute('class','js-item')

      var h3 = document.createElement('h3')
      h3.textContent = this.name
      div.appendChild(h3)

      var adresse = document.createElement('p')
      adresse.textContent = "Adresse: " +this.adresse
      div.appendChild(adresse)

      var vel = document.createElement('p')
      vel.setAttribute('class','vDispo')
      vel.textContent = "Vélo disponibles: " +this.veloDispo+"/"+this.maxPlaces
      div.appendChild(vel)
      
      var bt = document.createElement('div')
      bt.setAttribute('class','btStyle')

      var btZone = document.createElement('div')
      btZone.setAttribute('class','btStyle-zone')

      var btR = document.createElement('p')
      btR.textContent = "Réserver"
      bt.appendChild(btR)

      bt.appendChild(btZone)

      var divPour100 =document.createElement('div')
      divPour100.setAttribute("class","restant")
      divPour100.style.width = (this.veloDispo/this.maxPlaces)*100 + "%"
      this.colorChoix(this.veloDispo,this.maxPlaces,divPour100)
      div.appendChild(bt)
      div.appendChild(divPour100)


      return div
    }
  }