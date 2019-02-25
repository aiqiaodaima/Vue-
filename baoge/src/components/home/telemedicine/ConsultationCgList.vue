<template>
  <div class="contain">
    <center>会诊列表</center>
    <el-card class="box-card" v-for="item in arrWC" :key="item.id">
      <div class="top">
        <span>患者姓名：{{item.patientName}} </span>
        <span>性别： {{item.sex}}</span>
        <span>年龄： {{item.age}}</span>
      </div>
      <div class="item">
        <span>会诊时间：{{$moment(item.groupDate).format('YYYY-MM-DD HH:mm')}} </span>
      </div>
      <div class="item">
        <span>联系方式：{{item.ptPhone}} </span>
      </div>
      <div class="item">
        <span>接诊医院：{{hospital}} </span>
        <span>{{item.chamber}}</span>
      </div>
      <div class="item">
        <el-button style="float: right; padding: 13px 5px" type="text" @click="selectConById(item.id)">{{item.status}}</el-button>
      </div>
    </el-card>
    <!-- 底部 -->
    <div style="height:50px;"></div>
    <footer>
      <el-pagination align="center" background small @current-change="handleCurrentChange" :current-page.sync="currentPage"
        :page-size="pageSize" layout="total, prev, pager, next" :total="total">
      </el-pagination>


    </footer>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        hospital: '',
        arrWC: [],
        currentPage: 1,
        total: 0, //总页数
        pageSize: 10, //每页大小
        daterange: [],
        patientName: '',
        startTime: '',
        endTime: '',
        docId: '',
        statusObj: {
          10: '待医院审核',
          20: '待分配专家',
          30: '待专家接收',
          40: '已接收',
          50: '本医院撤销',
          60: '上级医院撤销',
          70: '会诊已结束'
        },
        diagnosisTypeObj: {
          LX: '离线会诊',
          SP: '视频会诊'
        },
        groupTypeObj: {
          1: '普通会诊',
          2: '紧急会诊'
        }

      }
    },
    mounted() {
      this.docId = JSON.parse(sessionStorage.getItem('user')).id
      this.selectConByCategory();
      this.getHospital()
    },

    methods: {
      // 获取医院
      getHospital() {
        this.$post('infor/selectInforName')
          .then(res => {
            console.log(res)
            if (res.applyInformation) {
              this.hospital = res.applyInformation.hospitalName || ''
            }
          })
      },
      selectConByCategory() {
        this.$post(
          "con/selectConByCategory?type=3&pageNo=" + this.currentPage +
          "&pageSize=" + this.pageSize +
          "&patientName=" + this.patientName +
          "&startTime=" + this.startTime +
          "&endTime=" + this.endTime + "&docId=" + this.docId
        ).then(res => {
          console.log(res)
          this.arrWC = res.pagetion.list;
          this.total = res.pagetion.resultCount;

          this.arrWC.map(item => {
            console.log(item.status)
            item.status = this.statusObj[(item.status)]
          })
          // this.arrWC.statu =  $statuChange(this.info.statu)
        });
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.selectConByCategory();
      },
      selectConById(e) {
        this.$router.push({
          path: '/docConsultationListDetails',
          query: {
            id: e
          }
        })
      },
      chanageDay(value) {
        if (value != null && value != '') {
          let getTimes = (new Date(value[1]).getTime()) - (new Date(value[0]).getTime())
          this.startTime = value[0].toString();
          this.endTime = value[1].toString();
        } else {
          this.startTime = '';
          this.endTime = '';
        }
      },
      handleSelect() {
        this.selectConByCategory();
      },
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
