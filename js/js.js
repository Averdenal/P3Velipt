var dataSlider =
[
    {"textInfo":"Demo1", "URL":"imgs/sliders/slider1jpg.jpg"},
    {"textInfo":"Demo2", "URL":"imgs/sliders/slider1jpg.jpg"},
    {"textInfo":"Demo3", "URL":"imgs/sliders/slider1jpg.jpg"}
]

/* https://docs.mapbox.com/ */

    var map;
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 47.2173, lng: -1.5534},
            zoom: 11
        });
    
    var myLatlng = new google.maps.LatLng(47.2273,-1.5534);
    var marker1 = new google.maps.Marker({
        position: myLatlng,
        title:"Hello World!"
    });
    marker1.addListener('click', function() {
        map.setZoom(14);
        map.setCenter(marker1.getPosition());
      });
    marker1.setMap(map);

    myLatlng = new google.maps.LatLng(47.2173,-1.5534);
    marker = new google.maps.Marker({
        position: myLatlng,
        title:"Hello World!"
    });

    marker.setMap(map);
    marker.addListener('click', function() {
        map.setZoom(14);
        map.setCenter(marker.getPosition());
      });
}
    
    // To add the marker to the map, call setMap();
    
class carousel{
    /**
     * @param  {HTMLElement} element
     * @param  {object} options.slidersToScroll nombre d'éléments a bouger
     * @param  {object} options.sliderVisible nomvre d'élément visible
     * @param  {objetJson} datas objet json 
     */
    constructor(element, options = {}, data){
        this.data = data
        this.element = element
        this.children = data
        this.options = Object.assign({},{
            slidersToScroll:1,
            sliderVisible:3
        }, options)
        let root = this.CreationDivClass('carousel','div')
        let container = this.CreationDivClass('carousel__container','div')
        root.appendChild(container)
        this.element.appendChild(root)
        this.children.forEach(child => {
            let item = this.CreationDivClass('carousel__item','figure')
            item.style.width = (100 / 3) +"%"

            let img = document.createElement('img')
            img.src = child.URL

            let description = document.createElement('figcaption')
            description.setAttribute('class','description')
            description.textContent = child.textInfo
            
            item.appendChild(img)
            item.appendChild(description)

            container.appendChild(item)
        });
    }
    CreationDivClass(Class,HTMLElement){
        let div = document.createElement(HTMLElement)
        div.setAttribute('class',Class)
        return div
    }
    

}

document.addEventListener("DOMContentLoaded", function(){
    new carousel(document.querySelector('#slider'), {
        slidersToScroll: 3,
        sliderVisible:3
    },dataSlider)
    
})


