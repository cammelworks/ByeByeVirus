Vue.directive('random-pos', {
    bind(el){
        // console.log(el)
        el.style.position = "absolute";
        el.style.top = randomTop() + "px";
        el.style.left = randomLeft() + "px";
    }
})

//高さをランダムで指定する
function randomTop(){
    return Math.floor(Math.random() * Math.floor(window.innerHeight - 55));
}
//横の位置をランダムで指定する
function randomLeft(){
    return Math.floor(Math.random() * Math.floor(window.innerWidth - 55));
}