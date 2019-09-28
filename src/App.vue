<template>
  <div id="app">
    <CodeSelector />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CodeSelector from './components/CodeSelector.vue';

@Component({
  components: {
    CodeSelector,
  },
})
export default class App extends Vue {}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  margin-top: 60px;
}
</style>