<template>
  <div class="content">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    <div>
      <p class="headerp">医生列表 </p>
      <van-row type="flex">
        <van-col span="6">
          <van-icon name="records" />
          <span>审核列表</span>
        </van-col>
        <van-col span="6">
          <van-icon name="records" />
          <span>医生列表</span>
        </van-col>
        <van-col span="6">
          <van-icon name="records" />
          <span>黑名单</span>
        </van-col>
      </van-row>
    </div>
    <div>
      <p class="headerp">双向转诊 </p>
      <van-row type="flex">
        <van-col span="6">
          <van-icon name="records" />
          <span>转诊申请</span>
        </van-col>
        <van-col span="6">
          <van-icon name="records" />
          <span>转出列表</span>
        </van-col>
        <van-col span="6">
          <van-icon name="records" />
          <span>转入列表</span>
        </van-col>
        <van-col span="6">
          <van-icon name="records" />
          <span>统计分析</span>
        </van-col>
      </van-row>
    </div>
    <div>
      <p class="headerp">远程会诊 </p>
      <van-row type="flex">
        <van-col span="6">
          <van-icon name="records" />
          <span>会诊申请</span>
        </van-col>
        <van-col span="6">
          <van-icon name="records" />
          <span>会诊列表</span>
        </van-col>
        <van-col span="6">
          <van-icon name="records" />
          <span>统计分析</span>
        </van-col>
      </van-row>
    </div>
    <div style="height:56px;"></div>
    <mu-container>
      <mu-bottom-nav>
        <mu-bottom-nav-item title="管理中心" icon="home" to="/home"></mu-bottom-nav-item>
        <mu-bottom-nav-item title="咨询" icon="favorite"></mu-bottom-nav-item>
        <mu-bottom-nav-item title="个人中心" icon="person" to="/person"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </mu-container>
  </div>
</template>
<script>
import Vue from "vue";
import { Lazyload } from "vant";

// options 为可选参数，无则不传
Vue.use(Lazyload);
export default {
  data() {
    return {
      shift: "movies",
      images: [
        "https://x.yraise.com/images/banner01.jpg",
        "https://x.yraise.com/images/banner02.jpg",
        "https://x.yraise.com/images/banner03.jpg"
      ]
    };
  }
};
</script>
<style lang="less" scoped>
img {
  width: 100%;
  height: 200px;
  display: block;
  // padding: 30px 60px;
  box-sizing: border-box;
  background-color: #fff;
  pointer-events: none;
}
.mu-bottom-nav-shift {
  background-color: #409eff;
}
.container {
  padding: 0;
  position: fixed;
  bottom: 0;
}
.van-col {
  text-align: center;
  height: 100px;
  float: none;
  display: inline-block;
  vertical-align: middle;
}

.van-icon {
  display: block;
  font-size: 32px;
  margin: 15px 0;
  color: rgba(69, 90, 100, 0.8);
}
.headerp {
  background: #eaeaea;
  padding: 5px 10px;
  border-left: 2px solid #409eff;
}
span {
  font-size: 14px;
}
</style>


