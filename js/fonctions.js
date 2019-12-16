let URL = "https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=096983f1e05f95e3c792a500e2499e840cf58f2d"
var $info = document.querySelector("#info")

/**
 * initialisation de la map
 */
const initMap = async function(){
  let map = new leafletMaps()
  await map.laod($map) //await - attentre de bon chargement de la map avant de continuer 
  

  var jqxhr = $.getJSON( URL, function() {
    console.debug( "success" );
  })
  .always(() => {

    jqxhr.responseJSON.forEach(element => {
      var station = new Station(element.number,element.name, element.address, element.position, element.status, element.available_bikes, element.bike_stands)
      map.addMarket(station)
    });
    map.centre()
  });
}

let $map = document.querySelector('#map')
if($map !== null){
  initMap()
}