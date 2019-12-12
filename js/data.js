let URL = "https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=096983f1e05f95e3c792a500e2499e840cf58f2d"
var jqxhr = $.getJSON( URL, function() {
    console.log( "success" );
  })
  .always(function() {
    jqxhr.responseJSON.forEach(element => {
      console.log( element );
      var station = new Station(element.name, element.address, element.position, element.status, element.available_bikes, element.bike_stands)
      console.log (station.name)
      $info.appendChild(station.HTML_Contruction())

    });
  });
  
  class Station{

    constructor(name,adresse,position,status, veloDispo, maxPlaces){
      this.name = this.nameChange(name)
      this.adresse = adresse
      this.position = position
      this.status = status
      this.veloDispo = veloDispo
      this.maxPlaces = maxPlaces
      this.restant = null
    }

    
    colorChoix(veloDispo,maxPlaces,element){
      console.log(veloDispo/maxPlaces)
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
      }
      return name
    }

    HTML_Contruction(){
      var div = document.createElement("div")
      this.colorChoix(this.veloDispo,this.maxPlaces,div)
      div.setAttribute('class','js-item')
      div.setAttribute('data-lat',this.position.lat)
      div.setAttribute('data-lng',this.position.lng)
      div.setAttribute('data-dispo',this.veloDispo)
      div.setAttribute('data-maxplaces',this.maxPlaces)
      var p = document.createElement('h3')
      p.textContent = this.name
      div.appendChild(p)
      return div
    }
  }


  let $info = document.querySelector('#info')

  if ($info !== null){
    console.log("present")
  }