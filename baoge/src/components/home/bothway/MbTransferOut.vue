<template>
  <div class="contain">
    <center>转出列表</center>
    <el-card class="box-card" v-for="item in tableData" :key="item.id">
      <div class="top">
        <span>患者姓名：{{item.ptName}} </span>
        <span>性别： {{item.ptSex}}</span>
        <span>年龄： {{item.ptAge}}</span>
      </div>
      <div class="item">
        <span>联系方式：{{item.ptPhone}} </span>
      </div>
      <div class="item">
        <span>接诊医院：{{item.planHospital}} </span>
        <span>{{item.planChamber}}</span>
      </div>
      <div class="item">
        <el-button style="float: right; padding: 13px 5px" type="text" @click="handleCheck(item.id)">{{item.statu}}</el-button>
      </div>
    </el-card>
    <!-- 底部 -->
    <div style="height:50px;"></div>
    <footer>
      <el-pagination small background align="center" @current-change="handleCurrentChange" :current-page.sync="pageNo"
        :page-size="5" layout="total, prev, pager, next" :total="resultCount">
      </el-pagination>

    </footer>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        ptName: '',
        daterange: [],
        startTime: '',
        endTime: '',
        pageNo: 1,
        resultCount: 0,
        applyUserId: ''
      }
    },
    methods: {
      handleSelect() {
        this.pageNo = 1
        this.fetchData()
      },
      fetchData() {
        let $statuChange = (e, id) => {
              if (e == 1) {
                return '待医院审核'
              } else if (e == 2) {
                return '等待接收'
              } else if (e == 3) {
                if (id == 'doc') {
                  return '待医生接收'
                } else {
                  return '待专家接收'
                }
              } else if (e == 4) {
                return '已接收'
              } else if (e == 5) {
                return '已就诊'
              } else if (e == 6) {
                return '已住院'
              } else if (e == 7) {
                return '未就诊'
              } else if (e == 8) {
                return '已撤销'
              } else if (e == 9) {
                return '本医院撤销'
              }
            }
        this.$post('case/selectCasePage?pageSize=5&type=B&pageNo=' + this.pageNo +
            '&applyUserId=' + this.applyUserId +
            '&startTime=' + this.startTime +
            '&endTime=' + this.endTime +
            '&ptName=' + this.ptName)
          .then(res => res.list)
          .then(res => {
            this.resultCount = res.resultCount
            // console.log(res);
            this.tableData = res.list.map(item => {
              item.planTime = this.$moment(item.planTime).format("YYYY-MM-DD")
              item.statu = $statuChange(item.statu)
              return item
            })
          })
      },
      handleCurrentChange(e) {
        this.pageNo = e
        this.fetchData();
      },
      handleCheck(data) {
        this.$router.push({
          path: '/docTransferOutDetails',
          query: {
            id: data
          }
        })
      },
    },
    mounted() {
      this.applyUserId = JSON.parse(sessionStorage.getItem('user')).id
      this.fetchData()
    },
  }

</script>

<style lang="less" scoped>
  .contain {
    padding: 10px 15px;

    .box-card {
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

  footer {
    background-color: #eaeaea;
    position: fixed;
    bottom: 0;
    width: 90%;
    /*写给不支持calc()的浏览器*/
    width: -moz-calc(100% - (10px + 5px) * 2);
    width: -webkit-calc(100% - (10px + 5px) * 2);
    width: calc(100% - (10px + 5px) * 2);
  }

</style>
