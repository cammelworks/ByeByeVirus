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
    worldTotal: "???",
    score: 0,
    image: "figs/virus_corona.png",
    bgm: new Audio("sounds/BGM.mp3"),
    clearSE: new Audio("sounds/clearSE.mp3"),
    volume: 0.5,
    times: [],
    animateFrame: 0,
    nowTime: 0,
    diffTime: 0,
    highScore: localStorage.score,
    startTime: 0,
    isTitle: true,
    isRunning: false,
    isResult: false,
    isUpdated: false,
  }, 
  // インスタンス生成前に
  beforeCreate: function () {
    // みんなの記録を取得
    getDataFromFireStore()
  },
  mounted: function(){
    //localStorageから音量を取得
    if(localStorage.volume){
      this.volume = localStorage.volume;
    } else {
      this.volume = 0.5;
    }
  },
  methods:{
    // ウイルスの残り数を更新する
    decrementTotalCount: function(){
      var sound = new Audio("sounds/deleteVirusSE.mp3");
      sound.volume = this.volume;
      sound.play();
      this.score++;
    },
    start: function(){
      this.isTitle = false;
      gameStart();
    },
    //リスタート
    restart: function(){
      // みんなの記録を取得
      getDataFromFireStore();
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
        //30秒たったらゲーム終了
        if(vm.diffTime >= 15000){
          vm.clearSE.play();
          saveDataToFireStore();
          showResult();
        }
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
    // 秒数を計算 (60秒になったら0秒に戻る)
    seconds: function () {
      if(this.seen){
        return Math.floor(15 - this.diffTime / 1000) % 60;
      } else{
        return 0;
      }
    },
    // ミリ数を計算 (1000ミリ秒になったら0ミリ秒に戻る)
    milliSeconds: function () {
      if(this.seen){
        return Math.floor(999 - this.diffTime % 1000);
      } else{
        return 0;
      }
    },
  },
  watch: {
    // BGMの音量を調整
    volume: function (val) {
      this.bgm.volume = val;
      this.clearSE.volume = val;
      localStorage.volume = val;
    }
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
  game.bgm.volume = game.volume;
  game.bgm.play();
  game.clearSE.volume = game.volume;
  title.seen = false;
  game.isResult = false;
  game.seen = true;
  game.score = 0;
  game.clearAll();
  game.startTimer();
}

function showTitle(){
  // みんなの記録を取得
  title.seen = true;
  game.seen = false;
}

function showResult(){
  game.bgm.pause();
  game.bgm.currentTime = 0;
  game.stopTimer();
  game.seen = false;
  saveData();
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
  if (localStorage.score < game.score || !localStorage.score){
    localStorage.score = game.score;
    game.highScore = game.score;
    game.isUpdated = true;
  } else {
    game.isUpdated = false;
  }
}

// FireStoreからデータを取得
function getDataFromFireStore()
{
  var db = firebase.firestore();
  var docRef = db.collection("ByeByeVirus").doc("worldTotal");
  docRef.get().then(function(doc) {
    if (doc.exists) {
        // みんなの記録の合計を取得
        console.log("Document data:", doc.data().sum);
        game.worldTotal=  doc.data().sum;
    } else {
        console.log("No such document!");
    }
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });
}

// FireStoreにデータを保存
function  saveDataToFireStore() 
{
  var db = firebase.firestore();
  var docRef = db.collection("ByeByeVirus").doc("worldTotal");
  // game.worldTotal は取得済みの「みんなの記録」
  var newWorldTotal = game.worldTotal + game.score;
  docRef.set(
    {sum: newWorldTotal}
  );
}