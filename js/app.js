let URL = "https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=096983f1e05f95e3c792a500e2499e840cf58f2d"
var dataSlider =
[
    {titre:"Un Clic!",textInfo:"Sur un marcker.", URL:"imgs/sliders/slider1jpg.jpg"},
    {titre:"Un Clic!",textInfo:"Entrez vos informations.", URL:"imgs/sliders/slider1jpg.jpg"},
    {titre:"Un Clic!",textInfo:"Entrez votre signature.", URL:"imgs/sliders/slider1jpg.jpg"}
]
var $info = document.querySelector("#info")

document.addEventListener("DOMContentLoaded", function(){
  let car = new carousel(document.querySelector('#slider'),dataSlider)
  car.play()
  
  if(localStorage.name !== null && localStorage.signature ==="null"){
    new localData().localStorageRemouve();
  }

  /**
 * initialisation de la map
 */
  const initMap = async function(){
    let map = new leafletMaps()
    await map.load($map) //await - attentre de bon chargement de la map avant de continuer 
    var reponse = $.getJSON(URL)
    .always(function(){
      reponse.responseJSON.forEach(element => {
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
  let $inforesa = document.querySelector('#infoReservation')
  new localData().actualistationReservationInfo($inforesa)
})

