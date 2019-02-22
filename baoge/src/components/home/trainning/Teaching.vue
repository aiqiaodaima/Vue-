<template>
  <div class="contain">
    <center>教学培训</center>
    <el-card class="box-card" v-for="item in tableData" :key="item.id" style="margin-bottom:10px;">
      <div class="top">
        <span style="font-size:16px;">{{item.title}}</span>

      </div>
      <div class="item">
        <span>{{item.speaker}} </span>
        <span>{{item.job}}</span>
        <span>{{item.job}}</span>
      </div>
      <div class="item">
        <el-button style="float: right; padding: 0 10px 13px" type="text" @click="selectTraining(item.id)">查看详情</el-button>
      </div>
    </el-card>
    <div style="height:60px;"></div>
    <footer>
    <el-pagination small align="center" background @current-change="handleCurrentChange" :pager-count=5 :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
    </el-pagination>

    </footer>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        docName: "",
        docName2: "",
        ktName: "",
        ktName2: "",
        tableData: [],
        currentPage: 1,
        total: 0, //总页数
        pageSize: 5, //每页大小
        type: 1,
        currentVal:'教学培训',
        changshaName:'',
        hospitalId:""
      }
    },
    mounted() {
    this.hospitalId = JSON.parse(sessionStorage.getItem('user')).hospitalId;
    this.$post
      ("infor/selectInforName?")
      .then(res=>{
       this.changshaName = res.applyInformation.hospitalName
    })
    this.selectTrainingPageByType();
  },
  methods: {
    selectTrainingPageByType() {
      this.$post
        (
          "training/selectTrainingPageByType?pageSize=" +
            this.pageSize +
            "&pageNo=" +
            this.currentPage +
            "&type=" +
            this.type +
            "&title=" +
            this.ktName2 +
            "&speaker=" +
            this.docName2+
            "&hospitalId="+this.hospitalId
        )
        .then(res => {
          console.log(res)
          this.tableData=res.customPage.rows.map(item=>{
            item.createTime = this.$moment(item.createTime).format('YYYY-MM-DD')
            if(item.type===1){
              item.type="教学培训";
            }else if(item.type===2){
              item.type="健康讲座";
            }
            return item
          });
          this.currentPage = res.customPage.page;
          this.pageSize = res.customPage.pagesize;
          this.total = res.customPage.records;
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.selectTrainingPageByType();
    },
    giveValue(){
      this.ktName2 = this.ktName;
      this.docName2 = this.docName;
      this.selectTrainingPageByType();

    },
    //查看
    selectTraining(id){
       this.$router.push({
        path:'/MbRemoteTraningDetails',
        query:{id}
      })
    }
  }
};
</script>

<style lang="less" scoped>
  .contain {
    padding: 1em 1.5em;
    overflow: hidden;
    position: relative;
    min-height: 660px;
    center {
      font-size: 16px;
      margin-bottom: 10px;
      color: #000;
    }
    .item{
      margin-top: 10px;
      font-size: 14px;
      span{
        margin-right: 20px;
      }
    }
    footer{
      background-color: #eaeaea;
      position: fixed;
      bottom: 0;
      width: 90%; /*写给不支持calc()的浏览器*/
      width: -moz-calc(100% - (10px + 5px) * 2);
      width: -webkit-calc(100% - (10px + 5px) * 2);
      width: calc(100% - (10px + 5px) * 2);
    }
  }

</style>
