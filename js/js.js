var dataSlider =
[
    {"textInfo":"Demo1", "URL":"imgs/sliders/slider1jpg.jpg"},
    {"textInfo":"Demo2", "URL":"imgs/sliders/slider1jpg.jpg"},
    {"textInfo":"Demo3", "URL":"imgs/sliders/slider1jpg.jpg"}
]

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

