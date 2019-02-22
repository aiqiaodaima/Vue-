<template>
  <div class="bg-content">
    <p class="content-header">请填写您的真实信息用于医生认证，我们将严格保密</p>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" size="mini" class="demo-ruleForm"
      :label-position="labelPosition">
      <p class="form-header">基本信息</p>
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="ruleForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="地区" required prop="province">
        <el-input v-model="ruleForm.province" placeholder="选择所在城市" @focus="chooseCity"></el-input>
      </el-form-item>
      <p class="form-header">执业信息</p>
      <el-form-item label="医院名称" prop="hospitalId">
        <el-select v-model="ruleForm.hospitalId" placeholder="请选择医院" @change="changeHospital">
          <el-option v-for="(item, index) in hospitalList" :key="index" :label="item.hospitalName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="科室名称" prop="seName">
        <el-select v-model="ruleForm.seName" placeholder="请选择科室">
          <el-option v-for="(item, index) in seNameList" :key="index" :label="item.seName" :value="item.seName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="临床职称" prop="job">
        <el-select v-model="ruleForm.job" placeholder="请选择证件类型">
          <el-option label="护士" value="护士"></el-option>
          <el-option label="护师" value="护师"></el-option>
          <el-option label="主管护师" value="主管护师"></el-option>
          <el-option label="副主任护师" value="副主任护师"></el-option>
          <el-option label="主任护师" value="主任护师"></el-option>
          <el-option label="医师" value="医师"></el-option>
          <el-option label="主治医师" value="主治医师"></el-option>
          <el-option label="副主任医师" value="副主任医师"></el-option>
          <el-option label="主任医师" value="主任医师"></el-option>
          <el-option label="技师" value="技师"></el-option>
          <el-option label="主管技师" value="主管技师"></el-option>
          <el-option label="副主任技师" value="副主任技师"></el-option>
          <el-option label="主任技师" value="主任技师"></el-option>
          <el-option label="药剂师" value="药剂师"></el-option>
          <el-option label="副主任药师" value="副主任药师"></el-option>
          <el-option label="主任药师" value="主任药师"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" size="medium" @click="submitForm('ruleForm')" class="maxBtn">下一步</el-button>
      <el-form-item>
      </el-form-item>
    </el-form>
    <van-popup v-model="show" position="bottom">
      <city2 @showChange="updataShow($event)" @city="updataCity($event)" />
    </van-popup>
  </div>
</template>
<script>
  import Vue from "vue";
  import {
    AddressEdit
  } from "vant";
  import {
    Area
  } from "vant";
  import City2 from "@/components/login/city";
  Vue.use(Area);
  Vue.use(AddressEdit);
  export default {
    data() {
      return {
        labelPosition: "left",
        areaList: "",
        show: false,
        searchResult: [],
        hospitalList: [],
        seNameList: [],
        ruleForm: {
          userName: "",
          province: "",
          hospitalId: "",
          seName: "",
          job: ""
        },
        rules: {
          userName: [{
              required: true,
              message: '请输入姓名',
              trigger: 'blur'
            },
            {
              max: 80,
              message: '姓名不能超过80个字符',
              trigger: ['change', 'blur']
            }
          ],
          hospitalId: [{
            required: true,
            message: '请选择医院',
            trigger: 'change'
          }],
          seName: [{
            required: true,
            message: '请选择科室',
            trigger: 'change'
          }],
          job: [{
            required: true,
            message: '请选择职称',
            trigger: 'change'
          }],
          province: [{
            required: true,
            message: '请选择地区',
            trigger: 'change'
          }]
        }
      };
    },
    mounted() {
      this.$post('/infor/findAifmGroup').then(res => {
        this.hospitalList = res.list
      })
    },
    methods: {
      changeHospital() {
        let hospitalId = this.ruleForm.hospitalId
        this.$post('/section/selectSectionById', {
          hospitalId
        }).then(res => {
          this.seNameList = res.stList
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            sessionStorage.sing2 = JSON.stringify(this.ruleForm);
            this.$router.push({
              path: "/register3"
            });

          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      updataShow(show) {
        console.log(show);
        this.show = show;
      },
      updataCity(province) {
        console.log(province);
        this.ruleForm.province = province;
      },
      chooseCity() {
        this.show = !this.show;
      },
    },
    components: {
      city2: City2
    }
  };

</script>
<style lang="less" scoped>
  .bg-content {
    background: #f4f6f8;
    overflow: auto;

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
