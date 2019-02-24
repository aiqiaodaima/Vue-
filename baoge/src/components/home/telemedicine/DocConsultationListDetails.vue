<template>
  <div style="padding:1em 5px;">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size:14px;">当前状态</span>
        <el-button style="float: right; padding: 3px 0" type="text">{{info.statu}}</el-button>
      </div>
      <van-cell-group>
        <van-cell title="患者姓名" :value="info.patientName" />
        <van-cell title="年龄" :value="info.age+'岁'" />
        <van-cell title="性别" :value="info.sex" />
        <van-cell title="联系方式" :value="info.ptPhone" />
        <van-cell title="身份证号" :value="info.ptCard" />
        <!-- <van-cell title="双向转诊" :value="info.isDouble=='Y'?'是':'否'" /> -->

        <van-cell title="过敏史：" :value="info.allergy" />
        <van-cell title="现病史：" :value="info.present" />
        <van-cell title="既往史：" :value="info.past" />
         <van-cell title="检查：" :value="info.examine" />
         <van-cell title="初步诊断：" :value="info.initial" />

        <van-cell>
          <template slot="title" class="">
            <span style="font-size:14px;margin:0 0 5px 0;">病历图片</span>
            <ul class="slotUl">
              <li v-for="item in imgList"><img :src="$oss + item.imgUrl" alt=""></li>
            </ul>
          </template>
        </van-cell>
        <van-cell title="申请日期：" :value="$moment(info.applyDate).format('YYYY-MM-DD')" />
        <van-cell title="申请医院：" :value="info.categoryHospital" />
        <van-cell title="申请医生：" :value="info.doctorName" />
         <van-cell title="会诊时间：" :value="$moment(info.groupDate).format('YYYY-MM-DD HH:mm')" />
         <van-cell title="会诊类型：" :value="info.groupType==1?'普通会诊':'紧急会诊'" />
          <van-cell title="会诊模式：" :value="info.diagnosisType=='LX'?'离线会诊':'视频会诊'" />

        <van-cell title="会诊医院：" :value="info.groupHospital" />
        <van-cell title="会诊科室：" :value="info.chamber" />
         <van-cell title="会诊专家：" :value="info.specialist" />

         <van-cell title="当前状态：" :value="info.chamber" />
         <van-cell title="撤销原因：" :value="info.pronation" v-if="info.pronation"/>
        <van-cell title="住院号：" :value="info.inpatient"  v-if="info.inpatient"/>
      </van-cell-group>
    </el-card>

    <center style="margin: 1em 0">
      <el-button @click="$router.go(-1)" size="medium" type="primary">返回</el-button>
    </center>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        info: {},
        imgList:[]
      }
    },
    methods: {
      fetchData() {
        this.$post('con/selectConsultationById?id='+this.$route.query.id)
          .then(res => {
            console.log(res);
            this.info = res.applyConsultation || {}
            this.imgList = res.imgList || []
            if (this.info.protectType) {
              switch (this.info.protectType) {
                case 1:
                  this.info.protectType = "省医保"
                  break;
                case 2:
                  this.info.protectType = "市职工医保"
                  break;
                case 3:
                  this.info.protectType = "市居民医保"
                  break;
                case 4:
                  this.info.protectType = "新农合"
                  break;
                case 5:
                  this.info.protectType = "自费"
                  break;
                case 6:
                  this.info.protectType = "异地医保"
                  break;
                case 7:
                  this.info.protectType = "其他"
                  break;
                default:
                  break;
              }
            }
            this.info.planTime ? this.info.planTime = this.$moment(this.info.planTime).format("YYYY-MM-DD") : '';
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
            this.info.statu =  $statuChange(this.info.statu)

          })
          .then(res => {

          })
      }
    },
    created() {
      this.fetchData()
    }
  }

</script>

<style lang="less" scoped>
  .box-card {
    /deep/ .el-card__body {
      padding: 0;
    }
    /deep/ .van-cell__title{
      max-width: 2.66rem;
    }
    .slotUl {
      // width: 90%;
      display: flex;
      flex-wrap: wrap;
      min-width: 8.93rem;
      // align-content: space-between;
      justify-content: space-between;

      li {
        width: 48%;

        img {
          width: 100%;
        }
      }
    }
  }

</style>
