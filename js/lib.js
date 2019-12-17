function razElement(element){
    if(element.children.length !== 0){
        element.innerHTML =""
      }
}
btinput.addEventListener('Click',function(){
    var zoneinfo = document.getElementById('infoReservation')
    zoneinfo.innerHTML ="<p>Votre reservation de vélo sur la station"+this.name+" reste active </p>"
})