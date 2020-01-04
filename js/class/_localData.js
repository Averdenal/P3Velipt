class localData{
    constructor(){
        this.interface = new interfaceUser();
    }
    
    localStorageRemove(option = {}){
        let fOption = Object.assign({
            relaod:false
        },option)
        localStorage.removeItem('resaStation');
        localStorage.removeItem('resaTime');
        localStorage.removeItem('prenom');
        localStorage.removeItem('nom');
        localStorage.removeItem('signature');
        if(fOption.relaod === true){
            document.location.reload(true);
        }
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
    addReservation(option = {}){
        let fOption = Object.assign({
            nomStation:'',
            dateReservation:'',
            nom:'',
            prenom:'',
            signature:'false'
        },option) 
        if(localStorage.getItem('signature') === 'false' || localStorage.getItem('signature') === null){
            if(localStorage.getItem('resaStation') === ''|| localStorage.getItem('resaStation') === null){
                localStorage.setItem('resaStation',fOption.nomStation)
            }
            if(localStorage.getItem('resaTime') === '' || localStorage.getItem('resaTime') === null){
                localStorage.setItem('resaTime',fOption.dateReservation)
            }
            if(localStorage.getItem('nom') === '' || localStorage.getItem('nom') === null){
                localStorage.setItem('nom',fOption.nom)
            }
            if(localStorage.getItem('prenom') === '' ||localStorage.getItem('prenom') === null){
                localStorage.setItem('prenom',fOption.prenom)
            }
            if(localStorage.getItem('signature')!=='true'){
                localStorage.setItem('signature',fOption.signature)
            }
        }
    }

    getReservation(){
        let myReservation = new reservation();
        myReservation.nomStation=localStorage.getItem('resaStation');
        myReservation.dateReservation= localStorage.getItem('resaTime');
        myReservation.prenom=localStorage.getItem('prenom');
        myReservation.nom=localStorage.getItem('nom');
        myReservation.signature=localStorage.getItem('signature');
        return myReservation;
    }
}
    