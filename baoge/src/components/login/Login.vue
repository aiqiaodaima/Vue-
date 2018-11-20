<template>
  <div class="bg-login">
    <div class="login-header container">
    </div>
    <div class="middle-box loginscreen bg-white container">
      <div class="login-top"></div>
      <div class="login-title text-center">
        <h1>用户登录</h1>
      </div>
      <el-form inline-message :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item prop="username">
          <el-input status-icon prefix-icon="fa fa-user" v-model="loginForm.username" placeholder="请输入用户手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="fa fa-lock" :type="passwordType" @keyup.enter.native="doLogin" v-model="loginForm.password" placeholder="请输入密码" auto-complete="on">
          </el-input>
          <span class="show-pwd" :style="eyeStatus" @click="showPwd"><i class="icon iconfont icon-eye"></i></span>
        </el-form-item>
        <div class="remeberDiv">
          <el-checkbox v-model="checked">记住密码</el-checkbox>
          <router-link to="/forget" class="forgetP">忘记密码？</router-link>
        </div>
        <div class="remeberDiv">
          <router-link to="/register" class="forgetP">注册账号</router-link>
        </div>
        <el-form-item label="">
          <el-button type="primary" :loading="loading" @click.native.prevent="doLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    var validatephone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!/^1[34578]\d{9}$/.test(value)) {
        callback(new Error("手机号格式不正确!"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        // if (this.ruleForm2.checkPass !== "") {
        //   this.$refs.ruleForm2.validateField("checkPass");
        // }
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [{ validator: validatephone, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      },
      loading: false,
      passwordType: "password",
      eyeStatus: "",
      checked: true
    };
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
        this.eyeStatus = "color:#1296db";
      } else {
        this.passwordType = "password";
        this.eyeStatus = "";
      }
    },
    doLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          // 这里写请求
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
$dark_gray: #889aa4;
body {
  // background: url("~@/assets/images/login-bg.jpg") no-repeat center fixed;
  background-size: cover;
}
.bg-login {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/login.png");
  background-size: 100% 100%;
}
.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.remeberDiv {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  .forgetP {
    text-decoration: none;
    color: #409eff;
    font-size: 14px;
  }
}
.bg-white {
  background-color: #ffffff;
  opacity: 0.8;
}
.middle-box {
  max-width: 8rem;
  z-index: 100;
  margin: 0 auto;
  padding-bottom: 10px;
  box-shadow: 0 0 10px #fff;
}
.loginscreen .middle-box {
  width: 8rem;
}
.login-top {
  background-color: #ad8388;
  height: 6px;
}
.login-title {
  height: 60px;
  padding: 30px;
  color: #409eff;
  font-weight: bold;
  h1 {
    text-align: center;
  }
}
.login-header {
  height: 2rem;
}
.login-logo {
  margin-top: 40px;
}
.login-logo-zh,
.login-logo-en {
  font-weight: bold;
  color: #3b3127;
}
.login-logo-zh {
  font-size: 45px;
  font-family: "宋体";
}
.login-logo-en {
  font-size: 21px;
  font-family: "Helvetica";
}
.middle-box {
  .el-input {
    display: inline-block;
  }
  .el-button {
    display: inline-block;
    width: 100%;
  }
  .el-input__inner {
    &::placeholder {
      text-align: center;
    }
  }
}
.show-pwd {
  position: absolute;
  right: 10px;
  top: 2px;
  font-size: 16px;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
</style>

