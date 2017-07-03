<template>
  <div>
    <h1>登录页面</h1>
    <div class="input-text"><span>用户名：</span><el-input v-model="username" placeholder="请输入用户名"></el-input></div>
    <div class="input-text"><span>密电码：</span><el-input v-model="password" placeholder="请输入密码"></el-input></div>
    <div>
      <el-button  @click="reg" type="primary">注册</el-button>
    </div>
  </div>
</template>

<script>
import router from '../../router/index.js'
export default {
  name: 'login',
  data(){
  	return {
  		username:this.$route.params.username,
      password:'',
  	}
  },
  methods:{
    reg(){
      router.push('/')
    },
  }
}
</script>

<style scoped>
.input-text{
  overflow: hidden
}
.input-text span{
  float: left;
  line-height: 42px;
}
.input-text .el-input{
  width: 240px;
  float: left;
}
</style>