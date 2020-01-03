class reservation{
    constructor(){
        this.nomStation= null;
        this.dateReservation= null;
        this.nom= null;
        this.prenom= null;
        this.signature= null;
    }

    isReservationCanceled(){
        return 0 > this.tempRestant();
    }

    tempRestant(){
        let time = new Date().getTime()
        let dateFinReservation = (parseInt(this.dateReservation)+(30*60000));
        return dateFinReservation - time;
    }

    getDetailTempsRestant(){
        let restantTime = this.tempRestant();
        return {
            m:new Date(restantTime).getMinutes(),
            s:new Date(restantTime).getSeconds()
          }
    }
    isSignatureOK(){
        console.log(this.signature);
        return this.signature === 'true';

    }
}