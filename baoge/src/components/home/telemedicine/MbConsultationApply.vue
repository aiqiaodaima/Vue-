<template>
  <el-card class="app_content">
    <div slot="header">
      <el-steps :active="activeStep"  align-center >
        <el-step title="填写患者信息" icon="el-icon-edit"></el-step>
        <el-step title="上传检查资料" icon="el-icon-upload"></el-step>
        <el-step title="远程会诊申请表" icon="el-icon-edit"></el-step>
      </el-steps>
    </div>
    <div style="display:flex;justify-content:center;">
      <div style="width:950px;" v-show="activeStep==0">
        <el-form status-icon ref="ruleForm1" label-position="left" label-width="95px" :model="patientData" size="small" class="demo-form-inline" label-suffix="：" :rules="formRules1">
          <el-row>
            <el-col>
              <el-form-item label="姓名" prop="patientName">
                <el-input v-model="patientData.patientName"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="年龄" prop="age">
                <el-input min="1" type="number" v-model.number="patientData.age"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="性别" prop="sex">
                <el-select style="width:100%" v-model="patientData.sex">
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
              <el-form-item label="家庭住址" prop="ptCity">
                 <el-input v-model="patientData.ptCity"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="过敏史" prop="allergy">
                <el-input placeholder="限1500个字符" style="font-size:14px" :autosize="{minRows:2}" type="textarea" v-model="patientData.allergy"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="现病史" prop="present">
                <el-input placeholder="限1500个字符" style="font-size:14px" :autosize="{minRows:2}" type="textarea" v-model="patientData.present"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="既往史" prop="past">
                <el-input placeholder="限1500个字符" style="font-size:14px" :autosize="{minRows:2}" type="textarea" v-model="patientData.past"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="检查" prop="examine">
                <el-input placeholder="限1500个字符" style="font-size:14px" :autosize="{minRows:2}" type="textarea" v-model="patientData.examine"></el-input>
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
        </el-form>
      </div>

       <div style="width:100%;" v-show="activeStep==1">
        <el-collapse v-model="activeName">
          <el-collapse-item v-for="item in typeList" :key="item.type" :title="item.name" :name="item.type">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-collapse-item>
        </el-collapse>
      </div>

      <div style="width:400px;" v-show="activeStep==2">
        <center><h2>远程会诊申请表</h2></center>
        <br>
        <el-form status-icon ref="ruleForm2" :model="doctorData" :rules="formRules2" label-position="left" label-width="132px" size="small" label-suffix="：">
          <el-form-item label="申请医生科室" prop="section">
            <el-select @change="getDoctor" style="width:100%" v-model="doctorData.section">
              <el-option v-for="(item, index) in sectionList" :key="index" :label="item.seName" :value="item.seName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请医生姓名" prop="doctorItem">
            <el-select style="width:100%" v-model="doctorData.doctorItem">
              <el-option v-for="(item, index) in doctorList" :key="index" :label="item.userName" :value="JSON.stringify(item)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会诊模式" prop="diagnosisType">
            <el-select style="width:100%" v-model="doctorData.diagnosisType">
              <el-option label="离线会诊" value="LX"></el-option>
              <!-- <el-option label="视频会诊" value="SP"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="会诊类型" prop="groupType">
            <el-select style="width:100%" v-model="doctorData.groupType">
              <el-option label="普通会诊" value="1"></el-option>
              <el-option label="紧急会诊" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会诊时间" prop="groupDate">
            <el-date-picker
              style="width:100%"
              v-model="doctorData.groupDate"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="会诊医院" prop="groupHospitalId">
            <!-- <el-input disabled v-model="doctorData.groupHospitalId"></el-input> -->
            <el-select @change="fetchSection(doctorData.groupHospitalId)" style="width:100%" v-model="doctorData.groupHospitalId">
              <el-option label="长沙市第一医院" value="10001"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会诊科室" prop="chamber">
            <el-select style="width:100%" v-model="doctorData.chamber">
              <el-option v-for="(item, index) in planSectionList" :key="index + ''" :label="item.seName" :value="item.seName"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <br>
      </div>

    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <div style="text-align:center;margin-top:10px;">
      <el-button v-show="activeStep==0" @click="nextStepOne('ruleForm1')" size="small" style="width:132px;" type="primary">下一步</el-button>

      <el-button v-show="activeStep==1" @click="activeStep=0" size="small" type="primary" style="width:132px;">上一步</el-button>
      <el-button v-show="activeStep==1" @click="activeStep=2" size="small" style="width:132px;" type="primary">下一步</el-button>

      <el-button v-show="activeStep==2" @click="activeStep=1" size="small" type="primary" style="width:132px;">上一步</el-button>
      <el-button v-show="activeStep==2" @click="submitForm('ruleForm2')" size="small" style="width:132px;" type="primary">提交</el-button>
    </div>
  </el-card>
