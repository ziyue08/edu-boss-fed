<!--
 * @Description:
 * @version:
 * @Author: hui.wang01
 * @Date: 2020-11-22 15:39:27
 * @LastEditors: hui.wang01
 * @LastEditTime: 2020-11-22 21:15:34
-->
<template>
  <div class="login">
    <!-- model="form"
    :rules="rules"
    ref="ruleForm"
    el-form-item 绑定 prop 属性
    -->
    <el-form ref="form"
    :model="form"
    :rules="rules"
    label-width="80px"
    label-position="top"
    class="login-form">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
        class="login-btn"
        type="primary"
        :loading="isLoginLoading"
        @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import qs from 'qs'
import request from '@/utils/request'
import { login } from '@/services/user'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 3, max: 18, message: '请输入正确的密码', trigger: 'blur' }
        ]
      },
      isLoginLoading: false
    }
  },
  methods: {
    async onSubmit () {
      try {
        await (this.$refs.form as Form).validate()

        // 登录按钮loading
        this.isLoginLoading = true

        // 2. 验证通过 -> 提交表单
        const { data } = await login(this.form)
        // const { data } = await request({
        //   method: 'POST',
        //   url: '/front/user/login', // 此处要走代理，否则无法跨域请求
        //   headers: { 'content-type': 'application/x-www-form-urlencoded' },
        //   data: qs.stringify(this.form) // axios 默认发送是 application/json 格式的数据
        // })
        // 3. 处理请求结果
        if (data.state !== 1) {
          // 失败：给出提示
          this.$message.error(data.message)
        } else {
          // 登录成功时，记录登录状态，状态需要能够全局访问（放到Vuex容器中）。
          this.$store.commit('setUser',data.content);
          // 然后在访问需要登录的页面的时候，判断有没有登录状态（路由拦截器）
          // 成功：跳转到首页
          this.$message.success('登录成功')
          this.$router.push({
            name: 'home'
          })
        }

      } catch (err) {
        console.log('登录失败', err)
      }
      // 结束登录按钮的loading
      this.isLoginLoading = false
    }
  }

})
</script>
<style lang="scss" scoped>
  .login {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-form {
      width: 300px;
      padding: 20px;
      background: #fff;
      border-radius: 5px;
    }

    .login-btn {
      width: 100%;
    }

  }
</style>
