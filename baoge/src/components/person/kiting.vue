<template>
  <div class="contain">
    <div class="bankcard">
      <div class="banktitle">绑定银行卡</div>
      <mu-container>
        <mu-form ref="form" :model="validateForm" label-width="100" :label-position="labelPosition" class="mu-demo-form">
          <mu-form-item label="银行卡号" prop="username" :rules="usernameRules">
            <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="银行名称" prop="username" :rules="usernameRules">
            <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="开户行名称" prop="username" :rules="usernameRules">
            <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="卡主姓名" prop="username" :rules="usernameRules">
            <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="身份证号码" prop="username" :rules="usernameRules">
            <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="银行名称" prop="password" :rules="passwordRules">
            <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
          </mu-form-item>
          <!-- <mu-form-item>
            <mu-button color="primary" @click="submit">提交</mu-button>
            <mu-button @click="clear">重置</mu-button>
          </mu-form-item> -->
        </mu-form>
      </mu-container>
      <div class="banktitle">提现金额</div>
      <div>
        <el-input placeholder="请输入提现金额" v-model="input3">
          <template slot="prepend">&yen;</template>
        </el-input>
      </div>
    </div>
    <div class="btn-div">
      <el-button type="primary" size="medium" @click="" class="maxBtn">提现</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: "left",
      usernameRules: [
        { validate: val => !!val, message: "必须填写用户名" },
        { validate: val => val.length >= 3, message: "用户名长度大于3" }
      ],
      passwordRules: [
        { validate: val => !!val, message: "必须填写密码" },
        {
          validate: val => val.length >= 3 && val.length <= 10,
          message: "密码长度大于3小于10"
        }
      ],
      argeeRules: [{ validate: val => !!val, message: "必须同意用户协议" }],
      validateForm: {
        username: "",
        password: "",
        isAgree: false
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(result => {
        console.log("form valid: ", result);
      });
    },
    clear() {
      this.$refs.form.clear();
      this.validateForm = {
        username: "",
        password: "",
        isAgree: false
      };
    }
  }
};
</script>

<style lang="less" scoped>
.contain {
  width: 100vw;
  height: 100vh;
  .bankcard {
    .banktitle {
      font-weight: 600;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      padding: 0 0.5rem;
    }
    .container {
      background: #fff;
    }
  }
  .btn-div {
    padding: 0 0.5rem;
    .maxBtn {
      margin-top: 1rem;
      width: 100%;
    }
  }
}
</style>

