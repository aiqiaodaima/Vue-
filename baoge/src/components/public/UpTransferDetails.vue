<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="0"/>
      <el-tab-pane v-if="imgList1.length" label="病历资料" name="1"/>
      <el-tab-pane v-if="imgList2.length" label="检查资料" name="2"/>
      <el-tab-pane v-if="imgList3.length" label="B超资料" name="3"/>
      <el-tab-pane v-if="imgList4.length" label="病理资料" name="4"/>
      <el-tab-pane v-if="imgList5.length" label="DR资料" name="5"/>
      <el-tab-pane v-if="imgList6.length" label="心电资料" name="6"/>
      <el-tab-pane v-if="imgList7.length" label="扫描文件" name="7"/>
      <el-tab-pane v-if="imgList6.length" label="CT/MR资料" name="8"/>
    </el-tabs>
    <!-- 基本信息表 -->
    <table v-show="activeName=='0'" class="table table-bordered table-striped">
      <tbody>
        <tr>
          <td>患者姓名：{{info.ptName}}</td>
          <td>年龄：{{info.ptAge}}</td>
          <td>性别：{{info.ptSex}}</td>
        </tr>
        <tr>
          <td>手机号：{{info.ptPhone}}</td>
          <td>身份证：{{info.ptCard}}</td>
          <td>双向转诊：{{info.isDouble=='Y'?'是':'否'}}</td>
        </tr>
        <tr>
          <!-- <td>医保类型：{{$protectTypeChange(info.protectType)}}</td> -->
          <td colspan="2">家庭住址：{{info.ptCity}}</td>
        </tr>
        <tr>
          <td colspan="3">初步诊断：{{info.initial}}</td>
        </tr>
        <tr>
          <td colspan="3">病情摘要：{{info.digest}}</td>
        </tr>
        <tr>
          <td>转诊医院：{{info.hospitalNames}}</td>
          <td>转诊科室：{{info.chamber}}</td>
          <td>转诊医生：{{info.applyName}}</td>
        </tr>
        <tr>
          <td>接诊医院：{{info.planHospitalName}}</td>
          <td>接诊科室：{{info.planChamber}}</td>
          <td></td>
        </tr>
        <tr v-if="info.docUserId">
          <td>接诊医生：{{info.docUserName}}</td>
          <td>医生编号：{{info.docUserId}}</td>
          <td></td>
        </tr>
        <tr>
          <td>预约转诊日期：{{$moment(info.planTime).format("YYYY-MM-DD")}}</td>
          <td>转诊缘由：{{info.changeReason}}</td>
          <td></td>
        </tr>
        <tr>
          <td>初诊/复诊：{{info.diagnose==1?'初诊':'复诊'}}</td>
          <td>急病/慢病：{{info.illness==1?'急病':'慢病'}}</td>
          <td></td>
        </tr>

        <tr>
          <!-- <td>当前状态：{{$statuChange(info.statu)}}</td> -->
           <td colspan="2">
            <span v-if="info.docUserName&&info.statu==2">接诊医生撤销，撤销原因：{{info.pronation}}</span>
            <span v-if="info.pronation&&info.statu==8">医院撤销，撤销原因：{{info.pronation}}</span>
            <span v-if="info.inpatient">住院号：{{info.inpatient}}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 病历资料 -->
    <div class="img_area" v-show="activeName=='1'">
      <ul ref="imgList1">
        <template v-for="item in imgList1">
          <li v-if="item.imgUrl" :key="item.id">
            <img width="168" height="200" :src="$ossAssetName + item.imgUrl">
          </li>
        </template>
      </ul>
    </div>
    <div class="img_area" v-show="activeName=='2'">
      <ul ref="imgList2">
        <template v-for="item in imgList2">
          <li v-if="item.imgUrl" :key="item.id">
            <img width="168" height="200" :src="$ossAssetName + item.imgUrl">
          </li>
        </template>
      </ul>
    </div>
    <div class="img_area" v-show="activeName=='3'">
      <ul ref="imgList3">
        <template v-for="item in imgList3">
          <li v-if="item.imgUrl" :key="item.id">
            <img width="168" height="200" :src="$ossAssetName + item.imgUrl">
          </li>
        </template>
      </ul>
    </div>
    <div class="img_area" v-show="activeName=='4'">
      <ul ref="imgList4">
        <template v-for="item in imgList4">
          <li v-if="item.imgUrl" :key="item.id">
            <img width="168" height="200" :src="$ossAssetName + item.imgUrl">
          </li>
        </template>
      </ul>
    </div>
    <div class="img_area" v-show="activeName=='5'">
      <ul ref="imgList5">
        <template v-for="item in imgList5">
          <li v-if="item.imgUrl" :key="item.id">
            <img width="168" height="200" :src="$ossAssetName + item.imgUrl">
          </li>
        </template>
      </ul>
    </div>
    <div class="img_area" v-show="activeName=='6'">
      <ul ref="imgList6">
        <template v-for="item in imgList6">
          <li v-if="item.imgUrl" :key="item.id">
            <img width="168" height="200" :src="$ossAssetName + item.imgUrl">
          </li>
        </template>
      </ul>
    </div>
    <div class="img_area" v-show="activeName=='7'">
      <ul ref="imgList7">
        <template v-for="item in imgList7">
          <li v-if="item.imgUrl" :key="item.id">
            <img width="168" height="200" :src="$ossAssetName + item.imgUrl">
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
  import Viewer from 'viewerjs'
  import 'viewerjs/dist/viewer.css'
  export default {
    data() {
      return {
        activeName: '0',
        info:{
          id:'',
          ptName:'',
          ptAge: '',
          ptSex: '',
          ptPhone: '',
          ptCard: '',
          ptCity: '',
          protectType: '',
          isDouble: '',
          initial: '',
          digest: '',
          hospitalNames: '',
          hospitalId: '',
          chamber: '',
          applyName: '',
          applyUserId:'',
          planHospitalName: '',
          // 拟接诊科室
          planChamber: '',
          // 实际接诊科室
          docSection:'',
          // 接诊医生,
          docUserName:'',
          // 医生编号,
          docUserId:'',
          planTime: '',
          changeReason: '',
          diagnose: '',
          illness: '',
          statu: '',
          pronation: '',
          inpatient: ''
        },
        imgList1:[],
        imgList2:[],
        imgList3:[],
        imgList4:[],
        imgList5:[],
        imgList6:[],
        imgList7:[],
        imgList8:[],
      }
    },
    mounted(){
      this.fetchData()
    },
    methods: {
      fetchData(){
        this.$post('case/selectCaseById?id='+this.$route.query.id)
        .then(res=>{
          // console.log(res);
          // this.$axiosDataClone(this.info,res.data.applyCase)

          let imgList = res.imgList

          imgList.forEach(item => {
            this['imgList' + item.type].push(item)
          })
        })
        .then(res=>{
          this.$emit('getInfo',this.info)
          this.$nextTick(()=>{
            for(let i=1;i<=7;i++){
              new Viewer(this.$refs['imgList'+i]);
            }
          })
        })
      }
    },
  }
</script>

<style scoped>

</style>
