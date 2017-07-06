<template>
 <div class="comce">
    <div class="cde">
      <div id="login">  
        <h1>登录页面</h1> 
          <input type="text" required="required" placeholder="用户名" v-model="username"></input>  
          <input type="password" required="required" v-model="password" placeholder="密码"></input>
          <button @click="login" class="but" type="submit">登录</button> 
          <button style="margin-left: 20px;" @click="reg" class="but" type="submit">注册</button> 
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from '../../router/index.js'
export default {
  name:"login",
    data() {
      // console.log(this.$route.params)
      return {
        password:this.$route.params.password,
        username:this.$route.params.username,
        activeIndex: '1'
      };
    },
    methods:{
      reg(){
            router.push('/reg')
      },
    async login(){
      const{
        data
      } =  await axios.post('http://localhost:3001/users/login',{
        username:this.username,
        password:this.password
      })


      if(data.data.length === 1) {
        this.$notify({
              title: '成功',
              message: '登录成功',
              type: 'success'
        });
        router.push('/info')
        } else {
          this.$message({
                message: '警告哦，请输入密码或注册',
                type: 'warning'
              });
        }
      },
          handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }

}
</script>


<style scoped>
.comce{   
    width: 100%;   
    height: 100%;
    overflow: hidden;   
    font-style: sans-serif;
    position: absolute;
    background: url('../../assets/bg.jpg');
    background-size: cover;
}
.cde{   
    width: 100%;
    height: 100%;
    font-family: verdana,helvetica,arial,sans-serif;
    margin: 0; 
    background-size:100% 100%;
}
#login{   
    position: absolute;   
    top: 50%;   
    left:50%;   
    margin: -150px 0 0 -150px;   
    width: 300px;   
    height: 300px;   
} 
#login h1{   
    color: #fff;   
    text-shadow:0 0 3px;   
    letter-spacing: 1px;   
    text-align: center;   
}   
h1{   
    font-size: 2em;   
    margin: 0.67em 0;   
}   
input{   
    width: 278px;   
    height: 18px;   
    margin-bottom: 10px;   
    outline: none;   
    padding: 10px;   
    font-size: 18px;   
    color: #fff;     
    border-top: 1px solid #312E3D;   
    border-left: 1px solid #312E3D;   
    border-right: 1px solid #312E3D;   
    border-bottom: 1px solid #56536A;   
    border-radius: 4px;   
    background-color: #2D2D3F;   
}   
.but{   
    width: 140px;   
    min-height: 20px;   
    display: block;   
    background-color: #4a77d4;   
    border: 1px solid #3762bc;   
    color: #fff;   
    padding: 9px 14px;   
    font-size: 15px;   
    line-height: normal;   
    border-radius: 5px;   
    margin: 0;
    float: left; 
    font-weight: 700;
}  
</style>