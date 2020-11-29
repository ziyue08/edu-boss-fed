<!--
 * @Description:
 * @version:
 * @Author: hui.wang01
 * @Date: 2020-11-28 17:00:52
 * @LastEditors: hui.wang01
 * @LastEditTime: 2020-11-28 17:00:52
-->
<template>
  <div class="menu-create">
    <create-or-edit></create-or-edit>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { createOrUpdateMenu, getEditMenuInfo } from '@/services/menu'
import { Form } from 'element-ui'
import CreateOrEdit from './components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'MenuCreate',
  components: { CreateOrEdit },
  data () {
    return {
    }
  },
  methods: {
  }
})
</script>
<style lang="scss" scoped>
</style>
