/**
 * création div avec class
 * @param {string} className 
 */
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
     */
    creatDivClassInterface(option = {}){
        let optionCreat = Object.assign({
            htmlElement:'div',
            className:'',
            idName:''
        },option);

        let $element =document.createElement(optionCreat.htmlElement);
        if(optionCreat.className !== ''){
            $element.setAttribute('class',optionCreat.className);
        };
        if(optionCreat.id !== null){
            $element.setAttribute('id',optionCreat.idName);
        };
        return $element;
    }

    creatImgInterface(option = {}){
        let optionCreat = Object.assign({
            src:'',
            alt:'image'
        },option);
        let $element = document.createElement('img');
        $element.src = optionCreat.src;
        $element.alt = optionCreat.alt;
        return $element;
    }
    actualisationHtmlElement(element){
        if(element.children.length !== 0){
            element.innerHTML =""
          }

    }
}