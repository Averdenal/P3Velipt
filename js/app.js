document.addEventListener("DOMContentLoaded", function(){
  new carousel(document.querySelector('#slider')).play()
  
  if(localStorage.name !== null && localStorage.signature ==="null"){
    new localData().localStorageRemouve();
  }
  new leafletMaps().initMaps();
  new localData().actualistationReservationInfo(document.querySelector('#infoReservation'));
})

