<template>
  <div class="contain">
    <div class="wallet-div">
      <van-cell-group>
        <van-cell title="总金额" value="明细" is-link to="detail" />
        <div class="tipsword">
          <p></p>
          <p>我的余额</p>
          <p>￥10.00</p>
        </div>
      </van-cell-group>
    </div>
    <div class="btn-div">
      <el-button type="primary" size="medium" @click="kiting" class="maxBtn">提现</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    kiting() {
      this.$router.push({ path: "./kiting" });
    }
  }
};
</script>

<style lang="less" scoped>
.contain {
  width: 100vw;
  height: 100vh;
  .wallet-div {
    padding: 0.5rem;
    .van-cell__value {
      color: #199ed8;
    }
    .van-cell:not(:last-child)::after {
      border: none;
    }
    .van-hairline--top-bottom::after {
      border: none;
    }
    .tipsword {
      display: flex;
      // justify-content: center;
      align-items: center;
      flex-direction: column;
      font-size: 0.5rem;
      padding-bottom: 1rem;
    }
  }
  .btn-div {
    padding: 0 0.5rem;
    .maxBtn {
      margin-top: 1rem;
      width: 100%;
    }
  }
}
</style>

