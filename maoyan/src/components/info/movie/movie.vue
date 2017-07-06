<template scope="scope" >
  <div>
    <el-button size="small" class="box" type="primary" @click="handleEdit" >新增电影</el-button>
    <el-table
      :data="tableData"
      style="width: 100%" >
      <el-table-column

        prop="cName"
        label="电影名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        label="电影类型"
        width="180">
      </el-table-column>
    <el-table-column label="操作" width="240" >
      <template scope="scope">
        <el-button
          size="small"
          @click="revise(scope.$index, scope.row)" >修改</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        <el-button
        size="small"
        @click="addimg(scope.$index, scope.row)">添加图片</el-button>


      </template>
    </el-table-column>
    </el-table>

<section>
 <el-dialog title="上传图片" v-model="editFormVisibles" :close-on-click-modal="false">
			  <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				 <el-form-item label="图片类型" >
					  <span style="margin-top: 15px;">
						  <el-select v-model="select" slot="prepend" placeholder="请选择">
						      <el-option label="主页图片" value="1"></el-option>
						      <el-option label="剧情图片" value="2"></el-option>
					      </el-select>
					   </span>
				</el-form-item>

				<el-form-item label="上传图片" >
					  <el-upload
						  class="upload-demo"
						  action='http://localhost:3001/files/upload'
						  :on-preview="handlePreview"
						  :on-remove="handleRemove"
						  
						  list-type="picture"
						  :data="imgInfo"
						  :before-upload = "uploadBefore">
						  <el-button size="small" type="primary">点击上传</el-button>
						  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</el-form-item>
			 </el-form>
		</el-dialog>
</section>



<section>
 <el-dialog title="新增电影" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="中文名称" >
					<el-input v-model="cName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="英文名称" >
					<el-input v-model="eName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="影片类型" >
					<el-input v-model="type" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="制片国家" >
					<el-input v-model="country" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="片长 " >
					<el-input v-model="duration" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="上映时间" >
					<el-input v-model="release" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="剧情简介"  >
					<el-input
					  type="textarea"
					  :rows="2"
					  v-model="synopsis">
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click="editSubmit" :disabled="this.disabled">提交</el-button>
				<el-button type="primary" @click="editSubmits" :disabled="this.disableds">修改</el-button>
			</div>
		</el-dialog>
</section>

 <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="curPage"
      :page-sizes="[10,20,30]"
      :page-size="eachPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>





  </div>
</template>

<script>
import router from "../../../router/index.js";
import axios from "axios";
export default {
    name: 'movie',
    data() {
        return {
         imgInfo:{
         	movieId:"",
         	type:""
         },
    	 
	      select: '1',
          tableData: [],
          movieId:"",
          editFormVisible: false,
          editFormVisibles: false,
          editLoading: false,
          cName:"",
          eName:"",
          type:"",
          country:"",
          duration:"",
          release:"",
          synopsis:"",
          disabled: false,
          disableds: false,
          curPage:1,
          eachPage:10,
          total:0,
          editForm: {
					id: 0,
					name: '',
					age: 0,
					birth: '',
					addr: ''
				},

		  editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
        }
    },

    mounted(){
    	 this.open3()

    },
    methods: {
    	uploadBefore(){
    		this.imgInfo.type = this.select
    	},

    	//显示数据
      async open3() {
		    const {
		      data
		    } = await axios.get('http://localhost:3001/movie/query',{
		           params:{
		       		  page:this.curPage,
		       		  rows:this.eachPage
		          }
		    })
		   this.tableData = data.rows
		   this.total = data.total
	  },
	  //删除
	   async handleDelete(index, row) {
		   	var id = row._id
		   	  const {
		      data
		    } = await axios.get('http://localhost:3001/movie/del',{
		       params:{
		       		_id:id
		       }
		    })
		    this.open3()
       },
       //弹出框
       handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.disableds = true;
				this.disabled = false
				this.editForm = Object.assign({}, row);
				this.cName="",
				this.eName="",
				this.type="",
				this.country="",
				this.duration="",
				this.release="",
				this.synopsis=""
			},
		//添加电影数据
		async editSubmit(){
          const {
		      data
		       } = await axios.post('http://localhost:3001/movie/addMovie',{
			       		cName:this.cName,
			       		eName:this.eName,
			       		type:this.type,
			       		country:this.country,
			       		duration:this.duration,
			       		release:this.release,
			       		synopsis:this.synopsis
		    })
		    this.editFormVisible = false;
		    this.open3()
	       },
	       //显示修改的内容
	       async revise(index, row){
	       	    this.movieId = row._id;
				this.editFormVisible = true;
				this.disabled = true;
				this.disableds = false;
			const {
				data
			} = await axios.post('http://localhost:3001/movie/updates',{
                   _id:row._id
			})
				this.cName=data[0].cName
				this.eName=data[0].eName
				this.type=data[0].type
				this.country=data[0].country
				this.duration=data[0].duration
				this.release=data[0].release
				this.synopsis=data[0].synopsis
		},
        //修改电影数据
           async editSubmits(index, row){
             const {
             	data
             } = await axios.post('http://localhost:3001/movie/revise',{
                    cName:this.cName,
		       		eName:this.eName,
		       		type:this.type,
		       		country:this.country,
		       		duration:this.duration,
		       		release:this.release,
		       		synopsis:this.synopsis,
		       		movieId:this.movieId

             })
             this.editFormVisible = false;
		     this.open3()
       },
       //添加图片
        addimg(index, row){
       	   this.imgInfo.movieId = row._id
       	   this.editFormVisibles = true
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
	    },
	    handlePreview(file) {
	      console.log(file);
	    },

	     //分页
		handleSizeChange(val) {
	        this.eachPage = val
	        this.open3()
	    },
	    handleCurrentChange(val) {
	      	this.curPage = val
	        this.open3()
	    }

	}



}
</script>

<style scoped>
 .el-select .el-input {
    width: 110px;
  }
  .box{
  	margin-top:50px;
  }
</style>