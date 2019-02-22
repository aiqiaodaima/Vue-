<template>
  <el-card class="app_content">
    <div slot="header">
      <el-steps :active="activeStep" align-center>
        <el-step title="填写患者信息" icon="el-icon-edit"></el-step>
        <el-step title="上传检查资料" icon="el-icon-upload"></el-step>
        <el-step title="转诊申请表" icon="el-icon-edit"></el-step>
      </el-steps>
    </div>
    <div style="display:flex;justify-content:center;">
      <div style="width:950px;" v-show="activeStep==0">
        <el-form status-icon ref="ruleForm1" label-position="left" label-width="95px" :model="patientData" size="small"
          class="demo-form-inline" label-suffix="：" :rules="formRules1">
          <el-row>
            <el-col>
              <el-form-item label="姓名" prop="ptName">
                <el-input v-model="patientData.ptName"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="年龄" prop="ptAge">
                <el-input min="1" type="number" v-model.number="patientData.ptAge"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="性别" prop="ptSex">
                <el-select style="width:100%" v-model="patientData.ptSex">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="联系方式" prop="ptPhone">
                <el-input v-model.number="patientData.ptPhone"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="身份证" prop="ptCard">
                <el-input v-model="patientData.ptCard"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="双向转诊" prop="isDouble">
                <el-select style="width:100%" v-model="patientData.isDouble">
                  <el-option label="是" value="Y"></el-option>
                  <el-option label="否" value="N"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="医保类别" prop="protectType">
                <el-select style="width:100%" v-model="patientData.protectType">
                  <el-option label="省医保" value="1"></el-option>
                  <el-option label="市职工医保" value="2"></el-option>
                  <el-option label="市居民医保" value="3"></el-option>
                  <el-option label="新农合" value="4"></el-option>
                  <el-option label="自费" value="5"></el-option>
                  <el-option label="异地医保" value="6"></el-option>
                  <el-option label="其他" value="7"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="家庭住址" prop="ptCity">
                <el-input v-model="patientData.ptCity"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <el-form-item label="初步诊断" prop="initial">
                <el-input placeholder="限1500个字符" style="font-size:14px" :autosize="{minRows:2}" type="textarea" v-model="patientData.initial"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="病情摘要" prop="digest">
                <el-input placeholder="限1500个字符" style="font-size:14px" :autosize="{minRows:2}" type="textarea" v-model="patientData.digest"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <p class="tip_title">双向转诊医保优惠政策</p>
              <p class="tip_content">在长沙市职工医疗保险和城乡居民保险范围内的参保人员，对按项目付费后付制结算方式管理医疗费用的，建立双向转诊“一增一减一免”制度，试行逐步提高上转患者到上级医院住院医疗费用支付标准，减去在基层医疗机构住院的起付线，免除第二次住院28天时间的限制
                ;试行逐步提高下转患者住院医疗费用支付标准，减免在上级医院起付标准50%，免除第二次住院28天时间的限制。</p>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div v-show="activeStep==1" style="width:100%">
        <el-collapse v-model="activeName">
          <el-collapse-item v-for="item in typeList" :key="item.type" :title="item.name" :name="item.type">
            <img-upload @deleteImg="deleteSonImg($event)" @sendFatherImg="getSonImg($event)" @toFatherVue="getSonData($event)"
              :type="item.type" :filePath="'member/twoWayReferral'"></img-upload>
          </el-collapse-item>
        </el-collapse>
      </div>

      <div v-show="activeStep==2">
        <el-form status-icon ref="ruleForm2" :model="doctorData" :rules="formRules2" label-position="left" label-width="132px"
          size="small" label-suffix="：">
          <!-- <el-form-item label="申请医生科室" prop="chamber">
            <el-select @change="getDoctor" style="width:100%" v-model="doctorData.chamber">
              <el-option v-for="(item, index) in sectionList" :key="index" :label="item.seName" :value="item.seName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请医生姓名" prop="applyName">
            <el-select @change="getApplyDocId" style="width:100%" v-model="doctorData.applyName">
              <el-option v-for="(item, index) in doctorList" :key="index" :label="item.userName" :value="item.userName"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="转往医院" prop="planHospitalId">
            <!-- <el-input disabled v-model="doctorData.planHospitalId"></el-input> -->
            <el-select style="width:100%" v-model="doctorData.planHospitalId">
              <el-option label="长沙市第一医院" value="10001"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转往科室" prop="planChamber">
            <el-select style="width:100%" v-model="doctorData.planChamber">
              <el-option v-for="(item, index) in planSectionList" :key="index + ''" :label="item.seName" :value="item.seName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预约转诊日期" prop="planTime">
            <el-date-picker style="width:100%" value-format="yyyy-MM-dd" v-model="doctorData.planTime" type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="转诊缘由" prop="changeReason">
            <el-input v-model="doctorData.changeReason"></el-input>
          </el-form-item>
          <el-form-item label="初诊/复诊" prop="diagnose">
            <el-select style="width:100%" v-model="doctorData.diagnose">
              <el-option label="初诊" value="1"></el-option>
              <el-option label="复诊" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="急性/慢性" prop="illness">
            <el-select style="width:100%" v-model="doctorData.illness">
              <el-option label="急性" value="1"></el-option>
              <el-option label="慢性" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <br>
      </div>

    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-dialog :visible.sync="adVisible">
      <h3 slot="title">转诊申请成功！</h3>
      <img width="100%" src="http://imuts.oss-cn-shenzhen.aliyuncs.com/images/5c20fcc56bb16668de80cd16e456521.jpg" alt="">
    </el-dialog>
    <div style="text-align:center;margin-top:10px;">
      <el-button v-show="activeStep==0" @click="nextStepOne('ruleForm1')" size="small" style="width:3.5rem;" type="primary">下一步</el-button>

      <el-button v-show="activeStep==1" @click="activeStep=0" size="small" type="primary" style="width:3.5rem;">上一步</el-button>
      <el-button v-show="activeStep==1" @click="activeStep=2" size="small" style="width:3.5rem;" type="primary">下一步</el-button>

      <el-button v-show="activeStep==2" @click="activeStep=1" size="small" type="primary" style="width:3.5rem;">上一步</el-button>
      <el-button :disabled="isDisable" v-show="activeStep==2" @click="submitForm('ruleForm2')" size="small" style="width:3.5rem;"
        type="primary">提交</el-button>
    </div>
  </el-card>
