<template>
  <div class="contain">
    <center>转入列表</center>
    <el-card class="box-card" v-for="i in 5" :key="i">
      <div class="top">
        <span>皮银珍 </span>
        <span>主任医师</span>
        <span>内分泌科</span>
      </div>
      <div class="item">
        <span>联系方式：15918727869 </span>
      </div>
      <div class="item">
        <span>接诊医院：长沙市第一医院 </span>
        <span>呼吸科</span>
      </div>
      <div class="item">
         <el-button style="float: right; padding: 13px 5px" type="text">查看详情</el-button>
      </div>
    </el-card>
    <!-- 底部 -->
    <div style="height:50px;"></div>
    <footer>
      <el-pagination background layout="prev, pager, next" :total="100" page-size=5 pager-count = 5 class="page"></el-pagination>

    </footer>
  </div>

</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      detail() {

      }
    },
  }

</script>

<style lang="less" scoped>
  .contain {
    padding: 10px 15px;
    .box-card{
      margin-bottom: 10px;
    }
    .top {
      span {
        font-size: 14px;
        margin-right: 6px;
      }
    }

    .item {
      margin-top: 5px;
      font-size: 14px;

      span {
        margin-right: 20px;
      }
    }
  }

  center {
    font-size: 16px;
    margin-bottom: 10px;
    color: #000;
  }
  footer{
    position: fixed;
    bottom: 10px;
    width: 100%;
    .page{
      margin: 0 auto;
    }
  }
</style>
