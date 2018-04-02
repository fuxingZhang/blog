<template>
  <div id="app">
    <com-header></com-header>
    <div class="main">
      <router-view></router-view>
    </div>
    <com-footer></com-footer>
  </div>
</template>

<script>
import Header from './components/header.vue'
import Footer from './components/footer.vue'

export default {
  components: {
    comHeader: Header,
    comFooter: Footer
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
@import './style/reset.css';
@import './style/main.css';

html,body{
  height: 100%;
}
#app {
  font-family: Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.main{
  flex: 1 0 auto;
}
</style>
