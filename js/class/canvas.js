class canvas{
    creaCanvasSignature(){
        var canvas = document.createElement('canvas')
            canvas.setAttribute('id','canvas')
            canvas.setAttribute('width','400px')
            canvas.setAttribute('height','200px')
            canvas.addEventListener('mousedown',function(){
              let down = true
              canvas.onmousemove = function(evt){
                canvas.onmouseup = function(){
                  down = false
                }
                //https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo
                if(down){
                    var context = canvas.getContext('2d');
                    let position =  getMousePos(canvas, evt)
                    context.fillStyle = "#000000"
                    context.fillRect (position.x, position.y, 4, 4)              
                }
              }     
              
            })
        return canvas
    }
    /**
     * récup la position du curseur dans le canvas
     * taille canvas - postion top et left
     * @param {HTML_Element} canvas 
     * @param {Event} evt 
     */
    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect(); //position du canvas dans la page 
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    }
    /**
     * efface ce qui se trouve dans le canvas
     */
    clearCanvas(){
        let canvas = document.getElementById('canvas');
        let context = canvas.getContext('2d');
        context.fillStyle = "#FFF";
        context.fillRect (0, 0, canvas.width, canvas.height);
    }
}