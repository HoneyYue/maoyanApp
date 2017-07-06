<template>
<div class="comce">  
  <div class="cde">
     <div id="login">  
            <h1>注册页面</h1>  
            <input v-model="username" @blur="isUse"  placeholder="用户名" ></input>  
            <input v-model="password" type="password" required="required" placeholder="密码"></input>  
            <button @click="regBtn" class="but" :disabled="flag">注册</button>  
        
    </div>
  </div>
</div>
</template>

<script>
// import axios from "axios";
import router from '../../router/index.js'
import axios from "axios"
export default {
  name: 'reg',
  data(){
      return{
        username:"",
        password:"",
        flag:false
      }
    },
    methods:{
      open5() {
            this.$notify.info({
              title: '消息',
              message: '这是一条消息的提示消息'
            });
            //router.push('/reg')
          },
          handleSelect(key, keyPath) {
            // console.log(key, keyPath);
          },

     async regBtn(){
        if(this.password == ""){
           alert("请输入密码")
        }else{
          const{
          data
        } = await axios.post('http://localhost:3001/users/reg',{
          username:this.username,
          password:this.password
        })
       
        router.push(`/login/${this.username}`)
        // console.log(this.username,this.password);
      }
        },
        
      async isUse(){
        const{
          data
        } = await axios.post('http://localhost:3001/users/isUse',{
          username:this.username
        })
        if (data.count === 1) {
          {
            count: 0
            // console.log(data.count)
            this.flag=true
            this.$message.error('已注册账号');

          }
        } else {
          {
            count: 0
            // console.log(data.count)
            this.flag=false
            this.$message('账号未被注册');
          }
        }
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
    width: 300px;   
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
    font-weight: 700;
}  
</style>