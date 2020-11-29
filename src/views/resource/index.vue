<!--
 * @Description:
 * @version:
 * @Author: hui.wang01
 * @Date: 2020-11-22 15:45:06
 * @LastEditors: hui.wang01
 * @LastEditTime: 2020-11-28 17:55:44
-->
<template>
  <div class="resource">
    <resource-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ResourceList from './components/List.vue'
export default Vue.extend({
  name: 'ResourceIndex',
  components: {
    ResourceList
  }
})
</script>
