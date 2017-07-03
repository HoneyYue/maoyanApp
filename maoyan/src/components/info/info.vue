<template>
  <div>
    <ul>
    	<li>
          <strong>用户管理</strong>
          <p><router-link :to="'/info/users'">用户列表</router-link></p>
      </li>
      <li>
          <strong>电影管理</strong>
          <p><router-link :to="'/info/movie'">电影列表</router-link></p>
      </li>
      <li>
          <strong>影院管理</strong>
          <p><router-link :to="'/info/theater'">影院列表</router-link></p>
      </li>
      <li>
          <strong>排片管理</strong>
          <p><router-link :to="'/info/schedule'">新增排片</router-link></p>
      </li>      
    </ul>
    <div class="mesg">
    	<router-view></router-view>
    </div>
  </div>
</template>

<script>
import router from '../../router/index.js'

export default {
  name: 'info',
  
}
</script>

<style scoped>

ul,li{
  list-style: none;
}
ul{
  margin-top:20px;
  margin-left: 20px;
  width: 160px;
  float: left;
  border: 1px solid #dedede;
}
ul li p{
  margin-left: 15px;
}
ul li {
  line-height: 30px;
}
ul li a{
  text-decoration: none;
}
.mesg{
  float: left;
  margin-left: 20px;
  margin-top: 20px;
}
</style>