"use strict"
class InterfaceUser{

    /**
     * création d'élements HTML avec class et ID 
     * variables non obligatoire
     * <div></div> par defaut 
     * valeur vide par defaut 
     * @param {*} option variable non obligatoire
     * @param {HTML_Element} option.htmlElement element html à créer
     * @param {string} option.className nom de la class
     * @param {string} option.idName nom de l'id
     * @param {string} option.contenu 
     * @param {string} option.elementParent Element HTML pour .appendchild 
     * @param {bool} option.raz vide le contenu d'un element HTML
     * @param {String} option.placeholder
     */
    createDivClassInterface(option = {}){
        let optionCreat = Object.assign({
            htmlElement:'div',
            className:'',
            idName:'',
            contenu:'',
            elementParent:'',
            raz:false,
            required:false,
            placeholder:'',
            value:''

        },option);

        let $element =document.createElement(optionCreat.htmlElement);
        if(optionCreat.className !== ''){
            $element.setAttribute('class',optionCreat.className);
        };
        if(optionCreat.idName !== ''){
            $element.setAttribute('id',optionCreat.idName);
        };
        if(optionCreat.contenu !== ''){
            $element.innerHTML=optionCreat.contenu;
        };
        if(optionCreat.raz){
            this.razHtmlElement(optionCreat.elementParent);
        }
        if(optionCreat.elementParent !== ''){
            optionCreat.elementParent.appendChild($element);
        }
        if(optionCreat.required ===true){
            $element.setAttribute('required','true');
        }
        if(optionCreat.htmlElement === 'input'){
            $element.placeholder = optionCreat.placeholder;
        };
        $element.setAttribute('value',optionCreat.value);
        return $element;
    }
    
    /**
     * création d'une image
     * @param {objet} option 
     * @param {string} option.src 
     * @param {string} option.alt 
     */
    createImgInterface(option = {}){
        let optionCreat = Object.assign({
            src:'',
            alt:'image',
            elementParent:''
        },option);
        let $element = document.createElement('img');
        $element.src = optionCreat.src;
        $element.alt = optionCreat.alt;
        if(optionCreat.elementParent !== ''){
            optionCreat.elementParent.appendChild($element);
        }
        return $element;

    }
    /**
     * innerHTML = ""
     * @param {HTML_Element} element 
     */
    razHtmlElement($element){
        if($element !== undefined){
            if($element.children.length !== 0){
                $element.innerHTML =""
              }
        } 
    }
    /**
     * change la couleur de border si la zone est vide
     * @param {HTML_Element} element input element
     */
    isEmpty(element){
        if(element.value === ""){
            element.classList.add('false')
            return true;
          }else{
            element.classList.remove('false')
            return false;
          }
    }

    /**
     * ajout class lors de l'ouveture de la zone signature.
     */
    changeBodyFilter(){
        var body = document.getElementById('body')
        body.classList.add('active');
    }
    /**
     * afficher les informations de la station
     * @param {Objet} station 
     */
    showStation(station){
        var tabInfoZone = [
            {query:'#nbStation',contenu:"Station : "+station.number},
            {query:'#nomStation',contenu:station.name},
            {query:'#addressStation',contenu:"Adresse : <br />"+station.adresse},
            {query:'#veloDispoStation',contenu:"Vélo disponible.s : "+station.veloDispo+"/"+station.maxPlaces}];

        tabInfoZone.forEach(element => {
            var $element = document.querySelector(element.query);
            this.createDivClassInterface({
            htmlElement:'p',
            contenu:element.contenu,
            raz:true,
            elementParent:$element
            });
        });
        
        new ReservationManager().uiReservation(document.getElementById('reservation'),station.veloDispo,station.name);
    }
}