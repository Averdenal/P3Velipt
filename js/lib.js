function razElement(element){
    if(element.children.length !== 0){
        element.innerHTML =""
      }
}

function infoResa(element){
    var nom = localStorage.getItem('nom')
    var prenom = localStorage.getItem('prenom')
    if(localStorage.getItem('resaStation') !== null){
        var time = new Date().getTime()
        if(time < parseInt(localStorage.getItem('resaTime')) + (30*60000)){
            var restantTime = (((parseInt(localStorage.getItem('resaTime'))+(30*60000))- time)/60000).toFixed(0)
            var p = document.createElement('p')
            p.innerHTML = nom+" "+prenom + ". Votre reservation de vélo sur la station "+localStorage.getItem('resaStation')+" reste active pendant "+restantTime+"min"
            element.appendChild(p)

            var btback = document.createElement('button')
            btback.setAttribute('class','btBack')
            btback.textContent = "Annuler"
            btback.addEventListener('click',function(){
                infoResaRemove()
            })
            element.appendChild(btback)
           
 

        }else{
            infoResaRemove()
        }
        
    }
}
function infoResaRemove(){
    var element = document.querySelector('#infoReservation')
    localStorage.removeItem('resaStation')
    localStorage.removeItem('resaTime')
    element.innerHTML =""
}