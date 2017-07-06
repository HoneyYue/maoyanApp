<template>
  <div style="margin-top: 50px;">


<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form  label-width="80px"  ref="addForm">
				<el-form-item label="影院名称" prop="name">
					<el-input v-model="name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="影院地址" prop="address">
			    <el-input v-model="ress" auto-complete="off"></el-input>
			  </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>


<el-dialog title="修改" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form  label-width="80px"  ref="addForm">
				<el-form-item label="影院名称" prop="name">
					<el-input v-model="nameBnt" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="影院地址" prop="address">
			    <el-input v-model="ressBnt" auto-complete="off"></el-input>
			  </el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="handleButtn" :loading="addLoading">修改</el-button>
			</div>
		</el-dialog>


           <el-button
           type="info"
          size="small"
          @click="handleAdd()">新增</el-button>
	<template>
  <el-table
    :data="tableData"
    border
    >
    <el-table-column
      label="影院名称"
      width="280">
      <template scope="scope">
        <el-icon name="time"></el-icon>
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="影院地址"
      width="280">
      <template scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>影院名称: {{ scope.row.name }}</p>
          <p>影院地址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.address }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="280">
      <template scope="scope">
      <el-button
          size="small"
          @click="handle(scope.row._id)">新增放映厅</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
           <el-button
          size="small"
          type="danger"
          @click="handlelist(scope.$index, scope.row)">修改</el-button>
           <el-button
      </template>
    </el-table-column>
  </el-table>
</template>



<div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="curPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="eachPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>


  </div>


</template>

<script>
import router from "../../../router/index.js"
import axios from "axios";

export default {
  name: 'theater',
  data() {
      return {

      	// 分页初始数据
      	curPage:1,
      	eachPage:10,
      	total:0,


        tableData: [],
        //编辑界面
		name: '',
		ress:'',
		nameBnt:"",
		ressBnt:"",
		studioId:""	,	
		addFormVisible: false,//新增界面是否显示
		addLoading: false,
		addFormRules: {
					name: [
						{ required: true, message: '请输入影院名称', trigger: 'blur' }
					],
					address:[
					{required: true, message: '请输入影院地址', trigger: 'blur'}
					]	
				},
		editFormVisible: false,//编辑界面是否显示
		editLoading: false,//编辑页面数据
			editForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
		},
    }
},
  mounted(){
    	this.theaterList()
    	
    },
  methods: {
  	 theater(){
      router.push('/theater')
    },


// 删除
async handleDelete(index, row) {
    const {
        	data
    }= await axios.get('http://localhost:3001/studio/del',{
        params:{
        	_id:row._id
        }
    })
        this.theaterList()
        console.log(row._id)
},


//页面渲染
async theaterList(){
   const{
      	data
    }= await axios.get('http://localhost:3001/studio/query',{
        params:{
        	page:this.curPage,
        	rows:this.eachPage
        }
    	 })
    this.tableData = data.rows
    this.total = data.total

},


//编辑和新增页面是否显示

handleAdd: function () {
	this.addFormVisible = true;
								
},
async handlelist(index, row) {
	this.editFormVisible = true;
	this.studioId = row._id;        
	const{
		data
	}= await axios.post('http://localhost:3001/studio/queryOneMesg',{
             _id: row._id
		})
			this.nameBnt = data[0].name,
			this.ressBnt = data[0].address								
},


//新增
async addSubmit(){
    const{
      	data
    }= await axios.post('http://localhost:3001/studio/addStudio',{
      	address:this.ress,
      	name:this.name,   		
    });
    	this.theaterList()
    	this.addFormVisible  = false;
},


handleEdit: function (index, row) {
	this.editFormVisible = true;
	this.editForm = Object.assign({}, row);
	console.log(row._id)
},


//修改
async handleButtn(){
	const {
		data
	}= await axios.get('http://localhost:3001/studio/update', {
		 params:{
        	name:this.nameBnt,
        	address:this.ressBnt,
        	studioId:this.studioId
        }
	})
		console.log(data)
		this.theaterList()
		this.editFormVisible = false; 
		
},

//新增放映厅
   async handle(_id){
    	location.hash = `/info/videohall/${_id}`


    },


 //分页
handleSizeChange(val) {
   this.eachPage = val
   this.theaterList()
 },
handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.curPage= val
        this.theaterList()
}


   }
  
}
</script>




<style scoped>

</style>