</template>

<script>
  export default {
    data() {
      let checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请填写手机号码'));
        }else if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        }else {
          let len = String(value) .length
          if (len != 11) {
            callback(new Error('手机号码必须为11位'));
          } else {
            callback();
          }
        }
      }
      let checkCard = (rule, value, callback) => {
        let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/g
        if (reg.test(value)) {
          callback()
        } else {
          callback(new Error(rule.message))
        }
      }
      return {
        categoryHospitalId:'',
        activeName: 1,
        dialogImageUrl: '',
        dialogVisible: false,
        // 病历
        fileList: [],
        activeStep: 0,
        patientData: {},
        formRules1: {
          patientName: [
            { required: true, message: '请填写姓名', trigger: 'blur' }
          ],
          age: [
            { required: true, message: '请填写年龄', trigger: 'blur' },
            { type: 'number', message: '年龄必须为数字值' },
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          ptPhone: [
            { validator: checkPhone, required:true, trigger: 'blur'}
          ],
          ptCard: [
            { required: true, message: '请填写身份证号码', trigger: 'blur' },
            { validator: checkCard, message:'身份证号码无效', trigger: 'blur'}
          ],
          ptCity: [
            { required: true, message: '请填写家庭住址', trigger: 'blur' }
          ],
          allergy: [
            { required: true, message: '请填写患者过敏史', trigger: 'blur' },
            {max:1500, message:'字数超出限制', trigger: 'change'}
          ],
          present:[
            { required: true, message: '请填写患者现病史', trigger: 'blur' },
            {max:1500, message:'字数超出限制', trigger: 'change'}
          ],
          past:[
            { required: true, message: '请填写患者既往史', trigger: 'blur' },
            {max:1500, message:'字数超出限制', trigger: 'change'}
          ],
          examine:[
            { required: true, message: '请填写患者检查内容', trigger: 'blur' },
            {max:1500, message:'字数超出限制', trigger: 'change'}
          ],
          initial: [
            { required: true, message: '请填写患者初步诊断', trigger: 'blur' },
            {max:1500, message:'字数超出限制', trigger: 'change'}
          ]
        },
        doctorData:{},
        sectionList:[],
        doctorList:[],
        formRules2:{
          section:[
            { required: true, message: '请选择申请医生科室', trigger: 'change' },
          ],
          doctorItem:[
            { required: true, message: '请选择申请医生姓名', trigger: 'change' },
          ],
          diagnosisType:[
            { required: true, message: '请选择会诊模式', trigger: 'change' },
          ],
          groupType: [
            { required: true, message: '请选择会诊类型', trigger: 'change' },
          ],
          groupDate: [
            { required: true, message: '请填写会诊日期时间', trigger: 'blur' },
          ],
          groupHospitalId: [
            { required: true, message: '请选择会诊医院', trigger: 'change' }
          ],
          chamber:[
            { required: true, message: '请选择会诊科室', trigger: 'change' }
          ],
        },
        docId:'',
        doctorName:'',
        // applyUserPhone:'',// 申请人手机号码，用来发送短信
        planSectionList:[],
        hospitalName:'',

        typeList:[
          {type:1,name:'病历资料上传'},
          {type:2,name:'检查资料上传'},
          {type:3,name:'B超资料上传'},
          {type:4,name:'病理资料上传'},
          {type:5,name:'DR资料上传'},
          {type:6,name:'心电资料上传'},
          {type:7,name:'扫描文件上传'},
          {type:8,name:'CT/MR资料上传'}
        ]
      }
    },
    mounted(){
      // let user = JSON.parse(sessionStorage.getItem('accountInfo')).user
      this.categoryHospitalId =  sessionStorage.id
      this.hospitalName = sessionStorage.hospitalName
      this.fetchMySection()
      // this.doctorName = user.userName
      // this.docId = user.id
      // this.applyUserPhone = user.contactPhone
      // this.fetchSection()
    },
    methods:{
      // 获取本医院科室
      fetchMySection(){
        this.$axios
        .post("section/selectSectionById?hospitalId=" + this.categoryHospitalId)
        .then(res => {
          // console.log(res);
          this.sectionList =  res.data.stList
        });
      },
      // 获取本医院医生
      getDoctor(e){
        this.$axios
        .post("user/selectUserBySeName?rid=7&hospitalId="+ this.categoryHospitalId +"&seName="+ e)
        .then(res=>{
          // console.log(res)
          if(this.doctorData.doctorItem){
            this.doctorData.doctorItem = ''
          }
          this.doctorList = res.data.userList
        })
      },
      // 获管理医院科室
      fetchSection(e){
        this.$axios
        .post("section/selectSectionById?hospitalId="+e)
        .then(res=>{
          // console.log(res)
          this.planSectionList = res.data.stList
        })
      },
      // 下一步
      nextStepOne(formName){

        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.activeStep = 1
          } else {
            // console.log('error submit!!');
            this.activeStep = 1
            return false;
          }
        });
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let acList = []
            let aciObj = {aciList:this.fileList}
            let doctorItem = JSON.parse(this.doctorData.doctorItem)
            let others = {
              categoryHospitalId: this.categoryHospitalId,
              status: 20,
              docId: doctorItem.id,
              doctorName: doctorItem.userName
            }
            delete this.doctorData.doctorItem
            delete this.doctorData.section
            let obj = Object.assign({}, this.patientData, this.doctorData, aciObj, others)
            acList.push(obj)
            // alert('submit!');
            // console.log(acList);
            // return false;
            this.$axios.post('con/insertConsultation',acList,{
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              }
            }).then(res=>{
              // console.log(res)
              if(res.data.msg === '1'){
                this.$message({
                  message: '会诊申请成功',
                  type: 'success'
                })
                if(this.doctorData.diagnosisType=='LX') {
                  this.$router.push('/mbRemoteReading')
                }else{
                  this.$router.push('/mbVideoConsultation')
                }

                let option = {
                  hospitalName: this.hospitalName,
                  patientName: this.patientData.patientName,
                  hospitalId: this.categoryHospitalId
                }
                this.$axios.post('send/sendTransferSub',option)
                    .then(res=>{
                      console.log(res);
                    })
              }
              else{
                this.$message.error('会诊申请失败！')
              }
            })
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },

      // 图片上传
      getSonData(e){
        this.fileList.push({type: e.type, imgUrl: e.file});
        // console.log(this.fileList)
      },
      getSonImg(e){
        this.dialogImageUrl = e.dialogImageUrl
        this.dialogVisible = e.dialogVisible
      },
      deleteSonImg(e){
        console.log(e)
        this.fileList = this.fileList.filter(val=>{
          return val.imgUrl != e;
        })
        console.log(this.fileList)
      }
    }
  }
</script>

<style scoped>
</style>
