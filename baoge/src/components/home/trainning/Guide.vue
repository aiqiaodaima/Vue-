<template>
  <div class="contain">
    <center>诊疗指南</center>
    <el-card class="box-card" v-for="item in tableData" :key="item.id">
      <div class="top">
        <span>{{item.cgName}} </span>
      </div>
      <div class="item">
        <span>{{item.docName}} </span>
         <span>{{$moment(item.createTime).format('YYYY-MM-DD')}} </span>
      </div>
      <div class="item">
        <el-button style="float: right; padding: 0 0 13px" type="text" @click="selectTrainingRecord(item.id)">查看详情</el-button>
      </div>
    </el-card>
    <!-- 底部 -->
    <div style="height:50px;"></div>
    <footer>
      <el-pagination align="center" small background @current-change="handleCurrentChange" :current-page.sync="currentPage"
      :page-size="pageSize" layout="total, prev, pager, next" :total="total" :pager-count=5>
    </el-pagination>

    </footer>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        isShow: true, // 判断要不要显示
        daterange: [],
        cgName: "",
        tableData: [],
        currentPage: 1,
        total: 0, //总页数
        pageSize: 10, //每页大小
        hospitalId: "",
        startTime: "",
        endTime: "",
      }
    },
    mounted(){
      this.selectTrainingRecordPage()
    },
    methods: {
      selectTrainingRecordPage() {
        this.$post
          ("cgs/selectGsPage", {
            hospitalId:this.hospitalId,
            pageNo: this.currentPage,
            pageSize: this.pageSize,
            startTime: this.startTime,
            endTime: this.endTime,
            cgName: this.cgName
          })
          .then(res => {
            if (res.customPage.rows) {
              this.tableData = res.customPage.rows.map(item => {
                item.uploadDate = this.$moment(item.uploadDate).format("YYYY-MM-DD");
                return item;
              });
              this.currentPage = res.customPage.page;
              this.pageSize = res.customPage.pagesize;
              this.total = res.customPage.records;
            }
          })
      },
       handleCurrentChange(val) {
        this.currentPage = val;
        this.selectTrainingRecordPage();
      },
      searchValue() {
        this.selectTrainingRecordPage();
      },
      selectTrainingRecord(e){
          sessionStorage.setItem('canPDF',true)
          this.$router.push({
            path: '/guideDetails',
            query: {id: e}
          })
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
    background-color: #eaeaea;
    position: fixed;
    bottom: 0;
    width: 90%; /*写给不支持calc()的浏览器*/
    width: -moz-calc(100% - (10px + 5px) * 2);
    width: -webkit-calc(100% - (10px + 5px) * 2);
    width: calc(100% - (10px + 5px) * 2);
  }
</style>
