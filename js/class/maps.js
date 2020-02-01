
class LeafletMaps{
    constructor($map){
      this.map = null;
      this.bounds = [];
      this.station = null;
      this.data = new Data();
      this.$map = document.querySelector($map);
      this.interface = new InterfaceUser();
    }
    /**
     * Initialisation de la map avec les données (marker)
     */
    initMaps(){
      this.load(this.$map);
      var reponse = $.getJSON(this.data.getUrlDataAPI())
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
     * @param {Object} Station
     */
    load(element){
      this.map = L.map(element);
      this.map.options.minZoom =12.4;
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
      {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          
      }).addTo(this.map)
    }
   
    /**
     * ajout d'un marker sur la carte sauf les stations fermées
     * @param {int} lat 
     * @param {int} lng 
     * @param {int} maxPlaces 
     * @param {int} veloDispo 
     */
    addMarket(station){
      if(station.getStatusStation()){
        this.bounds.push(station.position)
        
        L.marker(station.position,{icon: this.selectIcon(station.veloDispo,station.maxPlaces)})
          .on('click', ()=>{
            this.interface.showStation(station);
            this.map.setView(station.position, 16);
            this.addpopup(station);
          })
            
          .addTo(this.map);

      }
    }

    /**
     * création de popup sur les markers
     * @param {Objet Station} station 
     */
    addpopup(station){
      L.popup()
        .setLatLng(station.position)
        .setContent(station.name)
        .openOn(this.map);
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