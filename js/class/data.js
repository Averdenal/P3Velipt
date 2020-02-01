
class Data{
    constructor(){
        this.dataAPI = "https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=096983f1e05f95e3c792a500e2499e840cf58f2d";
        this.dataCarousel = 
        [
            {titre:"Un Clic!",textInfo:"Sur un marcker.", URL:"imgs/sliders/velo1.jpg"},
            {titre:"Un Clic!",textInfo:"Entrer vos informations.", URL:"imgs/sliders/velo2.jpg"},
            {titre:"Et un Clic!",textInfo:"Entrer votre signature.", URL:"imgs/sliders/velo3.jpg"}
        ];
    }

    getUrlDataAPI(){
        return this.dataAPI;
    }

    getDataCarousel(){
        return this.dataCarousel;
    }

}