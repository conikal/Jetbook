<template>
  <div id="app">
    <header-nav/>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    <footer-nav/>
  </div>
</template>
<script>
  import HeaderNav from './components/Header.vue'
  import FooterNav from './components/Footer.vue'

  export default {
    components: {
      HeaderNav,
      FooterNav
    },
    data() {
      return {
        value1: 0,
        value2: 50,
        value3: 42
      }
    },
    methods: {

    }
  }
</script>
<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size: 15px;
  margin: 0;
  color: #34495e;
  background-color: #EFF2F7;
  overflow-y: scroll
}
</style>
