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
    localStorageAdd(option = {}){
        let fOption = Object.assign({
            nomStation:'',
            dateReservation:'',
            nom:'',
            prenom:'',
            signature:''
        },option) 

        if(localStorage.getItem('signature') === '' || localStorage.getItem('signature') === null){
            if(localStorage.getItem('resaStation') === null || localStorage.getItem('resaStation') === ''){
                localStorage.setItem('resaStation',fOption.nomStation)
            }
            if(localStorage.getItem('resaTime') === null || localStorage.getItem('resaTime') === ''){
                localStorage.setItem('resaTime',fOption.dateReservation)
            }
            if(localStorage.getItem('nom') === null || localStorage.getItem('nom') === ''){
                localStorage.setItem('nom',fOption.nom)
            }
            if(localStorage.getItem('prenom') === null || localStorage.getItem('prenom') === ''){
                localStorage.setItem('prenom',fOption.prenom)
            }
            if(localStorage.getItem('signature')!=='OK'){
                localStorage.setItem('signature',fOption.signature)
            }
        }
    }

    localStorageRead(){
        return {
            nomStation:localStorage.getItem('resaStation'),
            dateReservation: localStorage.getItem('resaTime'),
            prenom:localStorage.getItem('prenom'),
            nom:localStorage.getItem('nom'),
            signature:localStorage.getItem('signature')
        }
    }
}
    