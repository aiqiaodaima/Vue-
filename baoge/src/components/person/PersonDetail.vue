<template>
  <div class="contain">
    <div class="doctor-div">
      <div class="title-div">个人信息</div>
      <van-cell-group>
        <!-- <van-cell title="头像" value="内容" /> -->
        <van-cell title="姓名" :value="user.userName" />
        <van-cell title="账号" :value="user.phone" />
        <van-cell title="手机号码" :value="user.contactPhone" />
      </van-cell-group>
    </div>
    <div class="doctor-div">
      <div class="title-div">医院信息</div>
      <van-cell-group>
        <van-cell title="所属医院" :value="user.hospitalName" />
        <van-cell title="所属科室" :value="user.seName" />
        <van-cell title="职称" :value="user.job" />
        <!-- <van-cell title="开通在线咨询">
          <el-switch v-model="value2" active-color="#13ce66" inactive-color="#f5f7fa"> </el-switch>
        </van-cell>
        <van-cell title="设置金额" v-show="value2">
          <el-input-number v-model="num3" :step="1" size="mini" :precision="2"></el-input-number>
        </van-cell> -->
      </van-cell-group>
    </div>
    <div class="doctor-div">
      <div class="title-div">个人简介</div>
      <van-cell-group>
        <van-field v-model="user.intro" type="textarea" placeholder="请填写您的个人学历、荣耀、工作履历邓相关信息。" rows="4" autosize />
      </van-cell-group>
    </div>
    <div class="doctor-div">
      <div class="title-div">擅长疾病</div>
      <van-cell-group>
        <van-field v-model="user.mainAttack" type="textarea" placeholder="例如：小儿支气管炎、支气管哮喘、反复呼吸道感染、小儿肠炎、营养不良等" rows="4" autosize />
      </van-cell-group>
    </div>
    <!-- <div class="btn-div">
      <el-button type="primary" size="medium" @click="register3" class="maxBtn">下一步</el-button>
    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      docId :JSON.parse(sessionStorage.user).id || '',
      user:{}

    };
  },
  mounted(){
    this.getMsg()
  },
  methods:{
    getMsg(){
      this.$post("/user/selectUserByUid",{uid:this.docId}).then(res => {
        this.user = res.user;
      });
    }
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
/deep/ textarea{
  text-indent: 2em !important;
}
.van-cell{
  justify-content: space-between;
}
// /deep/ .van-cell__value{
//   flex: auto !important;
// }
</style>

