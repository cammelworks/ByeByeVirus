 var virusImg = Vue.component('virus-image', {
  data:{  
    topMargin: randomTop(),
    leftMargin: randomLeft(),
    timer: Number,
  },
  props: {
    src: String,
    id: Number,
  },
  template: `
    <div v-bind:id="id" class="ramdom">
      <img class="img-virus" v-bind:src='src' v-on:mouseover="hovered"></img>
    </div>
  `,
  mounted: function(){
    this.$el.style.position = "absolute";
    this.topMargin = randomTop();
    this.leftMargin = randomLeft();
    
    this.$el.style.top = this.topMargin + "px";
    this.$el.style.left = this.leftMargin + "px";
    this.randomMove(this.$el, this.topMargin, this.leftMargin);
  },
  methods:{
    hovered: function(){
      this.$emit('hoverd');
      //位置を動かす
      this.topMargin = randomTop();
      this.leftMargin = randomLeft();

      this.$el.style.top = this.topMargin + "px";
      this.$el.style.left = this.leftMargin + "px";
      clearInterval(this.timer)
      //非表示にする
      this.$el.style.visibility = "hidden";
      //1秒後に表示して動き出す
      sleep(10, this.randomMove)
    },
    randomMove: function(){
      //初期値
      var randomTop = this.topMargin;
      var randomLeft = this.leftMargin;
      var randomElm = this.$el;
      randomElm.style.visibility = "visible";
  
    this.timer= setInterval(function() {
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
    // console.log(virusImg.timer);
    }
  },
})

//高さをランダムで指定する
function randomTop(){
  return Math.floor(Math.random() * Math.floor(window.innerHeight * 0.7 - 105));
}
//横の位置をランダムで指定する
function randomLeft(){
  return Math.floor(Math.random() * Math.floor(window.innerWidth * 0.8 - 105));
}

function sleep(waitSec, callbackFunc) {
  // 経過時間（秒）
  var spanedSec = 0;
  // 1秒間隔で無名関数を実行
  var id = setInterval(function () {
      spanedSec++;
      // 経過時間 >= 待機時間の場合、待機終了。
      if (spanedSec >= waitSec) {
          // タイマー停止
          clearInterval(id);
          // 完了時、コールバック関数を実行
          if (callbackFunc) callbackFunc();
      }
  }, 100);
}