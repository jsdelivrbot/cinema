<template>
    <div class="center">
        <!-- 搜索框 -->
        <div class="header">
            <el-button plain @click="addDialog = true" >增加数据</el-button>
            <el-button plain @click="removeMovies">刷新</el-button>
               <!--搜索框 -->
                <div style="margin-top: 15px width:300px;">
                    <el-input placeholder="请输入内容" v-model="search" class="input-with-select" style="width:400px;">
                        <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:100px;">
                        <el-option label="电影名" value="name"></el-option>
                        <el-option label="类型" value="movie_type"></el-option>
                        <el-option label="演员" value="movie_star"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search" @click="searchMovies"></el-button>
                    </el-input>
            </div>
        </div>

        <!-- 表格 -->
    <el-table
            :data="movies" stripe  
            style="width: 100% " >
        <el-table-column
        label="序号"
        fixed
        type="index"
        width="50"
        height="10" >
        </el-table-column>

        <el-table-column
        prop="name"
        label="电影"
        fixed
        width="150"
        align="center"
        >
        </el-table-column>

        <el-table-column
        prop="en_name"
        label="电影英文名"
        width="150"
        align="center">
        </el-table-column>

        <el-table-column
        prop="movie_type"
        label="电影类型"
        width="150"
        align="center">
        </el-table-column>

        <el-table-column
        prop="style"
        label="维度"
        width="150"
        align="center">
        </el-table-column>

        <el-table-column
        prop="area"
        label="国家"
        width="150"
        align="center">
        </el-table-column>

        <el-table-column
        prop="movie_uptime"
        label="上映时间"
        width="150"
        align="center">
        </el-table-column>

        <el-table-column
        prop="movie_time"
        label="总时长"
        width="150"
        align="center">
        </el-table-column>

        <el-table-column
        prop="movie_soc"
        label="评分"
        width="150"
        
        align="center">
        </el-table-column>

        <el-table-column
        prop="like"
        label="想看"
        width="150"
        align="center">
        </el-table-column>

        <el-table-column
        class="el-table-column"
        prop="info"
        label="简介"
        width="200"
        :show-overflow-tooltip='true'
        align="center">
        </el-table-column>

        <el-table-column
            prop="movie_img_head"
            label="电影首图"
            width="150"
            :show-overflow-tooltip='true'
            align="center">
        </el-table-column>

        <el-table-column
            prop="director_name"
            label="导演"
            width="150"
            align="center">
        </el-table-column>

        <el-table-column
            prop="director_img"
            label="导演照片"
            width="150"
            :show-overflow-tooltip='true'
            align="center">
        </el-table-column>

        <el-table-column
            prop="actor_name"
            label="演员"
            :show-overflow-tooltip='true'
            width="150"
            align="center">
        </el-table-column>


        <el-table-column
            prop="actor_img"
            label="演员照片"
            width="150"
            :show-overflow-tooltip='true'
            align="center">
        </el-table-column>

        <el-table-column
            prop="video"
            label="宣传视频"
            width="150"
            :show-overflow-tooltip='true'
            align="center">
        </el-table-column>
        <el-table-column
            prop="img_box"
            label="剧照"
            width="150"
            :show-overflow-tooltip='true'
            align="center">
        </el-table-column>

        <el-table-column 
            label="操作" 
             fixed="right"
            align="center"
            width="200" >
        <template slot-scope="scope">
            <el-button type="text"  @click="moviesEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text"  @click="moviesDelete(scope.$index, scope.row)">删除</el-button>
        </template>
        </el-table-column>
     </el-table>
   
     <!-- 翻页 -->
    <div class="page">
        <el-pagination
            background
            layout="prev, pager, next"
            :total='maxPage*10' @current-change="current_change">
        </el-pagination>
    </div>  
          <!-- 删除弹窗 -->
    <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span>是否确认删除？</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button @click="movies_Delete">确 定</el-button>
        </span>
    </el-dialog>

          <!-- 增加弹窗 -->
    <el-dialog
        title="增加电影"
        :visible.sync="addDialog"
        width="45%"
        center>
        <el-form >
            <el-form-item label="电影全称:" >
                <el-input v-model="addData.name" placeholder="请输入电影名"    style="margin:10px"></el-input>
            </el-form-item>

            <el-form-item label="英文名称:">
                <el-input v-model="addData.en_name" placeholder="请输入电影英文名"     style="margin:10px" ></el-input>
            </el-form-item>

            <el-form-item label="电影类型:" >
                <el-input v-model="addData.movie_type" placeholder="如：爱情,动作..."    style="margin:10px"></el-input>
            </el-form-item>

            <el-form-item label="电影维度:" >
                <el-input v-model="addData.style" placeholder="3D,IMAX..."    style="margin:10px"></el-input>
            </el-form-item>

            <el-form-item label="电影国家:" >
                <el-input v-model="addData.area" placeholder="请输入电影国家"    style="margin:10px"></el-input>
            </el-form-item>

            <el-form-item label="上映时间:" >
                <el-input v-model="addData.movie_uptime" placeholder="请输入上映时间"    style="margin:10px"></el-input>
            </el-form-item>

            <el-form-item label="电影时长:" >
                <el-input v-model="addData.movie_time" placeholder="请输入电影总时长 如：120"    style="margin:10px"></el-input>
            </el-form-item>

            <el-form-item label="电影评分:" >
                <el-input v-model="addData.movie_soc" placeholder="请输入电影评分"    style="margin:10px"></el-input>
            </el-form-item>

            <el-form-item label="想看人数:" >
                <el-input v-model="addData.like" placeholder="请输入电影评分"    style="margin:10px"></el-input>
            </el-form-item>

            <el-form-item label="电影简介:" >
                <el-input v-model="addData.info" placeholder="请输入电影简介"    style="margin:10px"></el-input>
            </el-form-item>

            <el-form-item label="电影首图:" >
                    <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="IP+'/movies/movies_add_headimg'"
                    :on-success="add_head_success"
                    :file-list="fileList"
                    >
                    <el-button slot="trigger" size="small" type="primary">选取封面图</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传一张照片，不然则会被覆盖</div>
                </el-upload>
            </el-form-item>

            <el-form-item label="电影导演:" >
                    <el-input v-model="director.name" placeholder="请输入电影导演"    style="margin:10px"></el-input>
            </el-form-item>

            <el-form-item label="导演照片:" >
                    <el-upload
                            class="upload-demo"
                            ref="upload"
                            :action="IP+'/movies/movies_add_director_img'"
                            :on-success="add_director_success"
                            :file-list="fileList"
                            >
                        <el-button slot="trigger" size="small" type="primary">选取导演照片</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传一张照片，不然则会被覆盖</div>
                        </el-upload>
            </el-form-item>

            <div v-for="(item,index) in actors" :key="index">
                        <el-form-item label="电影演员:" >  
                            <el-input v-model="allActors[index].name" placeholder="请输入电影演员" style="margin:10px"></el-input>
                        </el-form-item>
                
                        <el-form-item label="饰演角色:" >  
                            <el-input v-model="allActors[index].playing" placeholder="请输入演员角色名"   style="margin:10px"></el-input>
                        </el-form-item>

                        <el-form-item label="演员照片:" >  
                    
                            <el-upload
                            class="upload-demo"
                            ref="upload"
                            :action="IP+'/movies/movies_add_actors_img'"
                            :on-success="add_actors_success"  
                            :file-list="fileList"  
                            >
                            <el-button slot="trigger" size="small" type="primary" >选择演员照片</el-button>
                            </el-upload>
                        </el-form-item>
            </div>   
            <el-button type="success" plain @click="addActors" id="addActors">添加更多相关演员</el-button>
            <p v-if="show" class="red">最多只能添加5个演员信息</p>

            <el-form-item label="宣传视频:" >  
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            :action="IP+'/movies/movies_add_video'"
                            :on-success="add_video_success"
                            :file-list="fileList"
                            >
                        <el-button slot="trigger" size="small" type="primary">选取视频</el-button>
                        </el-upload>
            </el-form-item>


            <el-form-item label="电影剧照:" >  
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            :action="IP+'/movies/movies_add_imgbox'"
                            :on-success="add_imgbox_success"
                            :file-list="fileList"
                            multiple>
                        <el-button slot="trigger" size="small" type="primary">选取剧照</el-button>
                        </el-upload>
            </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialog = false">取 消</el-button>
            <el-button @click="addMovies">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 修改弹窗 -->
    <el-dialog
            title="修改电影"
            :visible.sync="upDialog"
            width="45%"
            center>
        <el-form >
                <el-form-item label="电影全称:" >
                <el-input v-model="upData.name" placeholder="请输入电影名"    style="margin:10px"></el-input>
            </el-form-item>

            <el-form-item label="英文名称:">
                <el-input v-model="upData.en_name" placeholder="请输入电影英文名"     style="margin:10px" ></el-input>
            </el-form-item>

            <el-form-item label="电影类型:" >
                <el-input v-model="upData.movie_type" placeholder="如：爱情,动作..."    style="margin:10px"></el-input>
            </el-form-item>

            <el-form-item label="电影维度:" >
                <el-input v-model="upData.style" placeholder="3D,IMAX..."    style="margin:10px"></el-input>
            </el-form-item>

            <el-form-item label="电影国家:" >
                <el-input v-model="upData.area" placeholder="请输入电影国家"    style="margin:10px"></el-input>
            </el-form-item>

            <el-form-item label="上映时间:" >
                <el-input v-model="upData.movie_uptime" placeholder="请输入上映时间"    style="margin:10px"></el-input>
            </el-form-item>

            <el-form-item label="电影时长:" >
                <el-input v-model="upData.movie_time" placeholder="请输入电影总时长"    style="margin:10px"></el-input>
            </el-form-item>

            <el-form-item label="电影评分:" >
                <el-input v-model="upData.movie_soc" placeholder="请输入电影评分"    style="margin:10px"></el-input>
            </el-form-item>

            <el-form-item label="想看人数:" >
                <el-input v-model="upData.like" placeholder="请输入电影评分"    style="margin:10px"></el-input>
            </el-form-item>

            <el-form-item label="电影简介:" >
                <el-input v-model="upData.info" placeholder="请输入电影简介"    style="margin:10px"></el-input>
            </el-form-item>         

            <el-form-item label="电影首图:" >
                    <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="IP+'/movies/movies_add_headimg'"
                    :on-success="up_head_success"
                    :file-list="fileList"
                    >
                    <el-button slot="trigger" size="small" type="primary">是否重新上传电影首图</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传一张照片，不然则会被覆盖</div>
                </el-upload>
            </el-form-item>

            <el-form-item label="电影导演:" >
                    <el-input v-model="director.name" placeholder="请输入电影导演"    style="margin:10px"></el-input>
            </el-form-item>

            <el-form-item label="导演照片:" >
                    <el-upload
                            class="upload-demo"
                            ref="upload"
                            :action="IP+'/movies/movies_add_director_img'"
                            :on-success="add_director_success"
                            :file-list="fileList"
                            >
                        <el-button slot="trigger" size="small" type="primary">是否重新上传导演照片</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传一张照片，不然则会被覆盖</div>
                        </el-upload>
            </el-form-item>

            <div v-for="(item,index) in upActors" :key="index">
                        <el-form-item label="电影演员:">  
                            <el-input v-model="upActors[index].name" placeholder="请输入电影演员" style="margin:10px"></el-input>
                        </el-form-item>

                        <el-form-item label="饰演角色:" >  
                            <el-input v-model="upActors[index].playing" placeholder="请输入演员角色名"   style="margin:10px"></el-input>
                        </el-form-item>
                    <div @click="up_actor_click(index)">
                        <el-form-item label="演员照片:" >  
                            <el-upload
                            class="upload-demo"
                            ref="upload"
                            :action="IP+'/movies/movies_add_actors_img'"
                            :on-success="up_actors_success"  
                            :file-list="fileList"  >
                            <el-button slot="trigger" size="small" type="primary">是否重新选择演员照片</el-button>
                            </el-upload>
                        </el-form-item>
                    </div>
            </div>   

             <el-form-item label="宣传视频:" >  
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            :action="IP+'/movies/movies_add_video'"
                            :on-success="up_video_success"
                            :file-list="fileList"
                            >
                        <el-button slot="trigger" size="small" type="primary">重新上传视频</el-button>
                        </el-upload>
            </el-form-item>         

            <el-form-item label="电影剧照:" >  
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            :action="IP+'/movies/movies_add_imgbox'"
                            :before-upload='up_imgbox_before'
                            :on-success="up_imgbox_success"
                            :file-list="fileList"
                            multiple>
                        <el-button slot="trigger" size="small" type="primary">重新上传剧照</el-button>
                        </el-upload>
            </el-form-item>
            <el-form-item label="电影剧照:" >  
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            :action="IP+'/movies/movies_add_imgbox'"
                            :on-success="up_imgbox_success"
                            :file-list="fileList"
                            multiple>
                        <el-button slot="trigger" size="small" type="primary">点击增加更多剧照</el-button>
                        </el-upload>
          
             </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="upDialog = false">取 消</el-button>
            <el-button @click="upMovies">确 定</el-button>
        </span>
    </el-dialog>

    </div>
