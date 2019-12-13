class leafletMaps{
    constructor(){
        this.map = null
    }
    /**
     * chargement de la map
     * @param {HTML_Element} element 
     */
    async laod(element){
        return new Promise((resolve,reject) => {
            this.map = L.map(element).setView([47.2190275447384, -1.56341948405375], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
            {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map)
            resolve()
        })
    }
    addMarket(lat,lng,info){
        L.popup({
            closeButton:false,
            autoClose:false,
            closeOnEscapeKey:false,
            closeOnClick:false,
            className:'popclass'
        })
        .setLatLng([lat, lng])
        .setContent(info)
        .openOn(this.map);
    }
}
