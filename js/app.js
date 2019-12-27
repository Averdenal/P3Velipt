document.addEventListener("DOMContentLoaded", function(){
 new app().init();
})

class app{
  constructor(){
    this.reservation = new reservation();
    this.map = new leafletMaps('#map');
    this.carousel = new carousel(document.querySelector('#slider'));
    this.localData = new localData();
  }
  init(){
    var test = new interfaceUser();
    console.log(test.compteARebours({interval:60000*30}))
    this.carousel.play()
  
    if(localStorage.name !== null && localStorage.signature ==="null"){
      this.localData.localStorageRemouve();
    }
    this.map.initMaps();
    this.reservation.actualistationReservationInfo(document.querySelector('#infoReservation'));
  
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
  }
  
}

