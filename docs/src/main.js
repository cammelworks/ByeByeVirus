var title = new Vue({
  el: "#title",
  data:{
    seen: true
  },
  methods:{
    toggleTitle: function(){
      this.seen = !this.seen
      game.seen = !game.seen
    }
  }
})

var game = new Vue({
  el: "#game",
  data: {
    seen: false,
    image: "../figs/virus_corona.png"
  }
})
