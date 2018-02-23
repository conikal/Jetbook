<template>
  <div>
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="0"><router-link :to="'/'"><img src="/public/jetbook.svg" height="40"></router-link></el-menu-item>
      <el-submenu index="2">
        <template slot="title">More</template>
        <el-menu-item index="2-1">My Booking</el-menu-item>
        <el-menu-item index="2-2">Account</el-menu-item>
        <el-menu-item index="2-3">How it works</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'header-nav',
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
</style>
