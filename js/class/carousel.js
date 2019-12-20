class carousel{
    /**
     * @param  {HTMLElement} element
     * @param  {objetJson} data objet json 
     */
    constructor(element, data){
        this.root = element
        let childRoot = this.creatDivClass('carousel')
        this.container = this.creatDivClass('carousel__Container')
        this.index = 0
        childRoot.appendChild(this.container)
        this.data = data
        this.nbData = 0
        data.forEach(element => {
          let item = this.creatDivClass('carousel__Item')
          let img = document.createElement('img')
          img.src = element.URL
          item.appendChild(img)
          this.container.appendChild(item)
          this.nbData++
        });
        this.root.appendChild(childRoot)
        let prev = this.creatDivClass('carousel__prev')
        prev.addEventListener('click',this.prev.bind(this))
        let next = this.creatDivClass('carousel__next')
        next.addEventListener('click',this.next.bind(this))
        let play = this.creatDivClass('carousel__play')
        play.addEventListener('click',this.play.bind(this))
        childRoot.appendChild(prev)
        childRoot.appendChild(next)
        childRoot.appendChild(play)
        this.intervalCarousel = null
        this.playinterval = true
        
  
        
    }
  /**
   * création div avec class
   * @param {string} className 
   */
    creatDivClass(className){
      let div = document.createElement('div')
      div.setAttribute('class', className)
      return div
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
        this.intervalCarousel = setInterval(()=>{
          this.index++
          if(this.index === this.nbData){
            this.index = 0
          }
          let translateX = - (this.index * (100/ this.nbData))
          this.container.style.transform = "translate3d("+ translateX +"%,0,0)"
        },3000)
        this.playinterval = !this.playinterval
      }   
    }
  }