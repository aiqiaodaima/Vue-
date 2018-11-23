<template>
  <div class="contain">
    <div class="doctor-div">
      <div class="title-div">个人信息</div>
      <van-cell-group>
        <van-cell title="头像" value="内容" />
        <van-cell title="姓名" value="张丽" />
        <van-cell title="性别" value="女" />
        <van-cell title="手机号码" value="17620057896" />
      </van-cell-group>
    </div>
    <div class="doctor-div">
      <div class="title-div">医院信息</div>
      <van-cell-group>
        <van-cell title="所属医院" value="广东省人民医院" />
        <van-cell title="所属科室" value="呼吸科" />
        <van-cell title="职称" value="主任" />
        <van-cell title="开通在线咨询">
          <el-switch v-model="value2" active-color="#13ce66" inactive-color="#f5f7fa"> </el-switch>
        </van-cell>
        <van-cell title="设置金额" v-show="value2">
          <el-input-number v-model="num3" :step="1" size="mini" :precision="2"></el-input-number>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="doctor-div">
      <div class="title-div">个人简介</div>
      <van-cell-group>
        <van-field v-model="message" type="textarea" placeholder="请填写您的个人学历、荣耀、工作履历邓相关信息。" rows="4" autosize />
      </van-cell-group>
    </div>
    <div class="doctor-div">
      <div class="title-div">擅长疾病</div>
      <van-cell-group>
        <van-field v-model="message" type="textarea" placeholder="例如：小儿支气管炎、支气管哮喘、反复呼吸道感染、小儿肠炎、营养不良等" rows="4" autosize />
      </van-cell-group>
    </div>
    <div class="btn-div">
      <el-button type="primary" size="medium" @click="register3" class="maxBtn">下一步</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: true,
      value2: true,
      options: ["男", "女"],
      num3: 5,
      labelPosition: "left",
      form: {
        input: "",
        select: "",
        date: "",
        radio: "",
        checkbox: [],
        switch: false,
        slider: 30,
        textarea: ""
      }
    };
  }
};
</script>
<style lang="less" scoped>
.title-div {
  // background: #666;
  font-size: 0.4rem;
  padding: 5px 10px;
}
.mu-demo-form {
  width: 100%;
  max-width: 460px;
}
.btn-div {
  padding: 0 0.5rem;
}
.maxBtn {
  margin: 1rem 0;
  width: 100%;
}
</style>

