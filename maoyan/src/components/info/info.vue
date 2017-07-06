<template>
  <div>
    <p class="title">猫眼后台项目</p>
    <!-- <ul>
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
    </ul> -->
    <div class="trees">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
    
    <div class="mesg">
    	<router-view></router-view>
    </div>
  </div>
</template>

<script>
import router from '../../router/index.js'

export default {
  name: 'info',
  data(){
    return {
      data: [{
        label: '用户管理',
        children: [{
          label: '用户列表'
        }]
      }, {
        label: '电影管理',
        children: [{
          label: '电影列表'
        }]
      }, {
        label: '影院管理',
        children: [{
          label: '影院列表'
        }]
      },{
        label: '排片管理',
        children: [{
          label: '新增排片'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods:{    
    handleNodeClick(data) {
        console.log(data);
      }
  }
        
}
</script>

<style scoped>
.title{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 70px;
    background: #ef4238;
    color: #fff;
    line-height: 70px;
    text-indent: 70px;
    font-size: 24px;
    letter-spacing: 5px;
}
.trees{
    position: fixed;
    top: 0;
    left: 0;
    width: 150px;
    height: 100%;
    z-index: 1;
    background: #123445;
    margin-right: 20px;
    font-size: 14px;
    color: #fff;
}
.el-tree{
  margin-top: 70px;
  background: #123445;
  border: none;
}
.el-tree-node__content:hover {
    background: #666 !important;
}
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
  margin-left: 180px;
  margin-top: 20px;
}
</style>