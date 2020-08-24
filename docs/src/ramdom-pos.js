Vue.directive('random-pos', {
    bind(el){
        el.style.position = "absolute";
        var top = randomTop();
        var left = randomLeft();
        while(top < 100 && left > window.innerWidth - 500){
          top = randomTop();
          left = randomLeft();
        }
        el.style.top = top + "px";
        el.style.left = left + "px";
        randomMove(el, top, left);
    }
})

//高さをランダムで指定する
function randomTop(){
    return Math.floor(Math.random() * Math.floor(window.innerHeight * 0.7 - 105));
}
//横の位置をランダムで指定する
function randomLeft(){
    return Math.floor(Math.random() * Math.floor(window.innerWidth * 0.8 - 105));
}

function randomMove(randomElm, top, left) {
  
    //初期値
    var randomTop = top;
    var randomLeft = left;
  
    var timer= setInterval(function() {
      //位置をランダムに移動
      if(Math.random() * 2 < 1) {
        randomTop += 5;
      } else {
        randomTop -= 5;
      };
  
      if(Math.random() * 2 < 1) {
        randomLeft += 5;
      } else {
        randomLeft -= 5;
      };

      //画面外にでないように調整
      if(randomTop <= 0) {
        randomTop = 0;
      }
      if(randomTop >= window.innerHeight * 0.7 - 115) {
        randomTop = window.innerHeight * 0.7 - 115;
      }

      if(randomLeft <= 0) {
        randomLeft = 0;
      }
      if(randomLeft >= window.innerWidth * 0.8 - 105) {
        randomLeft = window.innerWidth * 0.8 - 105;
      }
  
      randomElm.style.left = randomLeft + "px";
      randomElm.style.top = randomTop + "px";
    }, 100);
  };