</template>


<script>
const rows = 5;

export default {
  name: "Movies",
  data() {
    return {
      fileList: [],
      //打开添加先关演员按钮
      actors: ["0"],
      //演员合集
      allActors: [
        {
          name: "",
          playing: ""
        }
      ],
      //导演图片
      director: {
        name: "",
        img: "",
        playing: "导演"
      },
      //剧照
      img_box: [],
      //演员资料
      actor: {},
      //默认第一页
      val: 1,
      //删除弹窗
      centerDialogVisible: false,
      //增加弹窗
      addDialog: false,
      //修改弹窗
      upDialog: false,
      //增加数据
      addData: {},
      //搜索
      search: "",
      select: "name",
      isSreach: false,
      //点击
      isOk: true,
      show: false,
      index: 0,
      //修改
      upData: {},
      //修改演员
      upActors: [],
      //修改演员照片索引
      actorIndex: 0,
      //当前票房
      yesterday:'',
      first_week:'',
      box_office:'',
    };
  },
  methods: {
    //增加电影首图
    add_head_success(data) {
      this.addData.movie_img_head = data
    },
    //增加导演图
    add_director_success(data) {
      this.director.img = data
    },
    //增加演员照片
    add_actors_success(data) {
      if (this.allActors.length == 1) {
        this.allActors[0].img = data
      } else {
        this.allActors[this.index].img = data
      }
    },
      //增加视频
     add_video_success(data) {
         console.log(data)
       this.addData.video = data

    },
    //增加剧照
    add_imgbox_success(data) {
      this.img_box.push(data);
    },
    //修改电影首图
    up_head_success(data) {
      this.upData.movie_img_head = data
    },
    //修改演员照片
    up_actor_click(index) {
      this.actorIndex = index;
    },
    up_actors_success(data) {
      this.allActors[this.actorIndex].img = data
    },
    //修改剧照
     up_video_success(data) {
       this.upData.video = data
    },
    //修改剧照
    up_imgbox_before() {
      this.img_box = [];
    },
    //修改电影剧照
    up_imgbox_success(data) {
      this.img_box.push(data)
          },
    //打开添加相关演员按钮
    addActors() {
      this.actors.push(0);
      this.index++;
      if (this.actors.length <= 6) {
        var item = {
          name: "",
          playing: ""
        };
        this.allActors.push(item);
      } else {
        this.actors.pop();
        this.show = true;
      }
    },

    //初始化数据
    initData(page, rows) {
      if (this.isSreach) {
        this.$store.dispatch({
          type: "movies_searchMovies",
          name: this.select,
          text: this.search,
          page,
          rows
        });
      } else {
        this.$store.dispatch({
          type: "movies_init_movies",
          name: this.select,
          text: this.search,
          page,
          rows
        });
      }
    },
    //翻页
    current_change(val) {
      this.val = val;
      this.initData(val, rows);
    },
    //增加电影
    addMovies(formName) {
      //票房初始化为随机数
      this.addData.yesterday =parseInt(Math.random()*99)+1;
      this.addData.first_week =parseInt(Math.random()*900)+100;
      this.addData.box_office = parseInt(Math.random()*99999)+10000;
      this.addData.director = this.director;
      this.addData.actors = this.allActors;
      this.addData.img_box = this.img_box;
      this.addData.comment = [];
      this.$store.dispatch({
        type: "addMovies",
        data: this.addData,
        page: this.val,
        rows
      });
       this.initData(this.val, rows);
      //重置表单
      this.reset();
      this.addDialog = false;
    },
    //修改电影弹窗 moviesEdit upMovies
    moviesEdit(index, rows) {
      this.upDialog = true;
      this.upData.name = rows.name;
      this.upData.en_name = rows.en_name;
      this.upData.movie_type = rows.movie_type;
      this.upData.style = rows.style;
      this.upData.area = rows.area;
      this.allActors = rows.actors;
      this.upData.movie_uptime = rows.movie_uptime;
      this.upData.movie_time = rows.movie_time;
      this.upData.movie_soc = rows.movie_soc;
      this.upData.like = rows.like;
      this.upData.info = rows.info;
      this.director = rows.director;
      this.img_box = rows.img_box;
      this.upActors = rows.actors;
      this.upData._id = rows._id;
      this.yesterday=rows.yesterday;
      this.first_week=rows.first_week;
      this.box_office=rows.box_office;
    },
    //修改电影
    upMovies() {
      this.upData.yesterday =this.yesterday;
      this.upData.first_week = this.first_week;
      this.upData.box_office = this.box_office;
      this.upData.director = this.director;
      this.upData.actors = this.allActors;
      this.upData.img_box = this.img_box;
      this.upData.comment = [];
      this.$store.dispatch({
        type: "upMovies",
        data: this.upData,
      });
        console.log(this.val)
        //重新渲染页面
    setInterval(()=>{
        this.initData(this.val, rows);
    },1000)
    
      //重置表单
      this.reset();
      this.upDialog = false;
    },
    //搜索
    searchMovies() {
      this.isSreach = true;
      this.$store.dispatch({
        type: "movies_searchMovies",
        name: this.select,
        text: this.search,
        page: 1
      });
    },
    //删除电影
    moviesDelete(index, row) {
      this.centerDialogVisible = true;
      this._id = row._id;
       this.initData(this.val, rows);
    },
    //刷新
    removeMovies() {
      this.isSreach = false;
      this.search='';
      this.select="name";
      this.initData(1, rows);
    },
    //确认删除
    movies_Delete() {
      this.$store.dispatch({
        type: "movies_Delete",
        id: this._id,
        page: this.val,
        rows
      });
      this.centerDialogVisible = false;
    },
    //重置表单
    reset() {
      this.addData = {};
      this.upData = {};
      this.upActors = [];
      this.img_box = [];
      this.show=false;
      this.director = { name: "", img: "", playing: "导演" },
      this.actors = [0];
      this.index = 0;
      this.allActors = [{ name: "", playing: "" }], 
      this.fileList = [];
    }
  },
  computed: {
    //IP
    IP() {
      return this.$store.state.movies.IP;
    },
    //获取初始化数据
    movies() {
      return this.$store.state.movies.movies;
    },
    //当前页数
    curPage() {
      return this.$store.state.movies.newPage;
    },
    //最大页数
    maxPage() {
      return this.$store.state.movies.maxPage;
    }
  },
  //初始化获取所有数据
  created() {
    this.initData(1, rows);
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-around;
}
.el-select {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-input {
  width: 60%;
}
label {
  width: 75px;
  display: inline-block;
}
.flex {
  display: flex;
}
#addActors {
  margin-left: 25%;
}
.el-form-item__label {
  margin-top: 10px;
}
.red {
  color: red;
}
.center{
    position: relative;
}
.page{
    position: absolute;
     bottom: -66px;
    width: 200px;
    left: calc(50% - 100px)
    }
</style>
