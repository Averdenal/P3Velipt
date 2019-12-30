class Station{

    constructor(number,name,adresse,position,status, veloDispo, maxPlaces){
      this.interface = new interfaceUser();
      this.resevation = new reservation();
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

    infoStation(){
      document.getElementById('info').style.flex = 1;
      var tabInfoZone = [
        {query:'#nbStation',contenu:"Station : "+this.number},
        {query:'#nomStation',contenu:this.name},
        {query:'#addressStation',contenu:"Adresse : <br />"+this.adresse},
        {query:'#veloDispoStation',contenu:"Vélo disponible.s : "+this.veloDispo+"/"+this.maxPlaces}];

      tabInfoZone.forEach(element => {
        var $element = document.querySelector(element.query);
        this.interface.creatDivClassInterface({
          htmlElement:'p',
          contenu:element.contenu,
          raz:true,
          elementParent:$element
        });
      });

      this.resevation.uiReservation(document.getElementById('reservation'),this.veloDispo,this.name);
    }
  }