<template>
  <div class="bg-content">
    <p class="content-header">请填写您的真实信息用于医生认证，我们将严格保密</p>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" size="mini" class="demo-ruleForm" :label-position="labelPosition">
      <p class="form-header">基本信息</p>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期" required>
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="城市" required>
        <el-input v-model="ruleForm.city" placeholder="选择所在城市" @focus="chooseCity"></el-input>
      </el-form-item>
      <p class="form-header">执业信息</p>
      <el-form-item label="医院名称" prop="hospital">
        <el-input v-model="ruleForm.hospital"></el-input>
      </el-form-item>
      <el-form-item label="科室名称" prop="subject">
        <el-input v-model="ruleForm.subject"></el-input>
      </el-form-item>

      <el-form-item label="临床职称" prop="job">
        <el-select v-model="ruleForm.job" placeholder="请选择证件类型">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否专家" required>
        <el-radio-group v-model="ruleForm.specail">
          <el-radio border label="专家"></el-radio>
          <el-radio border label="医生"></el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 证件信息 -->
      <p class="form-header">证件信息</p>
      <el-form-item label="证件类型" prop="cardtype">
        <el-select v-model="ruleForm.cardtype" placeholder="请选择证件类型">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码" prop="cardnum">
        <el-input v-model="ruleForm.cardnum"></el-input>
      </el-form-item>

      <el-button type="primary" size="medium" @click="register3" class="maxBtn">下一步</el-button>
      <el-form-item>
        <!-- <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button> -->

      </el-form-item>
    </el-form>
    <van-popup v-model="show" position="bottom">
      <city2 @showChange="updataShow($event)" @city="updataCity($event)" />
    </van-popup>

  </div>
</template>
<script>
import Vue from "vue";
import { AddressEdit } from "vant";
import { Area } from "vant";
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
      ruleForm: {
        name: "",
        region: "",
        date: "",
        city: "",
        cardtype: "",
        cardnum: "",
        hospital: "",
        subject: "",
        job: "",
        specail: "",
        delivery: false,
        type: [],
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
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
    updataCity(city) {
      console.log(city);
      this.ruleForm.city = city;
    },
    chooseCity() {
      this.show = !this.show;
    },
    register3() {
      this.$router.push({ path: "/register3" });
    }
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

