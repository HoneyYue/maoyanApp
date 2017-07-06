<template>
  <div class="schedule-tabs">
  	<div class="selc-movie">
      <div class="items">
        <span>电影名称</span>
        <el-select v-model="movieValue" placeholder="请选择" @change="movieChange">
          <el-option v-for="item in movieOptions" :key="item.value" :label="item.value" :value="item.label"></el-option>
        </el-select>
      </div>
  	  <div class="items">
        <span>影院名称</span>
        <el-select v-model="studioValue" placeholder="请选择" @change="studioChange">
          <el-option v-for="item in studioOptions" :key="item.value" :label="item.value" :value="item.label"></el-option>
        </el-select>
      </div>
      <div class="items">
        <span>放映厅</span>
        <el-select v-model="theaterValue" placeholder="请选择" @change="theaterChange">
          <el-option v-for="item in theaterOptions" :key="item.value" :label="item.value" :value="item.label"></el-option>
        </el-select>
      </div>
      <div class="items">
        <span>电影价格</span>
        <el-input v-model="price" placeholder="请输入内容"></el-input>
      </div>
      <div class="items">
        <span>放映时间</span>
        <el-date-picker  v-model="time" type="datetime" placeholder="选择日期时间"> </el-date-picker>
      </div>
      <el-button type="info" size="small" style="margin-top:4px;" @click="addSchedule">新增排片</el-button>
      <el-button type="success" size="small" style="margin-top:4px;" @click="showStudio">查看影院</el-button>
  	</div>

    <el-tabs type="border-card" v-model="activeName">
  	  <el-tab-pane label="影院信息" name="therter">
  	  	<el-table :data="theaterData" border stripe style="width: 900px">
  	    	<el-table-column prop="theater" label="影院" width="750"> </el-table-column>
  	    	<el-table-column prop="handels" label="操作" width="150"> 
  	    		<template scope="scope">			        
  			        <el-button type="success" size="small" @click="toSchedule(scope.row)">查看场次</el-button>
  			    </template>
  	    	</el-table-column>
  	    </el-table>
        <el-pagination
          @size-change="sizeChange"
          @current-change="getCurPage"
          :current-page='~~page.curPage'
          :page-sizes="[10, 20, 30, 40]"
          :page-size='~~page.eachPage'
          layout="total, sizes, prev, pager, next, jumper"
          :total='page.count'>
        </el-pagination> 
  	  </el-tab-pane>

  	  <el-tab-pane label="场次信息" name="schedule">
  	  	<el-table :data="scheduleData" border stripe style="width: 900px">
  	    	<el-table-column prop="movie" label="电影" width="200"> </el-table-column>
  	    	<el-table-column prop="studio" label="影院" width="200"> </el-table-column>
  	    	<el-table-column prop="theater" label="影厅" width="80"> </el-table-column>
  	    	<el-table-column prop="price" label="价格" width="70"> </el-table-column>
  	    	<el-table-column prop="show_time" label="时间" width="180"> </el-table-column>
  	    	<el-table-column prop="handels" label="操作" width="170">
  	    		<template scope="scope">			        
  			        <el-button type="success" size="small" @click="showSeats(scope.row)">查看座位</el-button>
  			        <el-button type="danger" size="small" @click="delBtn(scope.row)">删除</el-button>
  			    </template>
  	    	</el-table-column>
  	    </el-table>
        <el-pagination
          @size-change="sizeChangeOne"
          @current-change="getCurPageOne"
          :current-page='~~theaterPage.curPage'
          :page-sizes="[10, 20, 30, 40]"
          :page-size='~~theaterPage.eachPage'
          layout="total, sizes, prev, pager, next, jumper"
          :total='theaterPage.count'>
        </el-pagination>
  	  </el-tab-pane>
  	</el-tabs>

    <!-- 座位弹出框界面 -->
    <el-dialog title="座位信息" v-model="addFormVisible">
      <el-table :data="seatingData" border stripe style="width: 700px">
        <el-table-column prop="seatings" label="座次信息" width="250"> </el-table-column>
        <el-table-column prop="nows" label="座次状态" width="250"> </el-table-column>
        <el-table-column prop="handels" label="购票" width="200"> 
          <template scope="scope">              
              <el-button type="success" size="small" @click="buyTicket(scope.row)">购票</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="sizeChangeSeat"
          @current-change="getCurPageSeat"
          :current-page='~~seatPage.curPage'
          :page-sizes="[10, 20, 30, 40]"
          :page-size='~~seatPage.eachPage'
          layout="total, sizes, prev, pager, next, jumper"
          :total='seatPage.count'>
        </el-pagination>
    </el-dialog>

	
  </div>
