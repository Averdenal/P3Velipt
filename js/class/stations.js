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
        canvas.setAttribute('width','400px')
        canvas.setAttribute('height','200px')
        canvas.addEventListener('mousedown',function(){
          let down = true
          canvas.onmousemove = function(evt){
            canvas.onmouseup = function(){
              down = false
            }
            if(down){
              var context = canvas.getContext('2d');
              let position =  getMousePos(canvas, evt)
              context.fillStyle = "#000000"
              context.fillRect (position.x, position.y, 4, 4)
            }
          }     
          
        })

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
        $Reservation.appendChild(canvas)
        $Reservation.appendChild(btinput)
  
      }
      
      var $veloDispoStation = document.querySelector('#veloDispoStation')
      razElement($veloDispoStation)
      var htmlVeloDispo = "<p>Vélo disponible.s : "+this.veloDispo+"/"+this.maxPlaces+"</p>"
      $veloDispoStation.innerHTML = htmlVeloDispo
    }
  }