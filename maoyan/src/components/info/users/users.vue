<template>
	<div class="top">
	
	<el-table
    :data="tableData"
    border
    style="width: 900px" >
    <el-table-column
      prop="_id"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      label="账号"
      prop="username"
      width="180">
    </el-table-column>
    <el-table-column
      label="密码"
      prop="password"
      width="180">
    </el-table-column>
    <el-table-column
      label="状态"
      prop="status"
      width="180">
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index,scope.row)">删除</el-button>

      </template>
    </el-table-column>
  </el-table>
  <section>
  	<!-- 新增界面 -->
  	<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form label-width="80px" :rules="addFormRules" :model="users" :ref="users">
				<el-form-item label="账号" prop="username">
					<el-input v-model="users.username" auto-complete="off" @blur="isUser" placeholeder="请输入账号"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
			    <el-input type="password" v-model="users.password" auto-complete="off"></el-input>
			  </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('users')">重置</el-button>
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click="reg" :loading="addLoading" :disabled="flag">提交</el-button>
			</div>
		</el-dialog>
		<!-- 编辑界面 -->
			<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form  label-width="80px" :model="users" :ref="users">
				<el-form-item label="账号" prop="username">
					<el-input  v-model="users.username" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="users.password" auto-complete="off"  type="password"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click="updataUser">提交</el-button>
			</div>
		</el-dialog>	

  </section>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="curPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="eachPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  <el-button type="primary" @click="handleAdd">新增</el-button>
	</div>
    


</template>

<script>
import router from "../../../router/index.js"
import axios from "axios";
 export default {
    name:"userList",
    data() {
        	
      return {
      tableData: [],
      curPage:1,
      eachPage:10,
      users:{
        username: '',
        password:'',
        userId:""
      },
      flag:true,
      total:0,
			addFormVisible: false,//新增界面是否显示
			addLoading: false,
			addFormRules: {
  			username:  [
         {required: true, message: '请输入账号', trigger: 'blur'}
        ],
  			password:[
  			 {required: true, message: '请输入密码', trigger: 'blur'}
  			]
			},
			editFormVisible: false,//编辑界面是否显示
			editLoading: false
    }
    },
    mounted(){
    	this.userList()
    },
    methods: {
      handleSizeChange(val) {
        this.eachPage=val
        this.userList()
      },
      handleCurrentChange(val) {
        this.curPage = val
        this.userList()
      },
    	//页面渲染
     async userList(){
     	const{data} = await axios.get("http://localhost:3001/users/getuserByPage",{
     		 params:{
              page:this.curPage,
              rows:this.eachPage
            }
     	})
      console.log(data.rows)
     	this.tableData=data.rows
      this.total = data.total
      console.log(this.curPage)
     },
     //删除
     async handleDelete(index, row) {
        const {data} =  await axios.get("http://localhost:3001/users/delUser",{
        	params:{
        		_id:row._id
        	}
        })
        this.userList()
      },
      //修改用户
    async updataUser(index,row){
    	const {data} = await axios.post("http://localhost:3001/users/updates",{
    			username:this.users.username,
    			password:this.users.password,
    			_id:this.userId
    	})
    	 this.userList()
    	 this.editFormVisible = false;
       console.log(1)
       console.log(this.users.userId)
    },
    //判断用户
   		async isUser(){
   			const {data} = await axios.post("http://localhost:3001/users/isUse",{
   				username:this.users.username,
   			})
        // console.log(data)
   			console.log(data.count)
   			if(data.count === 1){
   				count:1
   				console.log(data.count)
   				console.log("账号已存在")
          this.flag = true
          this.$message.error('账号已存在');
   			} else{
   				count:0
   				console.log(data.count)
   				console.log("账号未创建")
           this.flag=false
           this.$message('账号未被注册');
   			}
						
   		},
   		//注册
   		async reg(){
   			const{
   				data
   			} = await axios.post("http://localhost:3001/users/reg",{
   				username:this.users.username,
   				password:this.users.password
   			})
   			console.log(data)
   			this.addFormVisible = false
   			this.userList()
        this.resetForm()

   		},
   		//新增页面
		handleAdd: function () {
				this.addFormVisible = true
				this.addForm = {
					username: '',
					password:''
				};
		},
		//打开编辑页面
		handleEdit: function (index, row) {
      this.userId = row._id
			this.editFormVisible = true;
      this.users.username = row.username
      this.users.password = row.password
		},
      resetForm() {
        this.users.password = "",
        this.users.username = ""
      }
    }
  }
</script>

<style scoped>
.top{
  margin-top: 51px;
}
</style>