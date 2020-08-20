Vue.component('virus-image', {
  props: ['src'],
  template: `
    <img v-bind:src='src'></img>
  `
})