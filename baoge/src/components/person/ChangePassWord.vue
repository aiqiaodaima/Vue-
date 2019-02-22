<template>
  <div class="contain">
    <mu-appbar style="width: 100%;" color="primary">
      登陆手机
      <mu-button flat slot="right">15918727869</mu-button>
    </mu-appbar>
    <!-- <mu-container>
      <mu-text-field v-model="username" label="请输入您的原始密码" label-float help-text=""></mu-text-field><br />
      <mu-text-field v-model="password" label="请输入您的新密码（6-24位数字或字母）" label-float help-text=""></mu-text-field><br />
      <mu-text-field v-model="password" label="请确认您的新密码（6-24位数字或字母）" label-float help-text=""></mu-text-field><br />
    </mu-container> -->
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="旧密码" prop="password">
        <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <!-- <el-form-item> -->
        <div style="display:flex;justify-content:center;">
          <el-button size="medium" type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button size="medium" @click="resetForm('ruleForm2')">重置</el-button>
        </div>
      <!-- </el-form-item> -->
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      var str = /^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/g;
      var validatePass1 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入旧密码"));
        } else {
          if (this.ruleForm2.password !== "") {
            if (str.test(this.ruleForm2.password)) {
              this.$refs.ruleForm2.validateField("password");
            } else {
              callback(new Error("密码长度至少为6-16,且要包含数字和字母"));
            }
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入新密码"));
        } else {
          if (this.ruleForm2.pass !== "") {
            if (str.test(this.ruleForm2.pass)) {
              this.$refs.ruleForm2.validateField("pass");
            } else {
              callback(new Error("密码长度至少为6-16,且要包含数字和字母"));
            }
          }
          callback();
        }
      };
      var validatePass3 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入确认密码"));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        message: {
          1: {
            message: '密码修改成功',
            type: 'success'
          },
          2: {
            message: '密码修改失败',
            type: 'error'
          },
          3: {
            message: '参数为空',
            type: 'warning'
          },
          6: {
            message: '当前用户不存在',
            type: 'warning'
          },
          11: {
            message: '旧密码输入错误',
            type: 'warning'
          }
        },
        otherMessage: {
          message: "系统异常!",
          type: "error",
        },
        ruleForm2: {
          password: "",
          pass: "",
          checkPass: ""
        },
        rules2: {
          password: [{
              required: true,
              message: '请输入旧密码',
              trigger: 'blur'
            },
            {
              validator: validatePass1,
              trigger: "blur"
            },
          ],
          pass: [{
              required: true,
              message: '请输入新密码',
              trigger: 'blur'
            },
            {
              validator: validatePass2,
              trigger: "blur"
            },
          ],
          checkPass: [{
              required: true,
              message: '请输入确认新密码',
              trigger: 'blur'
            },
            {
              validator: validatePass3,
              trigger: "blur"
            }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            //密码修改
            let options = {
              id: JSON.parse(sessionStorage.user).id || '',
              oldPassword: this.ruleForm2.password,
              newPassword: this.ruleForm2.checkPass
            }
            this.$post
              ("user/updateUserPassword", options)
              .then(res => {
                if ('1'.includes(res.msg)) {
                  this.$alert('密码修改成功，需重新登录！', '密码修改', {
                    confirmButtonText: '确定',
                    showClose: false
                  }).then(() => {
                    this.$post('/shiro/logout').then(res => {
                      sessionStorage.clear()
                      this.$router.push({
                        name: 'Login'
                      })
                    })
                  })
                } else {
                  this.$message({
                    showClose: true,
                    ...(this.message[res.msg] || this.otherMessage)
                  })
                }
              })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };

</script>
<style lang="less" scoped>
  .demo-ruleForm{
    margin: 20px;
  }
  .mu-input {
    width: 100%;
  }

</style>
