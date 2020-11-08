<template>
<div id="app">
  <h1>大前端学习</h1>
  <p class="text">Hello world</p>
  <router-view />
</div>
</template>
<style lang="scss" scoped>
// @import "~@/styles/variables.scss";
 // css 里要加~符号才能使用@目录
.text {
  color: $success-color;
}
</style>
