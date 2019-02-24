<template>
  <div class="bg-content">
    <p class="content-header">请填写您的真实信息用于医生认证，我们将严格保密</p>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" size="mini">
      <p class="form-header">身份证信息</p>
      <el-form-item label="身份证" prop="card">
        <el-input v-model="ruleForm.card"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="cardFrontImg">
            <el-upload class="avatar-uploader" action="" list-type="picture-card" :show-file-list="false" :on-success="(res, file, fileList) => {handleAvatarSuccess(res, file, fileList, 'cardFrontImg')}"
              :on-change="changeUpload" :data="{filePath: 'doctorImg'}" :http-request="ossPost">
              <img v-if="ruleForm.cardFrontImg" :src="$oss + ruleForm.cardFrontImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon specialI"><br /><br />身份证正面照片</i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="cardVersoImg">
            <el-upload class="avatar-uploader" action="" list-type="picture-card" :show-file-list="false" :on-success="(res, file, fileList) => {handleAvatarSuccess(res, file, fileList, 'cardVersoImg')}"
               :on-change="changeUpload" :data="{filePath: 'doctorImg'}"
              :http-request="ossPost">
              <img v-if="ruleForm.cardVersoImg" :src="$oss + ruleForm.cardVersoImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon specialI"><br /><br />身份证反面照片</i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-row>
      <p class="form-header">医师执业证书</p>
      <el-form-item prop="licensedImg">
      <el-upload class="avatar-uploader" action="" list-type="picture-card" :show-file-list="false" :on-success="(res, file, fileList) => {handleAvatarSuccess(res, file, fileList, 'licensedImg')}"
        :on-change="changeUpload" :data="{filePath: 'doctorImg'}" :http-request="ossPost">
        <img v-if="ruleForm.licensedImg" :src="$oss + ruleForm.licensedImg" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>

      <!-- </el-form-item> -->
      </el-form-item>

      <el-button type="primary" size="medium" class="maxBtn"  @click="submitForm('ruleForm')">下一步</el-button>
      </el-form-item>
      <!-- <el-button type="primary" size="medium" class="maxBtn">下一步</el-button> -->
    </el-form>

  </div>
</template>

<script>
  import OssApi from '../../oss'
  export default {

    data() {
      let checkCard = (rule, value, callback) => {
        let reg =
          /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/g
        if (reg.test(value)) {
          callback()
        } else {
          callback(new Error(rule.message))
        }
      }
      return {
        $ossHostName: "https://imuts.oss-cn-shenzhen.aliyuncs.com/demoimages/hunan",
        // $OssApi :OssApi,
        dialogImageUrl: "",
        dialogVisible: false,
        ruleForm: {
          rid: 6,
          card: '',
          cardFrontImg: '',
          cardVersoImg: '',
          licensedImg: '',
        },
        rules: {
          card: [{
              required: true,
              message: '请输入身份证号码',
              trigger: 'blur'
            },
            {
              validator: checkCard,
              message: '身份证号码格式不正确',
              trigger: 'blur'
            },
            {
              max: 20,
              message: '身份证号码不能超过20个字符',
              trigger: ['change', 'blur']
            }
          ],
          cardFrontImg: [{
            required: true,
            message: '请上传身份证正面照',
            trigger: 'blur'
          }],
          cardVersoImg: [{
            required: true,
            message: '请上传身份证反面照',
            trigger: 'blur'
          }],
          licensedImg: [{
            required: true,
            message: '请上传医师执证',
            trigger: 'blur'
          }]
        }
      };
    },
    methods: {
      onRead(file) {
        console.log(file);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      ossPost(file) {
        OssApi.uploadRequest(file)
      },
      handleAvatarSuccess(res, file, fileList, filename) {
        this.ruleForm[filename] = res.name
        this.$refs.ruleForm.validateField(filename)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 20
        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 20MB!')
        }
        return (isJPG || isPNG) && isLt2M
      },
      changeUpload(file, fileList) {
        if (file.status === 'success' && fileList.length >= 2) {
          let filename = fileList[0].response.name
          if (filename) {
            this.$ossApi.deleteFile(filename)
            fileList.shift()
          }
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.ruleForm =  Object.assign({}, this.ruleForm, JSON.parse(sessionStorage.sing1),JSON.parse(sessionStorage.sing2));
             this.$post('/register/registerUser',this.ruleForm).then(res => {
               if (res.msg === '1') {
                this.$router.push('/')
              } else {
                this.$message.error('提交失败')

              }
             })
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },
    mounted() {
      // console.log(JSON.parse(sessionStorage.sing1) )
    }
  };

</script>
<style lang="less" scoped>
  .el-upload-list--picture-card .el-upload-list__item {
    width: 120px !important;
    height: 120px;
  }

  img {
    width: 100%;
    height: 100%;
  }

  .specialI {
    font-size: 14px;
    transform: translateY(22px);
  }

  .bg-content {
    background: #f4f6f8;
    overflow: auto;

    .el-upload-list--picture-card .el-upload-list__item {
      width: 40vw;
      height: 40vw;
    }

    .el-upload-list__item .is-success {
      width: 40vw;
      height: 40vw;
    }

    .content-header {
      font-size: 12px;
      text-align: center;
      line-height: 20px;
    }

    .demo-ruleForm {
      background: #fff;
      padding: 0.2rem 0.5rem;

      // border: 1px solid #eaeaea;
      .form-header {
        border-left: 2px solid rgb(25, 158, 216);
        padding: 0 8px;
        font-size: 14px;
      }

      .el-form-item {
        padding-bottom: 10px;
        // border-bottom: 1px solid #eaeaea;
      }

      .el-select {
        display: block;
      }

      .maxBtn {
        margin-top: 1rem;
        width: 100%;
      }
    }

  }

</style>
