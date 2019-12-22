class localData{

    /**
     * efface les informations dans le localStorage
     * - Nom de la station
     * - Date de réservation (ms)
     * - Prénom
     * - Nom
     */
    infoResaRemove($element){
    let actualistation = new interfaceUser();
    actualistation.actualisationHtmlElement($element);
    this.localStorageRemouve();
    }
    localStorageRemouve(){
        localStorage.removeItem('resaStation')
        localStorage.removeItem('resaTime')
        localStorage.removeItem('prenom')
        localStorage.removeItem('nom')
        localStorage.removeItem('signature')
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

        if(localStorage.getItem('signature') === null){
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
            if(localStorage.getItem('signature') === null){
                localStorage.setItem('signature',fOption.reservationSignature)
            }
        }
        
    }
    infoResa($element){
        var nom = localStorage.getItem('nom')
        var prenom = localStorage.getItem('prenom')
        if(localStorage.getItem('signature') === 'OK'){
            var time = new Date().getTime()
            if(time < parseInt(localStorage.getItem('resaTime')) + (30*60000)){
                var restantTime = (((parseInt(localStorage.getItem('resaTime'))+(30*60000))- time)/60000).toFixed(0)
                var p = document.createElement('p')
                p.innerHTML = nom+" "+prenom + ". Votre reservation de vélo sur la station "+localStorage.getItem('resaStation')+" reste active pendant "+restantTime+"min"
                $element.appendChild(p)

                var btback = document.createElement('button')
                btback.setAttribute('class','btBack')
                btback.textContent = "Annuler"
                btback.addEventListener('click',()=>{
                    this.infoResaRemove($element)
                }
                
                )
                $element.appendChild(btback)
            }else{
                this.infoResaRemove($element)
            }
            
        }
    }
    actualistationReservationInfo($inforesa){
        this.infoResa($inforesa)
        setInterval(()=>{
            new interfaceUser().actualisationHtmlElement($inforesa)
            this.infoResa($inforesa)
        },10000)
    }
}
    