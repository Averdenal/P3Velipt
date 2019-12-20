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