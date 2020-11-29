<!--
 * @Description:
 * @version:
 * @Author: hui.wang01
 * @Date: 2020-11-28 17:22:22
 * @LastEditors: hui.wang01
 * @LastEditTime: 2020-11-28 19:04:36
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline"> -->
        <el-form ref="form" :model="form">
          <el-form-item prop="name" label="资源名称">
            <el-input v-model="from.name" ></el-input>
          </el-form-item>
          <el-form-item prop="url" label="资源路径">
            <el-input v-model="form.url" ></el-input>
          </el-form-item>
          <el-form-item label="资源分类">
            <el-select
              v-model="form.categoryId"
              placeholder="请选择资源"
              clearble
            >
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="item in resourceCatrgories"
                :key="item.id"
                ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
            type="primary"
            @click="onSubmit"
            :disabled="isLoading"
            >查询搜索</el-button>
            <el-button
              @click="onReset"
              :disabled="isLoading"
            >重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="资源名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="url"
        label="资源路径">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createdTime"
        label="添加时间">
      </el-table-column>
       <el-table-column
        label="操作">
         <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据，用法参考 demo。 -->
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
    <!--
        total 总记录数
        page-size 每页大小
        分页组件会自动根据 total 和 page-size 计算出一共分多少页
       -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :disabled="isLoading"
        :current-page.sync="form.current"
        :page-sizes="[5, 10, 20]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>

  </el-card>


  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getResourcePages } from '@/services/resource'
import { getResourceCategories } from '@/services/resource-category'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'ResourceList',
  data () {
    return {
      resources: [], // 资源列表
      form: {
        name: '',
        url: '',
        current: 1, // 默认查询第1页数据
        size: 5, // 每页大小
        categoryId: null // 资源分类
      },
      totalCount: 0,
      resourceCategories: [], // 资源分类列表
      isLoading: true // 加载状态
    }
  },
  created () {
    this.loadResources()
    this.loadResourceCategories()
  },
  methods: {
    async loadResourceCategories () {
      const { data } = await getResourceCategories()
      this.resourceCategories = data.data
    },
    async loadResources () {
      this.isLoading = true // 展示加载中状态
      const { data } = await getResourcePages(this.form)
      this.resources = data.data.records
      this.totalCount = data.data.total
      this.isLoading = false // 关闭加载中状态
    },
    onSubmit () {
      this.form.current = 1 // 筛选查询从第 1 页开始
      this.loadResources()
    },
    handleEdit (item: any) {
      console.log('handleEdit', item)
    },
    handleDelete (item: any) {
      console.log('handleDelete', item)
    },
    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1 // 每页大小改变重新查询第1页数据
      this.loadResources()
    },
    handleCurrentChange (val: number) {
      // 请求获取对应页码的数据
      this.form.current = val // 修改要查询的页码
      this.loadResources()
    },
    onReset () {
      // 重置的表单项一定要用prop绑定数据
      (this.$refs.form as Form).resetFields()
      this.form.current = 1 // 重置回到第1页
      this.loadResources()
    }
  }
})
</script>
