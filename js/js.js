var sliderData = [{"texte":"demo", "img":""},{"texte":"", "img":""},{"texte":"", "img":""},{"texte":"", "img":""},{"texte":"", "img":""}]
var slider = document.getElementById("slider");


for(var i = 0; i< sliderData.length; i++){
    var imgSlider = document.createElement("img");
    imgSlider.src = sliderData[i].img;
    imgSlider.alt = sliderData[i].texte;
    console.log(sliderData[i].texte);

    var itemSlider = document.createElement("div");
    
    if(i == 2){
        itemSlider.style.backgroundColor = "red";
        itemSlider.style.flex = 10;
    }else{
        itemSlider.style.backgroundColor = "blue";
        itemSlider.style.flex = 1;
    }

    itemSlider.appendChild(imgSlider)

    document.getElementById("slider").appendChild(itemSlider);
}







class Station {
    constructor(Station_velo) {
      this.OnVelo = Station_velo.available_bikes;
      this.name = Station_velo.name;
      this.address = Station_velo.address;
      this.latitude = Station_velo.latitude;
      this.longitude = Station_velo.longitude;
    }

    location_On() {
        if(this.number <=0){
            return false;
        }else{
            return true;
        }
    }
    dispo_message(value){
        if(value){
            return "Vélo disponible";
        }else{
            return "Vélo non disponible";
        }
    }
  }

var infos = [
    {"number":10,
    "contract_name":"nantes",
    "name":"#00010- PICASSO",
    "address":"12, mail Pablo Picasso",
    "position":{"lat":47.216207,"lng":-1.533796},
    "banking":false,
    "bonus":false,
    "bike_stands":40,
    "available_bike_stands":12,
    "available_bikes":28,
    "status":"OPEN",
    "last_update":1574959772000},
    {"number":38,"contract_name":"nantes","name":"#00038-RICORDEAU","address":"Place Alexis-Ricordeau - Chaussée de la Madeleine","position":{"lat":47.2121084631418,"lng":-1.55304912932047},"banking":true,"bonus":false,"bike_stands":40,"available_bike_stands":24,"available_bikes":15,"status":"OPEN","last_update":1574959926000}];

console.log(infos[0].address);