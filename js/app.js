class App{

  constructor(){
    this.reservation = new ReservationManager();
    this.map = new LeafletMaps('#map');
    this.carousel = new Carousel(document.querySelector('#slider'));
    this.localData = new LocalData();
    this.infoReservation = document.querySelector('#infoReservation');
    this.active = false;
  }

  init(){
    this.carousel.play()
    this.map.initMaps();
    this.reservation.actualistationReservationInfo(this.infoReservation);
    this.minMenu();
  }

  minMenu(){
    let min_menu = document.querySelector('#min__Menu__Icon');
    
    min_menu.addEventListener('click',()=>{
     this.activeMinMenu();
    })
  }
  
  activeMinMenu(){
    let min__menu__open = document.querySelector('#min__Menu');

    if (!this.active){
      min__menu__open.style.display = 'block';
    }else{
      min__menu__open.style.display = 'none';
    }
    return this.active = !this.active;
  }
  
}

