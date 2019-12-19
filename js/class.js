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
    if(this.index === this.nbData){
      console.log(this.index+" === "+ this.nbData)
      this.index = 0
    }
    let translateX = - (this.index * (100/ this.nbData))
    this.container.style.transform = "translate3d("+ translateX +"%,0,0)"
  } 
  prev(){
    this.index--
    if(this.index === -1){
      console.log(this.index+" === "+ this.nbData)
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
          console.log(this.index+" === "+ this.nbData)
          this.index = 0
        }
        let translateX = - (this.index * (100/ this.nbData))
        this.container.style.transform = "translate3d("+ translateX +"%,0,0)"
      },3000)
      this.playinterval = !this.playinterval
    }   
  }
}

class leafletMaps{
    constructor(){
        this.map = null
        this.bounds = []
        this.station = null
    }
    /**
     * chargement de la map
     * @param {HTML_Element} element 
     */
    async laod(element){
        return new Promise((resolve,reject) => {
            this.map = L.map(element)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
            {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                
            }).addTo(this.map)
            resolve()
        })
    }
    /**
     * ajout d'un marker sur la carte
     * @param {int} lat 
     * @param {int} lng 
     * @param {int} maxPlaces 
     * @param {int} veloDispo 
     */
    addMarket(station){
      if(station.status !== "CLOSED"){
        this.bounds.push(station.position)
        
        L.marker(station.position,{
          icon: this.selectIcon(station.veloDispo,station.maxPlaces)
        })
        .on('click', function(){
          station.HTML_Contruction()
        })
        .addTo(this.map);

      }
    }
    /**
     * selection du marker
     * @param {int} veloDispo 
     * @param {int} maxPlaces 
     */
    selectIcon(veloDispo,maxPlaces){
      let urlIcon = null
      if(veloDispo/maxPlaces >0.5){
        urlIcon = 'imgs/icons/good.png'
      }else if((veloDispo/maxPlaces >0.25)&&(veloDispo/maxPlaces)<=0.5){
        urlIcon = 'imgs/icons/ok.png'
      }else if((veloDispo/maxPlaces <= 0.25)&&(veloDispo/maxPlaces >0)){
        urlIcon = 'imgs/icons/bad.png'
      }else{
        urlIcon = 'imgs/icons/marker.png'
      }
      var myIcon = L.icon({
        iconUrl: urlIcon,
        iconSize: [38, 38],
        iconAnchor: [22, 38],
        
      });
    return myIcon
    }
    /**
     * center la carte avec le groupe de marker
     */
    centre(){
      this.map.fitBounds(this.bounds)
    }
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
      var $nbStation = document.querySelector('#nbStation')
      razElement($nbStation)
      var htmlNbStation = "<p><span>Station : "+this.number+"</span></p>"
      $nbStation.innerHTML = htmlNbStation

      var $nomStation = document.querySelector('#nomStation')
      razElement($nomStation)
      var htmlNomStation = "<p>"+this.name+"</p>"
      $nomStation.innerHTML = htmlNomStation

      var $addressStation = document.querySelector('#addressStation')
      razElement($addressStation)
      var htmlAddressStation = "<p>Adresse : <br />"+this.adresse+"</p>"
      $addressStation.innerHTML = htmlAddressStation

      var $Reservation = document.querySelector('#reservation')
      razElement($Reservation)
      if(localStorage.getItem('resaStation')=== null && this.veloDispo >0){  
        var nominput = document.createElement('input')
        nominput.placeholder ="Votre nom"
        nominput.setAttribute('id','nom')
        nominput.required = true;
  
        var prenominput = document.createElement('input')
        prenominput.placeholder ="Votre Prénom"
        prenominput.setAttribute('id','prenom')
        prenominput.required = true;
        
        var canvas = document.createElement('canvas')
        canvas.setAttribute('id','canvas')

        var btinput = document.createElement('input')
        btinput.type = 'submit'
        btinput.textContent ="réserver"
        btinput.addEventListener('click',()=>{
          var prenom = document.getElementById('prenom').value
          var nom = document.getElementById('nom').value
          if(prenom !== "" && nom !== ""){
            localStorage.setItem('resaTime',new Date().getTime())
            localStorage.setItem('resaStation', this.name)
            localStorage.setItem('prenom',prenom)
            localStorage.setItem('nom', nom)
            document.location.reload(true)            
          }
          
        })
  
        $Reservation.appendChild(nominput)
        $Reservation.appendChild(prenominput)
        //$Reservation.appendChild(newCanvas)
        $Reservation.appendChild(btinput)
  
      }
      

      var $veloDispoStation = document.querySelector('#veloDispoStation')
      razElement($veloDispoStation)
      var htmlVeloDispo = "<p>Vélo disponible.s : "+this.veloDispo+"/"+this.maxPlaces+"</p>"
      $veloDispoStation.innerHTML = htmlVeloDispo
    }
  }
