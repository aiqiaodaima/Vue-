<template>
  <div class="bg-login">
    <div class="middle-box container">
      <div class="login-top">注册账户</div>
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
        <el-form-item prop="phone">
          <el-input status-icon prefix-icon="fa fa-user" type="tel" v-model="ruleForm2.phone" autocomplete="off" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="authCode">
          <el-input status-icon prefix-icon="fa fa-envelope-open" v-model="ruleForm2.authCode" autocomplete="off" placeholder="请输入验证码">
            <el-button slot="append">发送验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" prefix-icon="fa fa-lock" v-model="ruleForm2.pass" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" prefix-icon="fa fa-lock" v-model="ruleForm2.checkPass" autocomplete="off" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register2" class="maxBtn">下一步</el-button>
          <!-- <el-button  @click="submitForm('ruleForm2')" @click="resetForm('ruleForm2')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <!-- <register2 /> -->
  </div>
</template>
<script>
import Vue from "vue";
import register2 from "../login/Register2";
Vue.component("register2", register2);
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
    var validateauthCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (!/^\d{6}$/.test(value)) {
        callback(new Error("验证码格式不正确!"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      ruleForm2: {
        phone: "",
        authCode: "",
        pass: "",
        checkPass: ""
      },
      rules2: {
        phone: [{ validator: validatephone, trigger: "blur" }],
        authCode: [{ validator: validateauthCode, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      loading: false,
      passwordType: "password",
      eyeStatus: "",
      checked: true
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          // 这里成功提交信息
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    register2() {
      this.$router.push({ path: "/register2" });
    }
  },
  computed: {
    onRoutes() {
      // this.$route.path
      // debugger
      console.log(this.$route, this.$router);
      if (this.$route.path.replace("/", "") == "register") {
        return "register2";
      } else if (this.$route.path.replace("/", "") == "OrderDetail") {
        return "Order";
      } else {
        return this.$route.path.replace("/", "");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.bg-login {
  width: 100vw;
  height: 90vh;
  background-color: #f4f6f8;
  padding-top: 10vh;
  .middle-box {
    padding: 10px 0.5rem;
    max-width: 8rem;
    box-shadow: 0 0 10px #fff;
    // border: 1px solid #eaeaea;
    margin: 0 auto;
    .login-top {
      color: #409eff;
      padding: 20px 0;
      width: 100%;
      text-align: center;
      font-size: 32px;
    }
    .demo-ruleForm {
      .maxBtn {
        margin-top: 3rem;
        width: 100%;
      }
    }
  }
}
</style>

