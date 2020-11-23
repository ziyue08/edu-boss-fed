<!--
 * @Description:
 * @version:
 * @Author: hui.wang01
 * @Date: 2020-11-08 17:12:53
 * @LastEditors: hui.wang01
 * @LastEditTime: 2020-11-22 17:31:13
-->
<template>
<div id="app">
  <router-view />
</div>
</template>
<script lang="ts">
import Vue from 'vue'
// import request from '@/utils/request'
// request({
//   method: 'GET',
//   url: '/boss/v2/api-docs?group=boss-edu-boot'
// }).then(res => {
//   console.log(res)
// })
export default Vue.extend({
  name: 'App'
})

</script>
<style lang="scss" scoped>
// @import "~@/styles/variables.scss";
 // css 里要加~符号才能使用@目录
.text {
  color: $success-color;
}
</style>
