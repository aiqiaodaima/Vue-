<template>
  <div>
    <el-upload
      ref="upload"
      multiple
      class="upload-demo"
      action=""
      accept="image/*"
      :limit="limitNum"
      :on-exceed="handleExceed"
      :data="getData"
      :http-request="$oss.uploadRequest"
      :before-upload="beforeUpload"
      :on-success="handleUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      list-type="picture-card">
      <i class="el-icon-plus"></i>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过20MB</div>
    </el-upload>
  </div>
</template>

<script>
  export default {
    props:{
      type:'',
      limitNum: {
        default:50
      },
      filePath: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        fileList:[],
        fileData: {
          filePath: ''
        }
      }
    },
    computed: {
      getData(){
        return {filePath: this.filePath}
      }
    },
    methods:{
      handleExceed(file,fileList){
        this.$message({
          message:'图片数量超出限制',
          type:'warning'
        })
      },
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 20;
        if (!isJPG && !isPNG) {
          this.$message.error('上传图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 20MB!');
        }
        return (isJPG||isPNG) && isLt2M;
      },
      handleUpload(res,file,fileList){
        this.$emit('toFatherVue',{file:res.name,type:this.type})
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        let filename = file.response.name
        if (filename) {
          this.$oss.deleteFile(filename)
          this.$emit('deleteImg',filename)
        }
      },
      handlePreview(file) {
        console.log(file);
        this.$emit('sendFatherImg',{dialogImageUrl:file.url,dialogVisible:true})
      }
    }
  }
</script>

<style scoped>

</style>
