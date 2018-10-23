<template>
    <div>

        <div>
            <el-input v-model="search_name"
                   placeholder="请输入电影名"
                   style="width:400px;">
              <el-button slot="append"
              icon="el-icon-search"
                         @click="search_btn">查询</el-button>
            </el-input>
            
            <el-button plain
                       @click="clear_btn(search_name)">刷新</el-button>
            <el-button plain
                       @click="dialogVisible = true">增加</el-button>
        </div>
        

            <!-- 添加 -->
            <el-dialog title="添加" ref="multipleTable" :visible.sync="dialogVisible" width="" @selection-change="changeFun">
                <template>
                    <!-- 多选框 -->
                    <el-table ref="multipleTable" :data="movies" tooltip-effect="dark" style="width: 100%" @selection-change="changeFun">
                        <el-table-column type="selection" @click='toggleSelection()' width="55">
                        </el-table-column>
                        <el-table-column prop="name" label="电影名" width="120">
                        </el-table-column>
                        <el-table-column prop="en_name" label="英文名" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="movie_type" label="类型" width='120'>
                        </el-table-column>
                        <el-table-column prop="movie_uptime" label="上映时间" width='120'>
                        </el-table-column>
                        <el-table-column prop="movie_time" label="影片时长" width='120'>
                        </el-table-column>
                        <el-table-column prop="movie_soc" label="评分" width='100%'>
                        </el-table-column>

                    </el-table>
                            <!-- 翻页 -->
        <el-pagination
            background
            layout="prev, pager, next"
            :total='total' @current-change="current_change">
        </el-pagination>
                  
                </template>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisibles">确 定</el-button>
                </span>
            </el-dialog>

     

           <!-- 删除对话框 -->
        <el-dialog title="删除"
                   :visible.sync="delWindow"
                   width="30%">
            <span>你确定要删除吗？</span>
            <span slot="footer"
                  class="dialog-footer">
                <el-button @click="delWindow = false">取 消</el-button>
                <el-button type="primary"
                           @click="delWindows">确 定</el-button>
            </span>
        </el-dialog>
        <template>
        <el-table :data="emps" border style="width: 100%;" class="cell">

            <el-table-column fixed prop="name" label="电影名" width="150" >
            </el-table-column>
            <el-table-column prop="en_name" label="英文名" width="120" >
            </el-table-column>
            <el-table-column prop="movie_type" label="类型" width="120" >
            </el-table-column>
            <el-table-column prop="style" label="特效" width="120" >
            </el-table-column>
            <el-table-column prop="area" label="国家" width="120" >
            </el-table-column>
            <el-table-column prop="movie_uptime" label="上映时间" width="120" >
            </el-table-column>
            <el-table-column prop="movie_time" label="时长" width="120" >
            </el-table-column>
            <el-table-column prop="movie_star" label="演员" width="120" >
            </el-table-column>
            <el-table-column prop="movie_soc" label="评分" width="120" >
            </el-table-column>
            <el-table-column prop="like" label="喜欢" width="120" >
            </el-table-column>
            <el-table-column prop="yesterday" label="昨日票房排行" width="120" >
            </el-table-column>
            <el-table-column prop="first_week" label="首周票房" width="120" >
            </el-table-column>
            <el-table-column prop="box_office" label="累计票房" width="120" >
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button  size="small" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </template>
        <!-- 翻页 -->
        <el-pagination
        background
        layout="prev, pager, next"
        :total='emps.length'>
    </el-pagination>
      

    </div>
</template>

<script>
import axios from "axios";
const IP = "http://127.0.0.1:3000";

const rows = 5;
export default {
  data() {
    return {
      dialogVisible: false,
      decDialogVisible: false,
      delWindow: false,
      search_name: ""
    };
  },
  methods: {
    changeFun(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection)
    },
    //添加
    dialogVisibles() {
      for (let item of this.multipleSelection) {
        this.$store.dispatch({
          type: "addmovies",
          data: item._id
        });
      }

      this.dialogVisible = false;
    },

    //初始化数据
    refresh(page, rows) {
      this.$store.dispatch({
        type: "refreshEmps",
        page,
        rows
      });
    },

    //翻页
    current_change(val) {
      this.val = val;
      this.refresh(val, rows);
    },

    // 点击删除事件
    handleDelete(index, row) {
      this.delWindow = true;
      this._id = row._id;
      //   console.log(this._id)
    },
    // 删除对话框
    delWindows() {
      this.$store.dispatch({
        type: "delmove",
        _id: this._id
      });
      this.delWindow = false;
    },
    // changeFun(val) {
    //     if (val) {
    //         rows.forEach(row => {
    //             this.$refs.multipleTable.toggleRowSelection(row);
    //         });
    //     } else {
    //         this.$refs.multipleTable.clearSelection();
    //     }
    // },
    //查询
    search_btn() {
      if (this.search_name === "") {
        this.refresh(1, 6);
      }
      let value = this.search_name;
      this.$store.commit({
        type: "searchMovie",
        value
      });
      this.search_name = "";
    },
    //清空
    clear_btn() {
      this.refresh();
    },
    selection(index, row) {
      this.$store.dispatch({
        type: "addmovie",
        _id: this._id // 获取一个，进行删除，
      });
    }
  },

  computed: {
    movies() {
      return this.$store.state.wait.movies;
    },
    emps() {
      return this.$store.state.wait.emps;
    },
    curPage() {
      return this.$store.state.wait.newPage;
    },
    maxPage() {
      return this.$store.state.wait.maxPage;
    },
    // curages() {
    //     return this.$store.state.wait.empmaxpages;
    // },
    // maxpages() {
    //     return this.$store.state.wait.empcurpages;
    // },
    total() {
      return this.$store.state.wait.total;
    },
    totals() {
      return this.$store.state.wait.totals;
    }
  },
  created() {
    this.refresh(1, 5);
  }
};
</script>
<style scoped>
.add {
  float: right;
}
.el-input {
  width: 200px;
}
.el-pagination {
  text-align: center;
}
</style>