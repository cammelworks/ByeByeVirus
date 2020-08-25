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
    while(this.topMargin < 200 && this.leftMargin > window.innerWidth * 0.8 - 400){
      this.topMargin = randomTop();
      this.leftMargin = randomLeft();
    }
    this.$el.style.top = this.topMargin + "px";
    this.$el.style.left = this.leftMargin + "px";
    this.randomMove(this.$el, this.topMargin, this.leftMargin);
  },
  methods:{
    hovered: function(){
      this.$emit('hoverd');
      // this.$el.parentNode.removeChild(this.$el);
      //位置を動かす
      this.topMargin = randomTop();
      this.leftMargin = randomLeft();
      while(this.topMargin < 200 && this.leftMargin > window.innerWidth * 0.8 - 400){
        this.topMargin = randomTop();
        this.leftMargin = randomLeft();
      }
      this.$el.style.top = this.topMargin + "px";
      this.$el.style.left = this.leftMargin + "px";
      clearInterval(this.timer)
      this.randomMove();
    },
    randomMove: function(){
      //初期値
    var randomTop = this.topMargin;
    var randomLeft = this.leftMargin;
    var randomElm = this.$el;
  
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

      //スコアと被らないように調整
      if(this.topMargin < 200 && this.leftMargin > window.innerWidth * 0.8 - 400){
        if(this.topMargin < 100){
          this.topMargin = 100;
        } else{
          this.leftMargin = window.innerWidth * 0.8 - 400;
        }
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

// function randomMove(randomElm, top, left) {
  
//     //初期値
//     var randomTop = top;
//     var randomLeft = left;
  
//     virusImg.timer= setInterval(function() {
//       //位置をランダムに移動
//       if(Math.random() * 2 < 1) {
//         randomTop += 5;
//       } else {
//         randomTop -= 5;
//       };
  
//       if(Math.random() * 2 < 1) {
//         randomLeft += 5;
//       } else {
//         randomLeft -= 5;
//       };

//       //画面外にでないように調整
//       if(randomTop <= 0) {
//         randomTop = 0;
//       }
//       if(randomTop >= window.innerHeight * 0.7 - 115) {
//         randomTop = window.innerHeight * 0.7 - 115;
//       }

//       if(randomLeft <= 0) {
//         randomLeft = 0;
//       }
//       if(randomLeft >= window.innerWidth * 0.8 - 105) {
//         randomLeft = window.innerWidth * 0.8 - 105;
//       }

//       //スコアと被らないように調整
//       if(this.topMargin < 200 && this.leftMargin > window.innerWidth * 0.8 - 400){
//         if(this.topMargin < 100){
//           this.topMargin = 100;
//         } else{
//           this.leftMargin = window.innerWidth * 0.8 - 400;
//         }
//       }
  
//       randomElm.style.left = randomLeft + "px";
//       randomElm.style.top = randomTop + "px";
//     }, 100);
//     // console.log(virusImg.timer);
//   };