var dataSlider =
[
    {"textInfo":"Demo1", "URL":"imgs/sliders/slider1jpg.jpg"},
    {"textInfo":"Demo2", "URL":"imgs/sliders/slider1jpg.jpg"},
    {"textInfo":"Demo3", "URL":"imgs/sliders/slider1jpg.jpg"}
]
/*
 * zone de création de slider  
 */
var sliderzone = document.getElementById("slider");

class sliderCrea{

    constructor(text, url, zoneslider){
        this.figure = document.createElement("figure");
        this.figurecap = document.createElement("figcaption");
        this.image = document.createElement("img");

        this.figurecap.textContent = text;
        this.image.src = url;
        
        this.figure.appendChild(this.image);
        this.figure.appendChild(this.figurecap);
        zoneslider.appendChild(this.figure);

    }
}
for (let i = 0; i < dataSlider.length; i++) {
    const element = dataSlider[i];
    new sliderCrea(element.textInfo,element.URL,sliderzone);
}