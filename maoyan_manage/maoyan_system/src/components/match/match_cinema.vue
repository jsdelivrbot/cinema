<template>
    <div>
       <div>
          <div class="moviename">{{moviename}}-排片列表</div>
          <el-button type="primary" icon="el-icon-back" @click="goback"></el-button>
           <el-date-picker
          v-model="movie_day"
          type="date"
          placeholder="选择日期"
          value-format='yyyy-MM-dd'
          @change='getday'>
          </el-date-picker>
          <el-button type="primary" icon="el-icon-circle-plus" @click="addmovtime">排片</el-button>
         <el-table
            :data="movie_cinema"
            style="width: 100%">
           <el-table-column
            fixed
            prop="cinema"
            label="院线"
            width="150">
          </el-table-column>
           <el-table-column
            label="排片信息"
            width="150">
                <template slot-scope="scope">
                    <el-button
                    @click.native.prevent="getcinemainfo(scope.$index, movie_cinema)"
                    type="text"
                    size="large">
                    查看
                    </el-button>
                </template>
             </el-table-column>
             <el-table-column
            label="操作">
                <template slot-scope="scope">
                    <el-button
                    @click.native.prevent="addcinemamovie(scope.$index, movie_cinema)"
                    type="text"
                    size="large">
                    排片
                    </el-button>
                </template>
             </el-table-column>
           </el-table>
        </div>
        <!-- 弹出窗口 -->
        <div>
          <el-dialog title="排片列表" :visible.sync="timedialog" width='50%'>
            <el-table
            :data="cinematime"
            style="width: 100%">
              <el-table-column
                fixed
                prop="day"
                label="日期"
                width="150">
              </el-table-column>
              <el-table-column
                prop="starttime"
                label="开始时间"
                width="150">
              </el-table-column>
              <el-table-column
                prop="endtime"
                label="结束时间"
                width="150">
              </el-table-column>
              <el-table-column
                prop="hall_name"
                label="影厅"
                width="150">
              </el-table-column>
              <el-table-column
            fixed="right"
            label="操作"
            width="150">
                <template slot-scope="scope">
                    <el-button
                    @click.native.prevent="removematch(scope.$index, cinematime)"
                    type="text"
                    size="large">
                    删除
                    </el-button>
                    <el-button
                    @click.native.prevent="updatematch(scope.$index, cinematime)"
                    type="text"
                    size="large">
                    修改
                    </el-button>
                </template>
            </el-table-column>
            </el-table> 
            <el-dialog title="修改" :visible.sync="updatedialog" width='30%' append-to-body>
              <el-row>
               <el-time-picker
                  v-model="startTime"               
                  :picker-options="{
                    format:'HH:mm'
                  }"
                  placeholder="选择开始时间"
                  @change='changstarttime'>
                </el-time-picker>
              </el-row>
              <el-row>
                <el-time-select
                  v-model="movieendtime"
                  readonly
                  >
                </el-time-select>
              </el-row>
              <el-row>
                <el-input v-model="price" placeholder="修改票价"></el-input>
              </el-row>
              <el-row>
                <el-button type="primary" @click="updateinfo">修改</el-button>
              </el-row>
            </el-dialog>
          </el-dialog>
          <el-dialog title="排片" :visible.sync="addtime" width='48%'>
            <el-row class="inputrow">
              <el-col :span="8">
                <el-date-picker
                v-model="movie_day"
                type="date"
                placeholder="选择日期"
                value-format='yyyy-MM-dd'
                readonly>
                </el-date-picker>   
              </el-col>
              <el-col :span="8">        
                <el-time-picker
                  v-model="startTime"               
                  :picker-options="{
                    format:'HH:mm'
                  }"
                  placeholder="选择开始时间"
                  @change='changstarttime'>
                </el-time-picker>
              </el-col>
              <el-col :span="8">
                <el-time-select
                  v-model="movieendtime"
                  readonly
                  >
                </el-time-select>
              </el-col>
            </el-row>
            <el-row class="inputrow">    
                <el-col :span="8">
                <el-select v-model="cinemaid" placeholder="请选择影院" @change='changecinema'>
                  <el-option
                    v-for="item in cinemabox"
                    :key="item._id"
                    :label="item.cinema_name"
                    :value="item._id">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-select v-model="hallindex" placeholder="请选择影厅">
                  <el-option
                    v-for="(item,index) in hallbox"
                    :key="item._id"
                    :label="item.hall_name"
                    :value="index">
                  </el-option>
              </el-select>
              </el-col>
              <el-col :span="8">
                <el-input v-model="price" placeholder="票价"></el-input>
              </el-col>
            </el-row>
            <el-row class="inputrow" type='flex' justify="center">
              <el-button type="primary" @click="addtimeinfo">排片</el-button>
            </el-row>
          </el-dialog>
        </div>
   
    </div>
