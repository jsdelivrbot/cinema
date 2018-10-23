<template>
  <div class="bg">
    <div class="loginview">
      <div style='font-size:30px;color:rgb(64, 158, 255);margin-bottom:30px;text-align:center'>猫眼管理系统</div>
        <el-form label-position="left" label-width="80px" :model="loginform">
            <el-form-item label="用户名">
                <el-input v-model="loginform.acc"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="loginform.pwd"></el-input>
            </el-form-item>
            <el-form-item style='margin-left:17px'>
                <el-button type="primary" @click="onSubmit">登陆</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      loginform: {
        acc: "",
        pwd: ""
      }
    };
  },
  methods: {
    onSubmit() {
      axios.post("http://127.0.0.1:3000/login", this.loginform).then(data => {
        if (data.data == "suc") {
          sessionStorage.setItem("acc", this.loginform.acc);
          this.$store.commit("changelogin");
          this.$router.push("/movies");
        } else {
          this.$message.error("登陆失败，请检查用户名或密码");
          this.$store.commit("changelogin2");
        }
      });
    }
  }
};
</script>
<style scoped>
.loginview {
  width: 20%;
  margin: 0 auto;
  background-color: rgba(243, 242, 242, 0.5);
  border-radius: 10px;
  padding: 40px 30px 10px 30px;
  margin-top: calc(50% - 500px);
}
.bg {
  background-image: url("http://127.0.0.1:3000/images/sign.png");
  height: 100vh;
  overflow: hidden;
}
</style>

