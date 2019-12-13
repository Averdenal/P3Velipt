let URL = "https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=096983f1e05f95e3c792a500e2499e840cf58f2d"
var $info = document.querySelector("#info")
/**
 * initialisation de la map
 */
const initMap = async function(){
  let map = new leafletMaps()
  await map.laod($map) //await - attentre de bon chargement de la map avant de continuer 

  var jqxhr = $.getJSON( URL, function() {
    console.log( "success" );
})
.always(() => {

        jqxhr.responseJSON.forEach(element => {
            var station = new Station(element.number,element.name, element.address, element.position, element.status, element.available_bikes, element.bike_stands)
            $info.appendChild(station.HTML_Contruction())
            console.log("A: "+ element.position.lat + "B:" + element.position.lng)
          map.addMarket(element.position.lat,element.position.lng,element.name)
        });

    });
}
let $map = document.querySelector('#map')
if($map !== null){
  initMap()
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
      div.setAttribute('data-lat',this.position.lat)
      div.setAttribute('data-lng',this.position.lng)
      div.setAttribute('data-dispo',this.veloDispo)
      div.setAttribute('data-maxplaces',this.maxPlaces)

      var h3 = document.createElement('h3')
      h3.textContent = this.name
      div.appendChild(h3)
      
      /*var p = document.createElement('p')
      p.textContent = "Station n° " +this.number
      p.setAttribute('class','station')
      div.appendChild(p)*/

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