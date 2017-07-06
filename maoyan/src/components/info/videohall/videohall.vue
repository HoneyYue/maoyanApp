<template>
  <div style="margin-top: 50px;">
	<el-form  class="demo-ruleForm">
  <el-form-item
    label="影厅"
    prop="age"
  >
    <el-input type="age" v-model.number="age" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm">提交</el-button>
    <el-button @click="resetForm">重置</el-button>
  </el-form-item>
</el-form>


<!-- 列表 -->
<template>
  <el-table
    :data="tableData"
    border
    style="width: 800px">
    <el-table-column
      label="影厅的ID"
      width="180">
      <template scope="scope">
        <el-icon name="time"></el-icon>
        <span style="margin-left: 10px">{{ scope.row._id}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="影厅名称"
      prop="name"
      width="180">
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
  </div>
</template>



<script>
import router from "../../../router/index.js"
import axios from "axios";

export default {
  name:"videhall",

  mounted(){
    	// this.videolist() 
    	this.getTheaterData() 	
    },

data() {
      return {
      
        age: '成都厅',
        tableData: [],
        studioId:this.$route.params._id
    }
},


methods: {
  async submitForm(index, rows) {
  	console.log(this.studioId);
  	console.log('test');
  	const {
  		data
  	}= await axios.post("http://localhost:3001/theater/addTheater",{
              name :this.age,
		      studioId :this.studioId
  	})
  	console.log(data);
  	this.getTheaterData() 
},


resetForm(){
    	this.age="";
    	this.required=false;
    	this.message="";
    },
 async getTheaterData() {
	var {data} = await axios.get("http://localhost:3001/theater/getTheatersByStudioId",{
		params:{
			studioId:this.studioId
		}
	})
	console.log(data);
	this.tableData = data
},

async handleDelete(index, rows){
	const{
		data
	}= await axios.get("http://localhost:3001/theater/del",{
		params:{
			_id:rows._id
		}
	})
	this.getTheaterData() 
}


	
  }

}
</script>
