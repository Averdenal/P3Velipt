"use strict";
class Reservation{
    constructor(){
        this.nomStation= null;
        this.dateReservation= null;
        this.nom= null;
        this.prenom= null;
        this.signature= null;
    }

    isCanceled(){
        return 0 > this.timeLeft();
    }
    /**
     * retourne le temps restant 
     */
    timeLeft(){
        let time = new Date().getTime()
        let dateFinReservation = (parseInt(this.dateReservation)+(20*60000));
        return dateFinReservation - time;
    }
    /**
     * temps restant en minute et secondes
     */
    getDetailTimeLeft(){
      let restantTime = this.timeLeft();
      return {
          m:new Date(restantTime).getMinutes(),
          s:new Date(restantTime).getSeconds()
        }
    }
    isSignatureOK(){
      return this.signature === 'true';
    }
}