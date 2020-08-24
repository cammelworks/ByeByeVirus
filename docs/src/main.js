var title = new Vue({
  el: "#title",
  data:{
    seen: true
  },
  methods:{
    start: function(){
      gameStart();
    }
  }
})

var game = new Vue({
  el: "#game",
  data: {
    seen: false,
    remaining: 100,
    image: "figs/virus_corona.png",
    bgm: new Audio("sounds/BGM.mp3"),
    times: [],
    animateFrame: 0,
    nowTime: 0,
    diffTime: 0,
    highScore: localStorage.diffTime,
    startTime: 0,
    isTitle: true,
    isRunning: false,
    isResult: false,
  },
  methods:{
    // ウイルスの残り数を更新する
    decrementTotalCount: function(){
      var sound = new Audio("sounds/deleteVirusSE.mp3");
      sound.volume = 0.5;
      sound.play();
      this.remaining--;
      console.log(this.remaining);
      if (this.remaining <= 0) {
        sound = new Audio("sounds/clearSE.mp3");
        sound.volume = 0.3;
        sound.play();
        showResult();
      }
    },
    start: function(){
      this.isTitle = false;
      gameStart();
    },
    //リスタート
    restart: function(){
      game.seen = false;
      sleep(1, gameStart);
    },
    // 現在時刻から引数に渡した数値を startTime に代入
    setSubtractStartTime: function (time) {
      var time = typeof time !== 'undefined' ? time : 0;
      this.startTime = Math.floor(performance.now() - time);
    },
    // タイマーをスタートさせる
    startTimer: function () {
      // loop()内で this の値が変更されるので退避
      var vm = this;
      vm.setSubtractStartTime(vm.diffTime);
      // ループ処理
      (function loop(){
        vm.nowTime = Math.floor(performance.now());
        vm.diffTime = vm.nowTime - vm.startTime;
        vm.animateFrame = requestAnimationFrame(loop);
      }());
      vm.isRunning = true;
    },
    // タイマーを停止させる
    stopTimer: function () {
      this.isRunning = false;
      cancelAnimationFrame(this.animateFrame);
    },
    // 計測中の時間を配列に追加
    pushTime: function () {
      this.times.push({
        hours: this.hours,
        minutes: this.minutes,
        seconds: this.seconds,
        milliSeconds: this.milliSeconds
      });
    },
    // 初期化
    clearAll: function () {
      this.startTime = 0;
      this.nowTime = 0;
      this.diffTime = 0;
      this.times = [];
      this.stopTimer();
      this.animateFrame = 0;
    }
  },
  computed: {
    // 分数を計算 (60分になったら0分に戻る)
    minutes: function () {
      return Math.floor(this.diffTime / 1000 / 60) % 60;
    },
    // 秒数を計算 (60秒になったら0秒に戻る)
    seconds: function () {
      return Math.floor(this.diffTime / 1000) % 60;
    },
    // ミリ数を計算 (1000ミリ秒になったら0ミリ秒に戻る)
    milliSeconds: function () {
      return Math.floor(this.diffTime % 1000);
    },
    // 分数を計算 (60分になったら0分に戻る)
    storageMinutes: function () {
      if(!this.highScore){
        return "99";
      }
      return Math.floor(this.highScore / 1000 / 60) % 60;
    },
    // 秒数を計算 (60秒になったら0秒に戻る)
    storageSeconds: function () {
      if(!this.highScore){
        return "99";
      }
      return Math.floor(this.highScore / 1000) % 60;
    },
    // ミリ数を計算 (1000ミリ秒になったら0ミリ秒に戻る)
    storageMilliSeconds: function () {
      if(!this.highScore){
        return "999";
      }
      return Math.floor(this.highScore % 1000);
    },
  },
  filters: {
    // ゼロ埋めフィルタ 引数に桁数を入力する
    // ※ String.prototype.padStart() は IEじゃ使えない
    zeroPad: function(value, num){
      var num = typeof num !== 'undefined' ? num : 2;
      return value.toString().padStart(num,"0");
    }
  }
})

function gameStart(){
  game.bgm.loop = true;
  game.bgm.volume = 0.3;
  game.bgm.play();
  title.seen = false;
  game.isResult = false;
  game.remaining = 100;
  game.seen = true;
  saveData();
  game.clearAll();
  game.startTimer();
}

function showTitle(){
  title.seen = true;
  game.seen = false;
}

function showResult(){
  game.bgm.pause();
  game.bgm.currentTime = 0;
  game.stopTimer();
  game.isResult = true;
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

function saveData(){
  if(game.diffTime == 0){
    return
  }
  if (localStorage.diffTime > game.diffTime || !localStorage.diffTime){
    localStorage.diffTime = game.diffTime;
    game.highScore = game.diffTime;
  }
}