<template>
  <div>
    <mu-container style="padding: 16px;border-bottom:2px solid #eaeaea;">
      <mu-row class="photo-div">
        <mu-avatar >
          <img :src="$oss+user.photo">
        </mu-avatar>
        <div class="doctor-div">
          <p><span>{{user.userName}}</span></p>
          <p><span style="margin-right:5px;">{{user.job}}</span><span>{{user.seName}}</span></p>
          <p><span>{{user.hospitalName}}</span></p>
        </div>
      </mu-row>
    </mu-container>
    <div>
      <van-cell title="个人信息" is-link icon="location" to="personDetail" />
    <!--   <van-cell title="邀请医生" is-link value="" icon="location" to="invite" />
      <van-cell title="我的钱包" is-link value="" icon="location" to="wallet" /> -->
      <van-cell title="修改密码" is-link value="" icon="location" to="changePassWord" />

    </div>
    <div style="height:56px;"></div>
    <mu-container style="max-width: 400px; width:100%;" class="footer-div">
      <mu-bottom-nav :value.sync="shift">
        <mu-bottom-nav-item value="home" title="管理中心" icon="home" to="/home"></mu-bottom-nav-item>
        <!-- <mu-bottom-nav-item value="favorite" title="咨询" icon="favorite"></mu-bottom-nav-item> -->
        <mu-bottom-nav-item value="person" title="个人中心" icon="person" to="/person"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </mu-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shift: "person",
      // size: 80,
      user:{}
    };
  },
  created(){
    this.user = JSON.parse(sessionStorage.user);
  }
};
</script>
<style lang="less" scoped>
.photo-div {
  // width: 8rem;
  margin: 20px auto;
  align-items: center;
  // border: 1px solid #fff;
}
.doctor-div {
  margin-left: 20px;
  font-size: 0.3rem;
}
.mu-bottom-nav-shift {
  background-color: #409eff;
}
.footer-div {
  padding: 0;
  position: fixed;
  bottom: 0;
}
.mu-avatar{
  width: 2rem !important;
  height: 2rem !important;
  margin-top: 0.36rem;
}
</style>


