<template>
  <div>
    <el-row class="header_row">
       <el-col :span="1">&nbsp;</el-col>      
       <el-col :span="5" class="project_title">猫眼移动端后台管理系统</el-col>      
       <el-col :span="15">&nbsp;</el-col>
       <el-col :span="3" style="color: rgb(64, 158, 255)">
        <span> 欢迎您：{{username}}</span>
        <span @click="outlogin">退出</span>
       </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="4">
      <div class="left_bar">
        <el-menu default-active="1"
        class="el-menu-vertical-demo"
        @select='jump'>
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">用户</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-picture"></i>
          <span slot="title">电影</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-view"></i>
          <span slot="title">影院管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-refresh"></i>
          <span slot="title">匹配</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-date"></i>
          <span slot="title">订单</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-time"></i>
          <span slot="title">热映</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-bell"></i>
          <span slot="title">待映</span>
        </el-menu-item>
        </el-menu>
      </div>
      </el-col>
      <el-col :span="20">
      <div class="main_show">
        <router-view/>
      </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "index",
  methods: {
    jump(index) {
      switch (index) {
        case "1":
          this.$router.push("/user");
          break;
        case "2":
          this.$router.push("/movies");
          break;
        case "3":
          this.$router.push("/cinema");
          break;
        case "4":
          this.$router.push("/match");
          break;
        case "5":
          this.$router.push("/order");
          break;
        case "6":
          this.$router.push("/playing");
          break;
        case "7":
          this.$router.push("/wait");
          break;
      }
    },
    outlogin() {
      this.$store.commit("changelogin2");
      sessionStorage.removeItem("acc");
      this.$router.push("/login");
    }
  },
  data() {
    return {
      username: ""
    };
  },
  created() {
    console.log(this.islogin);
    if (this.islogin) {
      console.log("进");
      this.username = sessionStorage.acc;
    } else {
      this.$router.push("/login");
    }
  },
  computed: {
    islogin() {
      return this.$store.state.islogin;
    }
  }
};
</script>

<style scoped>
.el-menu-item {
  font-size: 16px;
  color: rgb(114, 112, 112);
  padding-left: 10px;
  margin: 10px;
}
.header_row {
  /* background-color: #efefef; */
  height: 80px;
  padding-bottom: 10px;
}
.project_title {
  font-weight: 700;
  font-size: 22px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: rgb(64, 158, 255)
}
.header_row > .el-col {
  line-height: 80px;
}
</style>


