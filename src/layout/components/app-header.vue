<!--
 * @Description:
 * @version:
 * @Author: hui.wang01
 * @Date: 2020-11-22 17:06:04
 * @LastEditors: hui.wang01
 * @LastEditTime: 2020-11-22 17:21:18
-->
<template>
<div class="header">
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
  </el-breadcrumb>
  <el-dropdown>
    <el-avatar :size="30" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item >用户ID</el-dropdown-item>
      <el-dropdown-item divided>退出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</div>
</template>
<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