</template>
<script>
export default {
  data() {
    return {
      movie_day: "",
      moviename: "",
      nowcinema: "",
      timedialog: false,
      addtime: false,
      updatedialog: false,
      startimetab: [],
      movietime: "",
      startTime: new Date(),
      moviestarttime: "",
      movieendtime: "00:00",
      cinemaid: "",
      hallindex: 0,
      price: "",
      timingid: ""
    };
  },
  created() {
    this.moviename = this.$route.query.name;
    this.movietime = this.$route.query.movietime;
    this.$store.dispatch({
      type: "match_getcineam",
      movies_id: this.$route.query.id
    });
  },
  computed: {
    movie_cinema() {
      return this.$store.state.match.movie_cinema;
    },
    cinematime() {
      return this.$store.state.match.cinematime;
    },
    hallbox() {
      return this.$store.state.match.hallbox;
    },
    cinemabox() {
      return this.$store.state.match.cinemabox;
    }
  },
  methods: {
    getday(day) {
      this.$store.commit({
        type: "match_changeday",
        day
      });
      this.$store.dispatch({
        type: "match_getcineam",
        movies_id: this.$route.query.id
      });
    },
    addmovtime() {
      if (this.movie_day == "" || this.movie_day == null) {
        this.$alert("请选择日期", "警告", {
          confirmButtonText: "确定"
        });
      } else {
        this.addtime = true;
        this.$store.dispatch({
          type: "match_getallcinema"
        });
        this.$store.dispatch({
          type: "match_gethall",
          _id: this.cinemaid
        });
      }
    },
    changecinema(cinema_id) {
      // console.log(cinema_id);
      this.$store.dispatch({
        type: "match_gethall",
        _id: this.cinemaid
      });
    },
    getcinemainfo(index, row) {
      if (this.movie_day == "" || this.movie_day == null) {
        this.$alert("请选择日期", "警告", {
          confirmButtonText: "确定"
        });
      } else {
        this.cinemaid = row[index]._id;
        this.$store.dispatch({
          type: "match_getmovietime",
          cinema: row[index]._id,
          movies: this.$route.query.id,
          day: this.movie_day
        });
        this.timedialog = true;
      }
    },
    addcinemamovie(index, row) {
      if (this.movie_day == "" || this.movie_day == null) {
        this.$alert("请选择日期", "警告", {
          confirmButtonText: "确定"
        });
      } else {
        this.cinemaid = row[index]._id;
        this.addmovtime();
      }
    },
    changstarttime(time) {
      function addzero(tm) {
        if (tm < 10) {
          tm = "0" + tm;
        }
        return tm;
      }
      let hour = time.getHours();
      let mintue = time.getMinutes();
      let endhour = new Date(
        time.getTime() + this.movietime * 60000
      ).getHours();
      let endmintue = new Date(
        time.getTime() + this.movietime * 60000
      ).getMinutes();
      hour = addzero(hour);
      mintue = addzero(mintue);
      endhour = addzero(endhour);
      endmintue = addzero(endmintue);
      this.moviestarttime = hour + ":" + mintue;
      this.movieendtime = endhour + ":" + endmintue;
      // console.log(this.moviestarttime, this.movieendtime);
    },
    addtimeinfo() {
      if (this.moviestarttime == "") {
        this.$message("请选择开始时间");
      } else {
        this.$confirm("排片后将无法修改影厅, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let obj = {};
            obj.hall = this.hallbox[this.hallindex]._id;
            obj.seat = this.hallbox[this.hallindex].hall_seat;
            obj.starttime = this.moviestarttime;
            obj.endtime = this.movieendtime;
            obj.cinema = this.cinemaid;
            obj.movies = this.$route.query.id;
            obj.price = this.price;
            obj.day = this.movie_day;
            this.$store.dispatch({
              type: "match_addtiming",
              obj
            });
            this.addtime = false;
            this.$message({
              type: "success",
              message: "排片成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消排片"
            });
          });
      }
    },
    goback() {
      this.$router.go(-1);
    },
    removematch(index, row) {
      this.$confirm("删除后将无法恢复, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch({
            type: "match_remove",
            timeid: row[index]._id,
            seatid: row[index].seat[0]
          });
          this.timedialog = false;
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    updatematch(index, row) {
      this.updatedialog = true;
      this.timingid = row[index]._id;
    },
    updateinfo() {
      this.$store.dispatch({
        type: "match_update",
        _id: this.timingid,
        starttime: this.moviestarttime,
        endtime: this.movieendtime
      });
      this.updatedialog = false;
      this.timedialog = false;
    }
  }
};
</script>
<style scoped>
.inputrow {
  margin-top: 20px;
}
.moviename {
  padding: 10px 0;
  font-size: 20px;
}
</style>

