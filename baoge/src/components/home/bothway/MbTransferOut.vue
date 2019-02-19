<template>
  <div class="contain">
    <center>转出列表</center>
    <el-card class="box-card" v-for="item in tableData" :key="item.id">
      <div class="top">
        <span>患者姓名：{{item.ptName}} </span>
        <span>性别： {{item.ptSex}}</span>
        <span>年龄： {{item.ptAge}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="handleCheck(item.id)">查看详情</el-button>
      </div>
      <div class="item">
        <span>联系方式：{{item.ptPhone}} </span>
      </div>
      <div class="item">
        <span>接诊医院：{{item.planHospital}} </span>
        <span>{{item.planChamber}}</span>
      </div>
    </el-card>
    <!-- 底部 -->
    <div style="height:50px;"></div>
    <footer>
      <el-pagination
      align="center"
      background
      @current-change="handleCurrentChange"
      :current-page.sync="pageNo"
      :page-size="4"
      layout="total, prev, pager, next, jumper"
      :total="resultCount">
    </el-pagination>

    </footer>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        ptName:'',
        daterange:[],
        startTime: '',
        endTime: '',
        pageNo: 1,
        resultCount:0,
        applyUserId:''
      }
    },
    methods:{
      handleSelect(){
        this.pageNo = 1
        this.fetchData()
      },
      fetchData(){
        this.$post
        ('case/selectCasePage?pageSize=4&type=A&pageNo='+this.pageNo +
              '&applyUserId=' + this.applyUserId +
              '&startTime=' + this.startTime +
              '&endTime=' + this.endTime +
              '&ptName=' + this.ptName)
        .then(res=>res.list)
        .then(res=>{
          this.resultCount = res.resultCount
          // console.log(res);
          this.tableData = res.list.map(item=>{
            item.planTime =  this.$moment(item.planTime).format("YYYY-MM-DD")
            // item.statu = this.$statuChange(item.statu)
            return item
          })
        })
      },
      handleCurrentChange(e){
        this.pageNo = e
        this.fetchData();
      },
      handleCheck(data){
        this.$router.push({
          path: '/docTransferOutDetails',
          query:{
            id: data
          }
        })
      },
    },
    mounted(){
      this.applyUserId =  JSON.parse(sessionStorage.getItem('user')).id
      this.fetchData()
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
