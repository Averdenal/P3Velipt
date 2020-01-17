class Station{

    constructor(number,name,adresse,position,status, veloDispo, maxPlaces){
      this.interface = new interfaceUser();
      this.resevation = new reservationManager();
      this.number = number;
      this.name = this.nameChange(name);
      this.adresse = adresse;
      this.position = position;
      this.status = status;
      this.veloDispo = veloDispo;
      this.maxPlaces = maxPlaces;
    }

    /**
     * retire les infos nombre du nom
     * @param {string} name 
     */
    nameChange(name){
      switch(name.substr(0,1)){
        case '#':
          name = name.substr(7)
          break;
        case '0':
          name = name.substr(6)
          break;
      }
      if (name.substr(0, 1) === "-"){
        name = name.substr(1)
      }
      return name
    }

    getStatusStation(){
      if(this.status === 'OPEN'){
        return true;
      }else{
        return false;
      }
    }
  }