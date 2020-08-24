Vue.directive('cursor-pos', {
  bind(el){
      el.style.position = "absolute";
      // マウスの位置を取得してtop, leftに入れたい
      // イベントをリッスンする必要があるので、
      // 矩形領域内でホバーしたらマウスの位置を取得するようにした方が良さそう
      var top = "0.0";
      var left = "0.0";
      el.style.top = top + "px";
      el.style.left = left + "px";
  },

})