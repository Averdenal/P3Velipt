class localData{
    constructor(){
        this.interface = new interfaceUser();
    }
    /**
     * efface les informations dans le localStorage
     * - Nom de la station
     * - Date de réservation (ms)
     * - Prénom
     * - Nom
     * @param {HTML_ELement} $element
     */
    infoResaRemove($element){
        this.interface.razHtmlElement($element);
        this.localStorageRemouve();
    }
    
    localStorageRemouve(){
        localStorage.removeItem('resaStation')
        localStorage.removeItem('resaTime')
        localStorage.removeItem('prenom')
        localStorage.removeItem('nom')
        localStorage.removeItem('signature')
        localStorage.removeItem('signatureZone');
    }

    /**
     * ajout des informations dans le localStorage
     * @param {objet} option 
     * @param {string} option.resevationNomStation
     * @param {string} option.reservationDate
     * @param {string} option.reservationNom
     * @param {string} option.reservationPrenom
     * @param {string} option.reservationSignature
     */
    localStorageAdd(option = {}){
        let fOption = Object.assign({
            resevationNomStation:null,
            reservationDate:null,
            reservationNom:null,
            reservationPrenom:null,
            reservationSignature:null
        },option) 

        if(localStorage.getItem('signature') === "null" || localStorage.getItem('signature') === null){
            if(localStorage.getItem('resaStation') === null){
                localStorage.setItem('resaStation',fOption.resevationNomStation)
            }
            if(localStorage.getItem('resaTime') === null){
                localStorage.setItem('resaTime',fOption.reservationDate)
            }
            if(localStorage.getItem('prenom') === null){
                localStorage.setItem('prenom',fOption.reservationPrenom)
            }
            if(localStorage.getItem('nom') === null){
                localStorage.setItem('nom',fOption.reservationNom)
            }
            if(localStorage.getItem('signature')!=='OK'){
                localStorage.setItem('signature',fOption.reservationSignature)
            }
        }
    }
}
    