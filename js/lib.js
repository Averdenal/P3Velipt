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

function actualisation(){
    var element = document.querySelector('#infoReservation')
    element.innerHTML =""
}
/**
 * efface les informations dans le localStorage
 * - Nom de la station
 * - Date de réservation (ms)
 * - Prénom
 * - Nom
 */
function infoResaRemove(){
    actualisation()
    localStorage.removeItem('resaStation')
    localStorage.removeItem('resaTime')
    localStorage.removeItem('prenom')
    localStorage.removeItem('nom')

}
/**
 * récup la position du curseur dans le canvas
 * taille canvas - postion top et left
 * @param {HTML_Element} canvas 
 * @param {Event} evt 
 */
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(); //position du canvas du la page 
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}
/**
 * efface ce qui se trouve dans le canvas
 */
function clearCanvas(){
    let canvas = document.getElementById('canvas')
    let context = canvas.getContext('2d');
    context.fillStyle = "#FFF"
    context.fillRect (0, 0, canvas.width, canvas.height)
}