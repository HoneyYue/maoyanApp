<template>
  <div>
    <div class="trees">
      <el-menu default-active="2" class="el-menu-vertical-demo" @select="handleNodeClick">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-star-on"></i>用户管理</template>
          <el-menu-item index="user">用户列表</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-picture"></i>电影管理</template>
          <el-menu-item index="movie">电影列表</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-menu"></i>影院管理</template>
          <el-menu-item index="theater">影院列表</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-view"></i>排片管理</template>
          <el-menu-item index="schedule">新增排片</el-menu-item>
        </el-submenu>
      </el-menu>
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
  methods:{    
    handleNodeClick(data) {
        switch(data){
          case 'user':
            router.push('/info/users')
            break;
          case 'movie':
            router.push('/info/movie')
            break;
          case 'theater':
            router.push('/info/theater')
            break;
          case 'schedule':
            router.push('/info/schedule')
            break;
        }
      }
  }
}
</script>

<style scoped>
.el-menu {
  margin: 0;
  margin-top: 70px;
  border: none;
}
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
    width: 160px;
    height: 100%;
    z-index: 1;
    background: #eef1f6;
    margin-right: 20px;
    font-size: 14px;
    color: #fff;
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
  margin-left: 200px;
  margin-top: 20px;
}
</style>