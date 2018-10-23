<template>
    <div class="matchmain">
        <div class="tab">
            <el-table
            :data="matchData"
            style="width: 100%">
            <el-table-column
            fixed
            prop="name"
            label="放映电影"
            width="150">
            </el-table-column>
            <el-table-column
            prop="en_name"
            label="放映电影(英文)"
            width="150">
            </el-table-column>
            <el-table-column
            prop="movie_uptime"
            label="上映时间"
            width="150">
            </el-table-column>
            <el-table-column
            prop="style"
            label="3d/2d"
            width="150">
            </el-table-column>
            <el-table-column
            prop="movie_time"
            label="时长"
            width="150"
            >
            </el-table-column>
            <el-table-column
            prop="area"
            label="地区"
            >
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="120">
                <template slot-scope="scope">
                    <el-button
                    @click.native.prevent="getRow(scope.$index, matchData)"
                    type="text"
                    size="large">
                    匹配影院
                    </el-button>
                </template>
            </el-table-column>
            </el-table>
            
        </div>
        <div class="changepage">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size='playingrows'
            @current-change="changepage">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    getRow(index, rows) {
      // console.log(rows);
      this.$router.push(
        "/matchcinema?id=" +
          rows[index]._id +
          "&name=" +
          rows[index].name +
          "&movietime=" +
          rows[index].movie_time
      );
    },
    changepage(page) {
      this.$store.commit("match_changepage", page);
    }
  },
  computed: {
    matchData() {
      return this.$store.state.match.playingdata;
    },
    total() {
      return this.$store.state.match.playingtotal;
    },
    playingrows() {
      return this.$store.state.match.playingrows;
    }
  },
  created() {
    this.$store.dispatch({
      type: "match_getplaying"
    });
  }
};
</script>
<style scoped>
.changepage {
  /* text-align: center; */
  position: absolute;
  bottom: 0;
  left: calc(50% - 200px);
}
.matchmain {
}
</style>
