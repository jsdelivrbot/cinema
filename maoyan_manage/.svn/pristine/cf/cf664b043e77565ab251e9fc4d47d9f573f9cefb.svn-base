<template>
  <div>
    <div>
      <el-input placeholder="请输入电影名"
                v-model="search_name"
                class="input-with-select"
                style="width:400px;">
        <el-button slot="append"
                   icon="el-icon-search"
                   @click="search_btn"></el-button>
      </el-input>
      <el-button plain
                 @click="clear_btn(search_name)">刷新</el-button>
      <el-button plain
                 @click="dialogVisible = true">增加</el-button>
    </div>

    <!-- 添加窗口 -->
    <el-dialog title="添加"
               ref="multipleTable"
               :visible.sync="dialogVisible"
               width=""
               @selection-change="handleSelectionChange">
      <template>
        <!-- 多选框（在窗口） -->
        <el-table ref="multipleTable"
                  :data="addShow"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           @click='toggleSelection()'
                           width="55">
          </el-table-column>
          <el-table-column prop="name"
                           label="电影名"
                           width="120">
          </el-table-column>
          <el-table-column prop="en_name"
                           label="英文名"
                           show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="movie_type"
                           label="类型"
                           width='120'>
          </el-table-column>
          <el-table-column prop="movie_uptime"
                           label="上映时间"
                           width='120'>
          </el-table-column>
          <el-table-column prop="movie_time"
                           label="影片时长"
                           width='120'>
          </el-table-column>
          <el-table-column prop="movie_soc"
                           label="评分"
                           width='100%'>
          </el-table-column>

        </el-table>
        <!-- 翻页（在窗口） -->
        <el-pagination background
                       layout="prev, pager, next"
                       :total= 'addShow.length'
                  
                       @current-change="handleCurrentChange1">
        </el-pagination>
      </template>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisibles">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除对话框 -->
    <el-dialog title="删除"
               :visible.sync="delWindow"
               width="30%">
      <span>你确定这么做？</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="delWindow = false">取 消</el-button>
        <el-button type="primary"
                   @click="delWindows">确 定</el-button>
      </span>
    </el-dialog>
    <template>
      <el-table :data="movies"
                style="width: 100%">
        <el-table-column prop="name"
                         label="电影名"
                         width="120">
                         <template slot-scope="scope">
                           <span>{{scope.row.movies[0].name}}</span>
                         </template>
        </el-table-column>
        <el-table-column prop="en_name"
                         label="英文名"
                         width="120">
                         <template slot-scope="scope">
                           <span>{{scope.row.movies[0].en_name}}</span>
                         </template>
        </el-table-column>
        <el-table-column prop="movie_type"
                         label="类型"
                         width='120'>
                         <template slot-scope="scope">
                           <span>{{scope.row.movies[0].movie_type}}</span>
                         </template>
        </el-table-column>
        <el-table-column prop="movie_uptime"
                         label="上映时间"
                         width='120'>
                          <template slot-scope="scope">
                           <span>{{scope.row.movies[0].movie_uptime}}</span>
                         </template>
        </el-table-column>
        <el-table-column prop="movie_time"
                         label="影片时长"
                         width='120'>
                          <template slot-scope="scope">
                           <span>{{scope.row.movies[0].movie_time}}</span>
                         </template>
        </el-table-column>
        <el-table-column prop="movie_soc"
                         label="评分"
                         width='100%'>
                          <template slot-scope="scope">
                           <span>{{scope.row.movies[0].movie_soc}}</span>
                         </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">

            <el-button @click.native.prevent="handleDelete(scope.$index, scope.row)"
                       type="text"
                       size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
     <!-- 翻页 -->
          <el-pagination background
                       layout="prev, pager, next"
                       :page-count='movies.length-1'
                            :page-size="movies.length"   
                       @current-change="handleCurrentChange1">
        </el-pagination>

  </div>
</template>
<script>
const rows ='movies.length -1'
const IP = "http://127.0.0.1:3000"
import axios from 'axios'
export default {
    data(){
         return {
      dialogVisible: false,
      decDialogVisible: false,
      delWindow: false,
      search_name: '',
    }
    },
    methods:{
          toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      //单选多选
        toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
     
       this.multipleSelection = val;
       
        console.log(this.multipleSelection)
      
    },
        //添加
        dialogVisibles(){

 for (let item of this.multipleSelection) {
              this.$store.dispatch({
           type: 'playing_addmovie',
            data:item._id
          //  data: this.multipleSelection.map(elem => elem._id)
      })
      }
            // console.log('添加')
            this.dialogVisible=false

        },
        //搜索
        search_btn(){
        if(this.search_name===''){
            return
        }
          let value=this.search_name;
          this.$store.commit({
            type:'playing_searchMovie',
            value
          });
          console.log(this.$store)
          // this.search_name=''
        
        },
        //清空
        clear_btn(){
         this.refresh(1,rows)
          this.search_name=''
        },
        //
        selection(index,row){
             this.$store.dispatch({
        type: 'addmovie',
        _id: this._id // 获取一个，进行删除，
      })
        },
        //跳转到当前页
    handleCurrentChange1(val) {
      console.log(`当前页: ${val}`);
      this.val=val
      this.refresh(val, rows);
    },

    
    // 点击删除事件
    handleDelete (index, row) {
      this.delWindow = true
      this._id = row._id
      console.log(this._id)
    },
       // 删除对话框
    delWindows () {
      this.$store.dispatch({
        type: 'playing_delWindows',
        _id: this._id // 获取一个，进行删除，
      })
      this.delWindow = false
    },
    //刷新页面
       refresh(page,rows){
         console.log(page,'页数')
        this.$store.dispatch({
          type:'playing_takeData',
          page,
          rows
      })
      console.log(page,rows)
    }
    },
      computed: {
    //获取电影的数据
    movies () {
      // console.log(this.$store.state.playing.movies.maxpage,1111)
        return this.$store.state.playing.movies
    },
    maxpage () {
      // console.log(this.$store.state.playing.movies.maxpage,1111)
        return this.$store.state.playing.movies.maxpage
    },
    // //获取添加的电影
    addShow(){
       return this.$store.state.playing.addShow
       
    },
    curpage () {
      return this.$store.state.playing.curpage
    },
    maxpage () {
      return this.$store.state.playing.maxpage
    },
    total(){
     return this.$store.state.playing.total
    },

  },
  created(){
      this.refresh(1,rows)
  }
};
</script>
<style scoped>
.el-input {
  width: 200px;
}
.number{
  display: none
}
</style>

