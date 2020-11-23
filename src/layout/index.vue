<!--
 * @Description:
 * @version:
 * @Author: hui.wang01
 * @Date: 2020-11-22 16:14:24
 * @LastEditors: hui.wang01
 * @LastEditTime: 2020-11-22 17:19:34
-->
<template>
  <el-container>
  <el-aside width="200px">
    <app-aside/>
  </el-aside>
  <el-container>
    <el-header>
      <app-header />
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</el-container>
</template>
<script lang="ts">
import Vue from 'vue'
import AppAside from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'
export default Vue.extend({
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader
  }
})
</script>
<style scoped>
.el-container {
  min-height: 100vh;
  min-width: 980px;
}
.el-aside {
  background: #d3dce6
}
.el-header {
  background: #fff;
}
.el-main {
  background: #e9eef3
}
</style>
