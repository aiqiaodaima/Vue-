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
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="是否专家" required>
        <el-radio-group v-model="ruleForm.resource">
          <el-radio border label="专家"></el-radio>
          <el-radio border label="医生"></el-radio>
        </el-radio-group>
      </el-form-item>
      <city />
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import City from "@/components/base/city";

export default {
  data() {
    return {
      labelPosition: "left",
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
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
    }
  },
  components: {
    city: City
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
  }
}
</style>

