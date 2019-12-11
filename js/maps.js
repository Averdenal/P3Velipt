let $map = document.querySelector("#map")
/*ttps://maps.googleapis.com/maps/api/js*/

class Maps{
    constructor(){
        this.maps = null
    }
    /**
     * charge la carte sur un element DOM
     * @param {HTMLElement} element 
     */
    load(element){
        $script('https://maps.googleapis.com/maps/api/js', () => {
            var center = {lat: 62.323907, lng: -150.109291}    
            this.map = new google.maps.Map(element,{
                zoom : 11,
                center : center
            })  
        })
    }

    /**
     * ajoute un marquer sur la carte
     * @param {string} lat 
     * @param {string} lng 
     * @param {string} text 
     */
    addMarker(lat,lng,text){
        let marker = google.maps.Marker({
            position : lat, lng,
            map : this.maps
        })
    }
}

if ($map !== null){
    let map = new Maps()
    map.load($map)
}