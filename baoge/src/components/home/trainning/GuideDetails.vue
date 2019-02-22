<template>
  <el-card class="app_content">
    <iframe :src="'./static/pdf/web/viewer.html?file=' + url" frameborder="0"></iframe>

    <center>
      <el-button type="primary" size="medium" @click="goBack()">返回</el-button>
    </center>
  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        rid:'',
        ruleForm: {
          cgName: "",
          uploadDate: "",
          docName: "",
          fileUrl: "",
          hospitalId: "",
          hospitalName: "",
          pviews:''
        },
        fileList: []
      };
    },
   mounted() {
     this.rid=sessionStorage.rid || ''
     if(this.rid==='7'){
        this.insetTotCgByDocId()
      }
      //  this.checkNormal()
    },
    methods: {
      //返回
      goBack() {
        this.$router.back(-1);
      },
      //查看
       checkNormal() {
                // let url = 'http://image.cache.timepack.cn/nodejs.pdf'  // 有效 服务器配置跨域处理
              // let url = this.$oss + this.ruleForm.fileUrl
              // window.location.href = './static/pdf/web/viewer.html?file=' + url
            },
      showMsg() {
        this.$post('cgs/selectCgById', {
            id: this.$route.query.id
          })
          .then(res => {
            console.log(res)
              if(res.cg){
                // this.$axiosDataClone(this.ruleForm,res.data.cg)
                this.ruleForm = res.cg
                this.ruleForm.uploadDate = new Date(this.ruleForm.uploadDate).toLocaleDateString()
                let url = this.$oss + this.ruleForm.fileUrl
                console.log(url)
                // window.location.href = '/baoge/static/pdf/web/viewer.html?file=' + url
                window.location.href = './static/pdf/web/viewer.html?file=' + url
              }

          })
          .catch((error =>{
            console.error(error);
          }))
      },
      insetTotCgByDocId(){
         this.$axios.post('cgs/insetTotCgByDocId', {
            docId: sessionStorage.id || '',
            hospitalId:sessionStorage.hospitalId || '',
            clinicalId:this.$route.query.id
          })
       }
     },
    created(){
      if(sessionStorage.canPDF){
         this.showMsg()
      }
    }
  };

</script>

<style scoped>
</style>
