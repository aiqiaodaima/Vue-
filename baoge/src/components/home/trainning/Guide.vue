<template>
  <div class="contain">
    <center>转出列表</center>
    <el-card class="box-card" v-for="i in 5" :key="i">
      <div class="top">
        <span>皮银珍 </span>
        <span>主任医师</span>
        <span>内分泌科</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="detail">查看详情</el-button>
      </div>
      <div class="item">
        <span>联系方式：15918727869 </span>
      </div>
      <div class="item">
        <span>接诊医院：长沙市第一医院 </span>
        <span>呼吸科</span>
      </div>
    </el-card>
    <!-- 底部 -->
    <div style="height:50px;"></div>
    <footer>
      <el-pagination align="right" background @current-change="handleCurrentChange" :current-page.sync="currentPage"
      :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
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
    methods: {
      detail() {

      },
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
          this.$router.push({
            path: '/mbOtherTeamsDetails',
            query: {id: e.id}
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
    position: fixed;
    bottom: 10px;
    width: 100%;
    .page{
      margin: 0 auto;
    }
  }
</style>
