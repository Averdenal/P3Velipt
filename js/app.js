document.addEventListener("DOMContentLoaded", function(){
  new carousel(document.querySelector('#slider')).play()
  
  if(localStorage.name !== null && localStorage.signature ==="null"){
    new localData().localStorageRemouve();
  }
  new leafletMaps('#map').initMaps();
  new localData().actualistationReservationInfo(document.querySelector('#infoReservation'));

  let min_menu = document.querySelector('#min__Menu__Icon');
  let active = false;
  min_menu.addEventListener('click',function(){
    let min__menu__open = document.querySelector('#min__Menu');
    if (!active){
      min__menu__open.style.display = 'block';
    }else{
      min__menu__open.style.display = 'none';
    }
    active = !active;
  })
})