</template>

<script>
import router from "../../../router/index.js"
import axios from 'axios'

export default {
  name: 'schedule',
  data() {
      return {
        //弹出框默认为不显示
        addFormVisible:false,
        movieId: "0",
        studioId: "0",
        theaterId: "0",
        scheduleId: "0",
        price: 30,
        time:'',
        //选择影院或场次
      	activeName: 'therter',
        //电影下拉和默认value
      	movieOptions: [],
        movieValue: '',
        //影厅下拉和默认value
        theaterOptions: [],
        theaterValue: '',
        //影院下拉和默认value
        studioOptions: [],
        studioValue: '',
        //影院列表
        theaterData: [],
        //场次列表
		    scheduleData:[],
        //座位信息
        seatingData:[],
        page:{
          curPage: 1,
          eachPage: 10,
          maxPage: 0,
          count: 0,
          data: []
        },
        theaterPage:{
          curPage: 1,
          eachPage: 10,
          maxPage: 0,
          count: 0,
          data: []
        },
        seatPage:{
          curPage: 1,
          eachPage: 10,
          maxPage: 0,
          count: 0,
          data: []
        }
      }

    },
    mounted() {
      this.movieMounted();
      this.studioMounted();
    },
    methods:{ 
      sizeChange(val){          
            this.page.eachPage = val
            this.theaterListMounted()
        },
      getCurPage(val){ 
          this.page.curPage = val
          this.theaterListMounted()
      },
      sizeChangeOne(val){          
            this.theaterPage.eachPage = val
            this.scheduleListMounted(this.studioId)
      },
      getCurPageOne(val){ 
          this.theaterPage.curPage = val
          this.scheduleListMounted(this.studioId)
      },
      sizeChangeSeat(val){          
          this.seatPage.eachPage = val
          this.showSeating(this.scheduleId);
      },
      getCurPageSeat(val){ 
          this.seatPage.curPage = val
          this.showSeating(this.scheduleId);
      },
      //初始化加载movie 
      async movieMounted() {
          const {
              data
          } = await axios.get('http://localhost:3001/movie/getMovies')
          var movieName = data.map((item) => {
            return {
              value: item.cName,
              label: item._id
            }
          })
          this.movieOptions = movieName
      },
      //加载影院信息
      async studioMounted() {
          const {
              data
          } = await axios.get('http://localhost:3001/studio/getStudios')
          var studioName = data.map((item) => {
            return {
              value: item.name,
              label: item._id
            }
          })
          this.studioOptions = studioName
      },
      //点击查看场次
      toSchedule(row){
        this.activeName = "schedule"
        //row.label影院id
        this.studioId = row.label
        this.scheduleListMounted(row.label);        
      },
      //点击电影下拉刷新影院列表
      movieChange(movieId){
        this.movieId = movieId;       
      },
      studioChange(studioId){
        this.theaterValue = '';
        this.studioId = studioId;
        //影院change时查询影厅信息
        this.theaterMounted();
      },
      theaterChange(theaterId){
        this.theaterId = theaterId
      },
      //显示影院
      showStudio(){
          this.activeName = "therter"
          if(this.movieId == '0'){
            this.$alert('兄弟没有你没有选择电影信息', '兄弟出错了', {
              confirmButtonText: '确定'
            });
          }else {
            this.theaterListMounted()
          } 
      },
      //新增排片
      addSchedule(){
//         console.log(this.time)
        var d = new Date(this.time);  
        var timeList=(d.getMonth() + 1)+ '/' + d.getDate()  + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes(); 
          // console.log(timeList)
        this.saveSchedule(timeList)
      },
      //删除排片
      delBtn(rows){
        this.delSchedule(rows.label)
      },
      //显示座位
      showSeats(rows){
        //console.log(rows.label)
        this.scheduleId = rows.label
        this.showSeating(rows.label)
      },
      //买票
      buyTicket(rows){
        this.buyOneTicket(rows.label)
      },
      async theaterMounted() {
        const {
            data
        } = await axios.get('http://localhost:3001/theater/getTheatersByStudioId', {
          params:{
            studioId: this.studioId
          }
        })
        var theaterName = data.map((item) => {
            return {
              value: item.name,
              label: item._id
            }
        })
        this.theaterOptions = theaterName
      },
      //影厅列表查询
      async theaterListMounted() {
        const {
            data
        } = await axios.get('http://localhost:3001/schedule/getStudiosByMovieId', {
          params:{
            movieId: this.movieId,
            page: this.page.curPage,
            rows: this.page.eachPage
          }
        })
        this.page.data = data.rows;
        this.page.count = data.total;

        var studioAddress = data.rows.map((item) => {
            return {
              theater: item.address,
              label: item._id
            }
          })
        this.theaterData = studioAddress
      },
      //场次列表查询
      async scheduleListMounted(getStudioId) {
        const {
            data
        } = await axios.get('http://localhost:3001/schedule/getSchedulesByStudioId', {
          params:{
            movieId: this.movieId,
            studioId: getStudioId,
            page: this.theaterPage.curPage,
            rows: this.theaterPage.eachPage
          }
        })
        this.theaterPage.data = data.rows;
        this.theaterPage.count = data.total;
        var scheduleList = data.rows.map((item) => {
            return {
              movie: item.movieId.cName,
              theater: item.theaterId.name,
              studio: item.studioId.name,
              price: item.price,
              show_time: item.show_time,
              label: item._id
            }
          })
        this.scheduleData = scheduleList
      },
      //新增排片
      async saveSchedule(nowTime) {
        const {
            data
        } = await axios.get('http://localhost:3001/schedule/addSchedule', {
          params:{
            movieId: this.movieId,
            studioId: this.studioId,
            theaterId: this.theaterId,
            scheduleId: this.scheduleId,
            price:this.price,
            showTime:nowTime,
          }
        })
      },
      //del排片
      async delSchedule(id) {
        const {
            data
        } = await axios.get('http://localhost:3001/schedule/removeSchedule', {
          params:{
            _id : id
          }
        })
        if(data.status){
          this.scheduleListMounted(this.studioId);
        }       
      },
      //查看座位
      async showSeating(id) {
        const {
            data
        } = await axios.get('http://localhost:3001/schedule/seatList', {
          params:{
            scheduleId : id,
            page: this.seatPage.curPage,
            rows: this.seatPage.eachPage
          }
        })
        this.seatPage.data = data.rows;
        this.seatPage.count = data.total;
        var seating = data.rows.map((item) => {
            return {
              seatings: item.seatId.displayName,
              nows:item.state == 0 ? "未出售" : "已出售",
              label: item._id
            }
          })
        this.seatingData = seating
        this.addFormVisible = true     
      },
      async buyOneTicket(id) {
        const {
            data
        } = await axios.get('http://localhost:3001/schedule/buyTicket', {
          params:{
           _id : id
          }
        })
        this.showSeating(this.scheduleId);     
      }

    }
  
}
</script>

<style >
body{
  font-family: verdana,helvetica,arial,sans-serif;
}
.schedule-tabs{
  margin-top: 90px;
	width: 930px;
}
.schedule-tabs h1{
  margin-bottom: 15px;
}
.el-table__body-wrapper{
	overflow: hidden !important;
}
.selc-movie{
  width: 900px;
  overflow: hidden;
}
.selc-movie .items{
  float: left;
  margin-right: 30px;
  margin-bottom: 15px;
}
.el-select,.el-input{
  width: 200px;
}
.el-dialog{
  top: 8% !important;
}
.el-dialog--small{
 width: 55% !important; 
}
.el-pagination{
  margin-top: 15px;
}
</style>