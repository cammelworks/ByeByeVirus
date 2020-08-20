var title = new Vue({
  el: "#title",
  data:{
    seen: true
  },
  methods:{
    start: function(){
      this.seen = false;
      game.show();
    }
  }
})

var game = new Vue({
  el: "#game",
  data: {
    seen: false,
    image: "../figs/virus_corona.png"
  },
  methods:{
    show: function(){
      this.seen = true;
    }
  }
})
