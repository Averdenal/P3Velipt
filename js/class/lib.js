class interfaceUser{
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
    creatDivClassInterface(option = {}){
        let optionCreat = Object.assign({
            htmlElement:'div',
            className:'',
            idName:'',
            contenu:'',
            elementParent:'',
            raz:false,
            placeholder:''
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
        if(optionCreat.htmlElement === 'input'){
            $element.placeholder = optionCreat.placeholder;
        }
        if(optionCreat.elementParent !== ''){
            optionCreat.elementParent.appendChild($element);
        }
        return $element;
    }
    /**
     * création d'une image
     * @param {objet} option 
     * @param {string} option.src 
     * @param {string} option.alt 
     */
    creatImgInterface(option = {}){
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
    razHtmlElement(element){
        if(element.children.length !== 0){
            element.innerHTML =""
          }
    }
    /**
     * change la couleur de border si la zone est vide
     * @param {HTML_Element} element input element
     */
    verifInputVide(element){
        if(element.value === ""){
            element.style.border ='2px solid red'
          }else{
            element.style.border ='2px solid green'
          }
    }

    changeBodyFilter(){
        var body = document.getElementById('body')
        body.classList.add('active');
    }
}