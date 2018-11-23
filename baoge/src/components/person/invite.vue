<template>
  <div>
    <mu-container>
      <mu-card style="width: 100%; max-width: 375px; margin: 0 auto; padding:1rem 0;">
        <mu-card-header title="张丽" sub-title="国家一级医生">
          <mu-avatar slot="avatar">
            <!-- <img src="../../assets/images/uicon.jpg"> -->
          </mu-avatar>
        </mu-card-header>
        <!-- <mu-card-media title="Image Title" sub-title="Image Sub Title"> -->
        <!-- <img src="../../assets/images/sun.jpg"> -->
        </mu-card-media>
        <mu-card-text>
          <img src="../../assets/logo.png" alt="" class="qrcode">
        </mu-card-text>
        <p class="tipsword">分享给同事和医生朋友，邀请TA加入医生联盟</p>
        <!-- <mu-card-actions>
          <mu-button flat aria-disabled="true">分享给同事和医生朋友，邀请TA加入医生联盟</mu-button>
        </mu-card-actions> -->
      </mu-card>
    </mu-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      shift: "person",
      size: 100
    };
  }
};
</script>
<style lang="less" scoped>
.qrcode {
  display: block;
  width: 200px;
  height: 200px;
  margin: 0 auto;
}
.tipsword {
  text-align: center;
  font-size: 0.4px;
}
</style>


