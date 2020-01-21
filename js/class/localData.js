"use strict";
class LocalData{
    constructor(){
        this.interface = new InterfaceUser();
    }
    addLocalStorageReservation(option = {}){
        let fOption = Object.assign({
            nom:'',
            prenom:''
        },option) 
            if(localStorage.getItem('nom') === '' || localStorage.getItem('nom') === null){
                localStorage.setItem('nom',fOption.nom)
            }
            if(localStorage.getItem('prenom') === '' ||localStorage.getItem('prenom') === null){
                localStorage.setItem('prenom',fOption.prenom)
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
        myReservation.nomStation=localStorage.getItem('resaStation');
        myReservation.dateReservation= localStorage.getItem('resaTime');
        myReservation.prenom=localStorage.getItem('prenom');
        myReservation.nom=localStorage.getItem('nom');
        myReservation.signature=localStorage.getItem('signature');
        return myReservation;
    }
}
    