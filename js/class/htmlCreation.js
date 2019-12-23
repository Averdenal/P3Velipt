class htmlCreation{

    changeBodyFilter(){
        var body = document.getElementById('body')
        body.classList.add('active');
    }
    changeBodyNoFilter(){
        var body = document.getElementById('body')
        body.classList.remove('active');
    }

}