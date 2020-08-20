Vue.component('virus-image', {
  props: {
    src: String,
    id: Number,
  },
  template: `
    <div v-bind:id="id">
      <img v-bind:src='src' v-on:mouseover="deleteSelf"></img>
    </div>
  `,
  methods:{
    deleteSelf: function(){
      this.$el.parentNode.removeChild(this.$el);
    }
  }
})