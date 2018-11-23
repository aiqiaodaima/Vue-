<template>
  <div class="bg-content">
    <p class="content-header">请填写您的真实信息用于医生认证，我们将严格保密</p>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" size="mini">
      <p class="form-header">上传照片(2选1)</p>
      <el-form-item label="类型" required>
        <el-radio-group v-model="ruleForm.uptype">
          <el-radio border label="医师执业证书"></el-radio>
          <el-radio border label="工牌照片"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <!-- </el-form-item>

      <el-button type="primary" size="medium" class="maxBtn">下一步</el-button>
      <el-form-item> -->
      <el-button type="primary" size="medium" class="maxBtn">下一步</el-button>
    </el-form>

  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      ruleForm: {
        uptype: ""
      },
      rules: {}
    };
  },
  methods: {
    onRead(file) {
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="less" scoped>
.el-upload-list--picture-card .el-upload-list__item {
  width: 120px !important;
  height: 120px;
}
.bg-content {
  background: #f4f6f8;
  overflow: auto;
  .el-upload-list--picture-card .el-upload-list__item {
    width: 40vw;
    height: 40vw;
  }
  .el-upload-list__item .is-success {
    width: 40vw;
    height: 40vw;
  }
  .content-header {
    font-size: 12px;
    text-align: center;
    line-height: 20px;
  }
  .demo-ruleForm {
    background: #fff;
    padding: 0.2rem 0.5rem;
    // border: 1px solid #eaeaea;
    .form-header {
      border-left: 2px solid rgb(25, 158, 216);
      padding: 0 8px;
      font-size: 14px;
    }
    .el-form-item {
      padding-bottom: 10px;
      // border-bottom: 1px solid #eaeaea;
    }
    .el-select {
      display: block;
    }
    .maxBtn {
      margin-top: 1rem;
      width: 100%;
    }
  }
}
</style>


