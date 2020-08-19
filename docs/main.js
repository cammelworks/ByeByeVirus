new Vue({
  el: "#start",
  data:{
    seen: true
  },
  methods:{
    toggleTitle: function(){
      this.seen = !this.seen
    }
  }
})