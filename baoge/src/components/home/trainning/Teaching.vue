<template>
  <div class="contain">
    <el-card class="box-card">
      <div class="top">
        <span style="font-size:16px;">中国2型糖尿病防治指南（二）</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="detail">查看详情</el-button>
      </div>
      <div class="item">
        <span>皮银珍 </span>
        <span>主任医师</span>
        <span>内分泌科</span>
      </div>
    </el-card>
  </div>
</template>
<script>
  export default {
    data(){
      return{

      }
    },
    methods:{
      detail(){
        this.$router.push("/MbRemoteTraningDetails")
      }
    }
  }

</script>
<style lang="less" scoped>
  .contain {
    padding: 1em 1.5em;
    .item{
      margin-top: 10px;
      font-size: 14px;
      span{
        margin-right: 20px;
      }
    }
  }

</style>
