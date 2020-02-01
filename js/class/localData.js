
class LocalData{
    constructor(){
        this.interface = new InterfaceUser();
    }
    addLocalStorageReservation(option = {}){
        let fOption = Object.assign({
            nom:'',
            prenom:''
        },option);
            localStorage.setItem('nom',fOption.nom)
            localStorage.setItem('prenom',fOption.prenom)
    }

    /**
     * Ajout des informations dans le localStorage
     * @param {objet} option 
     * @param {string} option.nomStation
     * @param {string} option.dateReservation
     * @param {string} option.nom
     * @param {string} option.prenom
     * @param {string} option.signature
     */
    addSessionStorageReservation(option = {}){
        let fOption = Object.assign({
            nomStation:'',
            dateReservation:'',
            signature:'false'
        },option) 
        if(sessionStorage.getItem('signature') === 'false' || sessionStorage.getItem('signature') === null){
            if(sessionStorage.getItem('resaStation') === ''|| sessionStorage.getItem('resaStation') === null){
                sessionStorage.setItem('resaStation',fOption.nomStation);
            }
            if(sessionStorage.getItem('resaTime') === '' || sessionStorage.getItem('resaTime') === null){
                sessionStorage.setItem('resaTime',fOption.dateReservation);
            }
            if(sessionStorage.getItem('signature')!=='true'){
                sessionStorage.setItem('signature',fOption.signature);
            }
        }
    }

    getReservation(){
        let myReservation = new Reservation();
        myReservation.nomStation=sessionStorage.getItem('resaStation');
        myReservation.dateReservation= sessionStorage.getItem('resaTime');
        myReservation.signature=sessionStorage.getItem('signature');
        if(localStorage.getItem('prenom') === null){
            myReservation.prenom = '';
        }else{
            myReservation.prenom=localStorage.getItem('prenom');
        }
        if(localStorage.getItem('nom') === null){
            myReservation.nom = '';
        }else{
            myReservation.nom=localStorage.getItem('nom');
        }
        return myReservation;
    }
    sessionStorageRemove(){
        sessionStorage.removeItem('resaStation');
        sessionStorage.removeItem('resaTime');
        sessionStorage.removeItem('signature');
    }
}
    