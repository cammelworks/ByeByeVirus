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
    image: "../figs/virus_corona.png"
  },
  methods:{
    decrementTotalCount: function(){
      this.remaining--;
      console.log(this.remaining);
      if (this.remaining <= 0) {
        showTitle();
      }
    }
  }
})

function gameStart(){
  title.seen = false;
  game.remaining = 100;
  game.seen = true;
}

function showTitle(){
  title.seen = true;
  game.seen = false;
}