var dataSlider =
[
    {"textInfo":"Demo1", "URL":"imgs/sliders/slider1jpg.jpg"},
    {"textInfo":"Demo2", "URL":"imgs/sliders/slider1jpg.jpg"},
    {"textInfo":"Demo3", "URL":"imgs/sliders/slider1jpg.jpg"}
]

/* https://docs.mapbox.com/ */

mapboxgl.accessToken = 'pk.eyJ1IjoiYW1hdXJ5diIsImEiOiJjazN6d2dybDAwODF3M21tdHl1aHVucnU5In0.wxEqA0_vYEl5O4kiOnSXHw';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v9',
center: [-1.553621, 47.218371],
zoom: 12
});

map.on("load", function () {
    /* Image: An image is loaded and added to the map. */
    map.loadImage("https://i.imgur.com/MK4NUzI.png", function(error, image) {
        if (error) throw error;
        map.addImage("custom-marker", image);
        /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
        map.addLayer({
            id: "markers1",
            type: "symbol",
            source: {
            type: "geojson",
            data: {
            type: 'FeatureCollection',
            features: [
            {
            type: 'Feature',
            properties: {},
            geometry: {
            type: "Point",
            coordinates: [-1.5465, 47.2159]
            }
            }
            ]
            }
            },
            layout: {
                "icon-image": "custom-marker",
            }
            });
        map.addLayer({
            id: "markers",
            type: "symbol",
            /* Source: A data source specifies the geographic coordinate where the image marker gets placed. */
            source: {
                type: "geojson",
                data: {
                    type: 'FeatureCollection',
                    features: [
                        {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: "Point",
                            coordinates: [-1.558, 47.2152]
                            }
                        }
                    ]
                }
            },
            layout: {
            "icon-image": "custom-marker",
            }
        });
    });
});


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


