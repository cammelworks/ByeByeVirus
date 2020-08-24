Vue.component('cursor-image', {
  props: {
    src: String,
  },
  template: `
    <div class="ramdom" v-cursor-pos>
      <img class="img-cursor" v-bind:src='src'></img>
    </div>
  `,
})