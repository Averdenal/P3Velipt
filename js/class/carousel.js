

class Carousel{
  /**
   * @param  {HTMLElement} element
   * @param  {objetJson} data objet json 
   */
  constructor(element){
    this.interface  = new InterfaceUser();
    let childRoot   = this.interface.createDivClassInterface({className:'carousel',elementParent:element});
    this.container  = this.interface.createDivClassInterface({className:'carouselContainer',elementParent:childRoot});
    this.index      = 0;
    this.data       = new Data();
    this.nbData     = 0;
    this.intervalCarousel   = null;
    this.playinterval       = true;
    this.createCarouselItem(this.container);
    this.createBtn(childRoot);
    document.addEventListener('keydown',(e)=>
    {
      this.controlKeyboard(e);
    });
  }

  createCarouselItem(container){
    this.data.getDataCarousel().forEach(element => {
      let item = this.interface.createDivClassInterface({htmlElement:'figure',className:'carouselItem',elementParent:container});
      this.interface.createImgInterface({src:element.URL,elementParent:item});
      this.interface.createDivClassInterface({htmlElement:'figcaption',className:'carouselItemInfo',elementParent:item,contenu:'<h2>'+element.titre+'</h2><p>'+element.textInfo+'</p>'});
      this.nbData++;
    });
  }

  createBtn(elementParent){
    let prev = this.interface.createDivClassInterface({className:'carouselPrev',elementParent:elementParent});
    prev.addEventListener('click',this.prev.bind(this));
    let next = this.interface.createDivClassInterface({className:'carouselNext',elementParent:elementParent});
    next.addEventListener('click',this.next.bind(this));
    let play = this.interface.createDivClassInterface({className:'carouselPlayStop',elementParent:elementParent});
    play.addEventListener('click',this.play.bind(this));
  }

  controlKeyboard(e){
    switch(e.code){
      case 'KeyP':
        this.play()
        break;
      case 'ArrowRight':
        this.next()
        break;
      case 'ArrowLeft':
        this.prev();
        break;
    }
  }

  next(){
    this.index++

    //retoure au début
    if(this.index === this.nbData){
      this.index = 0
    }
    let translateX = - (this.index * (100/ this.nbData))
    this.container.style.transform = "translate3d("+ translateX +"%,0,0)"
  } 
  
  prev(){
    this.index--
    if(this.index === -1){
      this.index = this.nbData -1
    }
    let translateX = -(this.index * (100/ this.nbData))
    this.container.style.transform = "translate3d("+ translateX +"%,0,0)"
  } 
  
  play(){
    if(!this.playinterval){
      clearInterval(this.intervalCarousel)
      this.playinterval = !this.playinterval
    }else{
      document.getElementById('animIcon')
      this.intervalCarousel = setInterval(()=>{
        this.index++
        if(this.index === this.nbData){
          this.index = 0
        }
        let translateX = - (this.index * (100/ this.nbData))
        this.container.style.transform = "translate3d("+ translateX +"%,0,0)"
      },5000)
      this.playinterval = !this.playinterval
    }   
  }
}