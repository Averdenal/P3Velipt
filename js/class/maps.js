class leafletMaps{
    constructor(){
        this.map = null;
        this.bounds = [];
        this.station = null;
        this.URL = "https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=096983f1e05f95e3c792a500e2499e840cf58f2d";
        this.$map = document.querySelector('#map');

    }

    initMaps(){
      this.load(this.$map);
      var reponse = $.getJSON(this.URL)
      .always(()=>{
        reponse.responseJSON.forEach(element => {
          var station = new Station(element.number,element.name, element.address, element.position, element.status, element.available_bikes, element.bike_stands);
          this.addMarket(station);
        });
        this.centre();
      });
    }
    /**
     * chargement de la map
     * @param {HTML_Element} element 
     */
    async load(element){
        return new Promise((resolve,reject) => {
            this.map = L.map(element)
            this.map.options.minZoom =13;
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
     * switc
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
        iconAnchor: [38, 38],
        
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