</template>

<script>
  import ImgUpload from '../../public/ImgUpload'
  export default {
    components: {
      'img-upload': ImgUpload
    },
    data() {
      let checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请填写手机号码'));
        } else if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          let len = String(value).length
          if (len != 11) {
            callback(new Error('手机号码必须为11位'));
          } else {
            callback();
          }
        }
      };
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
        activeName: 1,
        dialogImageUrl: '',
        dialogVisible: false,
        adVisible: false, // 广告
        // 病历
        fileList: [],
        activeStep: 0,
        patientData: {},
        formRules1: {
          ptName: [{
              required: true,
              message: '请填写姓名',
              trigger: 'blur'
            },
            // { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          ptAge: [{
              required: true,
              message: '请填写年龄',
              trigger: 'blur'
            },
            {
              type: 'number',
              message: '年龄必须为数字值'
            },
          ],
          ptSex: [{
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }],
          ptPhone: [{
            validator: checkPhone,
            required: true,
            trigger: 'blur'
          }],
          ptCard: [{
              required: true,
              message: '请填写身份证号码',
              trigger: 'blur'
            },
            {
              validator: checkCard,
              message: '身份证号码无效',
              trigger: 'blur'
            }
          ],
          isDouble: [{
            required: true,
            message: '请选择是否双向转诊',
            trigger: 'change'
          }],
          protectType: [{
            required: true,
            message: '请选择医保类别',
            trigger: 'change'
          }],
          ptCity: [{
              required: true,
              message: '请填写家庭住址',
              trigger: 'blur'
            },
            {
              max: 50,
              message: '字数超出限制',
              trigger: 'change'
            }
          ],
          initial: [{
              required: true,
              message: '请填写第一诊断内容',
              trigger: 'blur'
            },
            {
              max: 1500,
              message: '字数超出限制',
              trigger: 'change'
            }
          ],
          digest: [{
              required: true,
              message: '请填写第二诊断内容',
              trigger: 'blur'
            },
            {
              max: 1500,
              message: '字数超出限制',
              trigger: 'change'
            }
          ]
        },
        doctorData: {},
        formRules2: {
          applyName: [{
            required: true,
            message: '请填写医生姓名',
            trigger: 'blur'
          }, ],
          chamber: [{
            required: true,
            message: '请选择申请医生科室',
            trigger: 'change'
          }],
          planHospitalId: [{
            required: true,
            message: '请选择转往医院',
            trigger: 'change'
          }],
          planChamber: [{
            required: true,
            message: '请选择转往科室',
            trigger: 'change'
          }],
          planTime: [{
            required: true,
            message: '请填写预约转诊日期',
            trigger: 'blur'
          }, ],
          changeReason: [{
            required: true,
            message: '请填写预约转诊缘由',
            trigger: 'blur'
          }, ],
          diagnose: [{
            required: true,
            message: '请选择初诊/复诊',
            trigger: 'change'
          }, ],
          illness: [{
            required: true,
            message: '请选择急性/慢性',
            trigger: 'change'
          }, ],
        },
        sectionList: [],
        planSectionList: [],
        doctorList: [],

        // 发送短信
        applyUserId: '',
        hospitalId: '',
        hospitalName: '',
        principalId: '379', //管理医院责任人

        typeList: [{
            type: 1,
            name: '病历资料上传'
          },
          {
            type: 2,
            name: '检查资料上传'
          },
          {
            type: 3,
            name: 'B超资料上传'
          },
          {
            type: 4,
            name: '病理资料上传'
          },
          {
            type: 5,
            name: 'DR资料上传'
          },
          {
            type: 6,
            name: '心电资料上传'
          },
          {
            type: 7,
            name: '扫描文件上传'
          },
          {
            type: 8,
            name: 'CT/MR资料上传'
          }
        ],

        isDisable: false, // 防止多次提交
      }
    },
    mounted() {
      let infor = JSON.parse(sessionStorage.getItem('user') || '{"infor":{}}')
      console.log(infor)
      this.hospitalId = infor.hospitalId
      this.hospitalName = infor.hospitalName
      // this.principalId = infor.principalId
      this.doctorData.chamber = infor.seName
      this.doctorData.applyName = infor.userName
      this.doctorData.applyJob = infor.job
      this.applyUserId = infor.id
      this.fetchSection()
    },
    watch: {
      adVisible(e) {
        if (e == false) {
          this.$router.push('/mbTransferOut')
        }
      }
    },
    methods: {
      // 获医院科室
      fetchSection() {
        // 本医院
        this.$post("section/selectSectionById?hospitalId=" + this.hospitalId)
          .then(res => {
            // console.log(res);
            this.sectionList = res.stList
          });
        // 管理医院
        this.$post("section/selectSectionById?hospitalId=10001")
          .then(res => {
            // console.log(res)
            this.planSectionList = res.stList
          })
      },
      getDoctor(e) {
        this.$post("user/selectUserBySeName?rid=7&hospitalId=" + this.hospitalId + "&seName=" + e)
          .then(res => {
            console.log(res)
            if (this.doctorData.applyName) {
              this.doctorData.applyName = ''
            }
            this.doctorList = res.data.userList
          })
      },
      // 下一步
      nextStepOne(formName) {
         this.activeStep = 1
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.activeStep = 1
          } else {
            // console.log('error submit!!');
            // this.activeStep = 1
            return false;
          }
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isDisable = true
            let acList = []
            let aciObj = {
              aciList: this.fileList
            }
            let hsta = {
              hospitalId: this.hospitalId,
              statu: 2,
              type: 'A',
              applyUserId: this.applyUserId
            }
            let obj = Object.assign({}, this.patientData, this.doctorData, aciObj, hsta)
            acList.push(obj)
            // alert('submit!');
            this.$post('case/insertCase', acList, {
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              }
            }).then(res => {
              console.log(res)
              if (res.msg === '1') {
                this.$router.push('mbTransferOut')
                // let option = {
                //   patientName: this.patientData.ptName,
                //   patientPhone: this.patientData.ptPhone,
                //   applyName: this.doctorData.applyName,
                //   hospitalName: this.hospitalName,
                //   principalId: this.principalId
                // }
                // this.$post('send/sendTransfer', option)
                //   .then(res => {
                //     console.log(res)
                //     this.adVisible = true
                //   })
              } else {
                this.isDisable = false
                this.$message.error('转诊申请失败！')
              }
            })
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      getSonData(e) {
        this.fileList.push({
          type: e.type,
          imgUrl: e.file
        });
        console.log(this.fileList)
      },
      getSonImg(e) {
        this.dialogImageUrl = e.dialogImageUrl
        this.dialogVisible = e.dialogVisible
      },
      deleteSonImg(e) {
        console.log(e)
        this.fileList = this.fileList.filter(val => {
          return val.imgUrl != e;
        })
        console.log(this.fileList)
      }
    }
  }

</script>

<style scoped>
  /deep/ .el-step__title {
    font-size: 0.42rem;
  }

  .tip_title {
    font-size: 0.45rem;
  }

  .tip_content {
    text-indent: 2em;
    letter-spacing: 1.5px;
    font-size: 0.3rem;
  }

</style>
