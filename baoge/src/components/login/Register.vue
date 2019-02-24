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
            <el-button v-if="isSending" slot="append">重新获取({{second}}s)</el-button>
            <el-button v-else slot="append" @click="getCode()" :disabled = isSing>发送验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="fa fa-lock" v-model="ruleForm2.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" prefix-icon="fa fa-lock" v-model="ruleForm2.checkPass" autocomplete="off" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')" class="maxBtn"  >下一步</el-button>
          <!-- <el-button  @click="submitForm('ruleForm2')" @click="resetForm('ruleForm2')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <!-- <register2 /> -->
  </div>
</template>
<script>
// import Vue from "vue";
// import register2 from "../login/Register2";
// Vue.component("register2", register2);
export default {
  name: "login",
  data() {
     let checkPhone = (rule, value, callback) => {
      let phone = this.ruleForm2.phone
      this.$post('register/selectPhone', {phone}).then(res => {
        if (res.msg === '6') {
          callback()
        } else {
          this.isSing = true
          callback(new Error('手机号码已存在!'))
        }
      })
    }

    let checkVerifyCode = (rule, value, callback) => {
      this.$post('note/checkmsg', { code: value})
        .then(res => {
          console.log(res)
          if (res.msg === '1') {
            this.isPassVerify = true
            callback()
          } else {
            this.isPassVerify = false
            callback(new Error("验证码错误"))
          }
        })
    }
    var validatephone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!/^1[34578]\d{9}$/.test(value)) {
        callback(new Error("手机号格式不正确!"));
      } else{
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
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      ruleForm2: {
        phone: "",
        authCode: "",
        password: "",
        checkPass: ""
      },
      rules2: {
        phone: [{ validator: validatephone, trigger: "blur" }, {validator: checkPhone,  trigger: 'blur' }],
        authCode: [{ validator: validateauthCode, trigger: "blur" },{ validator: checkVerifyCode, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      loading: false,
      passwordType: "password",
      eyeStatus: "",
      checked: true,
      isSending:false,
      second:60,
      isPassVerify:false,  // 判断验证码是否正确
      isSing:false, //判断是否注册
    };
  },
  methods: {
    getCode(){
      console.log(this.isSing)
      if(this.isSing){
        return false;
      }
      let phone = this.ruleForm2.phone
      if (phone) {
        this.isSending = !this.isSending
        this.second--
        let timer = setInterval(() => {
          this.second--
          if (this.second === 0) {
            this.isSending = !this.isSending
            this.second = 60
            this.verifyBtnVal = '重新获取'
            clearInterval(timer)
          }
        }, 1000);
        this.$post('/note/sendmsg', {
          phone: phone
        }).then(res => {
          if (res.mag === '1') {
            this.$message.error('验证码发送失败!')
          }
        });
      } else {
        this.$message.error('请输入手机号码!')
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.isPassVerify){
            sessionStorage.sing1 = JSON.stringify(this.ruleForm2)
            this.$router.push({ path: "/register2" });
          }
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
      if(this.isPassVerify){
        sessionStorage.sing1 = JSON.stringify(this.ruleForm2)
        this.$router.push({ path: "/register2" });
      }
    }
  },
  computed: {

  }
};
</script>
<style lang="scss" scoped>
// 媒介查询
@media screen  {

}
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

