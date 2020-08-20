Vue.component('virus-image', {
  data:{
    styleObject: {
      backgroundColor: 'red',
    }
  },
  props: {
    src: String,
    id: Number,
  },
  template: `
    <div v-bind:id="id" v-random-pos>
      <img class="img-virus" v-bind:src='src' v-on:mouseover="deleteSelf"></img>
    </div>
  `,
  methods:{
    deleteSelf: function(){
      this.$el.parentNode.removeChild(this.$el);
    }
  }
})