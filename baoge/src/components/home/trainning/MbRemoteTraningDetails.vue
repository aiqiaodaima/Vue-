<template>
  <div>
    <div class="chair-container" id="wrap">
      <el-card class="box-card" style="padding: 10px 0;">
        <div class="row fixed">
          <div>
            <dl id="training">
              <dt>
                <h4 style="width:100%;background:#333;color:#fff;line-height:50px;font-size:18px;text-align:center;">{{title}}</h4>
              </dt>
              <dd style="position: relative;">
                <video id="remotetraining_video" class="video-js vjs-big-play-centered" style="width:90%;height: 200px;background-color: #000;"
                  ref='video' controls="true" controlslist="nodownload">
                  <p class="vjs-no-js">
                    要查看此视频，请启用JavaScript，并考虑将其升级到web浏览器
                  </p>
                </video>
              </dd>
            </dl>
            <div class="grade">
              <el-rate v-model="valueFlower" :colors="['#d92d00', '#d92d00', '#d92d00']" :icon-classes='["my_icon-my_flower2","my_icon-my_flower2","my_icon-my_flower2"]'
                void-icon-class="my_icon-my_flower2" @change="changeFlower" :disabled="isSent" disabled-void-icon-class="my_icon-my_flower2">
              </el-rate>
              <el-button plain type="primary" @click="sendFlower" v-if="!isSent">送花</el-button>
              <p v-else class="tips">已拥有<em>{{sumFlower}}</em>朵 <i class="my_icon-my_flower2 special"></i> </p>
            </div>
            <center style="margin-top:20px;">
              <el-button type="primary" size="medium" @click="$router.back(-1)">返回</el-button>
            </center>
          </div>
        </div>
      </el-card>
    </div>
    <el-card class="box-card">
      <div class="questionArea chair-container addDivs">
        <div style="overflow: hidden;">
          <h1 style="margin:10px 0 15px;">授课老师简介</h1>
          <div class='photo' :style="{backgroundImage: 'url(' + user.photo + ')', backgroundSize:'center'}"></div>
          <div style="box-sizing:border-box;font-size: 18px;">
            <p style="font-size: 14px; line-height:22px">姓名：{{user.userName}}</p>
            <p style="font-size: 14px; line-height:22px">职称：{{user.job}}</p>
            <p style="font-size: 14px; line-height:22px">科室：{{user.seName}}</p>
            <p style="font-size: 14px; line-height:22px">医院：长沙市第一医院</p>
            <p style="font-size: 14px; line-height:22px">简介：{{user.intro}}</p>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <temMessage />
    </el-card>
  </div>
</template>
<script>
  import temMessage from "./temMessage.vue"
  export default {
    components: {
      temMessage
    },
    props: {
      videoPlay: {
        type: Function,
        default: () => {}
      }
    },
    data() {
      return {
        // videoUrl: 'https://imuts.oss-cn-shenzhen.aliyuncs.com/lcsVideo/中国2型糖尿病防治指南（二）.mp4',
        title: '',
        user: {},
        ask: '提问',
        value4: null,
        // 送花
        valueFlower: 0,
        sumFlower: 0,
        flower: 0,
        giveId: "",
        isSent: false,
        msg: [],
        placeholder: '请发表你的想法',
        pageSize: 6,
        pageNo: 1,
        total: 0,
        autofocus: false,
        canReply: false
      }
    },
    methods: {
      handleCurrentChange(value) {
        console.log(value)
        this.pageNo = value || 1;
        this.getMsg()
      },
      getVideo() {
        this.$post('training/selectTrainingById', {
            id: this.$route.query.id
          })
          .then(res => {
            console.log(res)
            if (res.training) {
              if (res.training.url.indexOf('https') < 0) {
                res.training.url = this.$oss + res.training.url
              }
              this.$refs.video.src = res.training.url
              this.title = res.training.title
              if (res.user) {
                res.user.photo = this.$oss + res.user.photo
                this.user = res.user;
                console.log(this.user)
                this.user.phone == JSON.parse(sessionStorage.getItem("user")).phone
              }
              this.$refs.video.onplay = this.videoPlay
            }
          })
      },
      getMsg() {
        this.$post('training/selectTrainingOpinionPage', {
            trainingId: this.$route.query.id,
            pageSize: this.pageSize,
            pageNo: this.pageNo
          })
          .then(res => {
              this.total = res.customPage.records
              if (res.customPage.rows.length > 0) {
                this.msg = res.customPage.rows.map(item => {
                  item.createTime = this.$moment(item.createTime).format("YYYY-MM-DD");
                  return item
                })
            }
          })
      },
      changeFlower(val) {
        console.log(val)
        this.flower = parseInt(val)
      },
      sendFlower() {
        if (this.flower == 0) {
          this.$message({
            message: '不能不送花哦！',
            type: 'warning'
          });
          return
        }
        this.$post("totalTraining/trainingFlower", {
            trainingId: this.$route.query.id,
            giveId: this.giveId,
            flowerNum: this.flower
          })
          .then(res => {
            if (res.status == 200) {
              console.log(res)
              if (res.data.msg == "1") {
                this.$message({
                  message: '恭喜您，送花成功',
                  type: 'success'
                });
                this.isSent = true;
                this.showTotalFlowe()
              } else if (res.data.msg == "5") {
                this.$message({
                  message: '您已经送过了',
                  type: 'warning'
                });
              }
            }
          })
      },
      showMyFlowe() {
        this.$post("totalTraining/trainingFlowerBytId", {
            trainingId: this.$route.query.id,
            giveId: this.giveId,
          })
          .then(res => {
            if (res.status == 200) {
              console.log(res)
              if (res.data.myFlower == "0") {
                this.isSent = false;
                this.valueFlower = 0
              } else {
                this.valueFlower = res.data.myFlower || 0
                this.isSent = true
              }
            }
          })
      },
      showTotalFlowe() {
        this.$post("totalTraining/trainingFlowerTotal", {
            trainingId: this.$route.query.id
          })
          .then(res => {
            if (res.status == 200) {
              console.log(res)
              this.sumFlower = res.data.sumFlower || 0
            }
          })
      }
    },
    created() {
      // this.$refs.video.src = 'https://imuts.oss-cn-shenzhen.aliyuncs.com/lcsVideo/中国2型糖尿病防治指南（二）.mp4'
      this.getMsg();
      this.getVideo();
      this.showMyFlowe();
      this.showTotalFlowe()
    }
  }

</script>

<style scoped>
/* 备用图标 */
    [class^="my_icon"], [class*="my_icon"] {
      font-family:"iconfont" !important;
      font-size:16px;
      font-style:normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

  .grade {
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 1em;
    justify-content: center;
  }

  #wrap /deep/ .el-card__body {
    padding: 0 !important;
  }

  .grade /deep/ .my_icon-my_flower2:before {
    font-family:"iconfont" !important;
    font-size: 24px !important;
    font-style: normal;
  }

  .grade .tips {
    margin: 0 20px;
    /* color: #e54749; */
    font-size: 18px;
  }

  .grade .tips em {
    color: #e54749;
    font-size: 20px;
    margin: 0 5px;
  }

  .grade .special {
    color: #e54749;
  }

  .box-card {
    margin-bottom: 30px;
  }

  .photo {
    width: 120px;
    height: 160px;
    background-size: 100% 100%;
    float: left;
    box-sizing: border-box;
    margin-right: 20px;
  }

  .questionArea {
    background: #fff;
    margin-top: 18px;
    padding-bottom: 30px;
    overflow: auto;
  }

  .questionArea .questionArea-title {
    padding: 40px 0 20px 20px;
    border-bottom: 1px solid #e6e6e6;
  }

  .questionArea .questionArea-title h2 {
    font-size: 20px;
    color: #333;
  }

  .questionArea .questionArea-submit {
    padding: 30px 20px 0 62px;
  }

  .questionArea .questionArea-submit span {
    display: block;
    overflow: hidden;
  }

  .questionArea .questionArea-submit input {
    width: 100%;
    height: 56px;
    color: #999;
    font-size: 16px;
    background: #f7f7f7;
    border: 0 none;
    border-radius: 8px;
    box-sizing: border-box;
    padding-left: 20px;
    outline: none;
  }

  .questionArea .questionArea-submit button {
    width: 100px;
    height: 56px;
    color: #999;
    font-size: 16px;
    font-weight: bold;
    float: right;
    background: #f7f7f7;
    border-radius: 8px;
    margin-left: 10px;
    cursor: pointer;
    outline: none;
  }

  .questionArea .questionArea-content {
    padding: 30px 20px 0 62px;
  }

  .questionArea-submit li {
    margin-bottom: 20px;
  }

  .questionArea-submit li .card_header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eaeaea;
  }

  .questionArea-submit li .card_header p {
    display: flex;
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 10px;
  }

  .questionArea-submit li p:nth-of-type(1) {
    padding-bottom: 10px;
  }

  .questionArea-submit li p span {
    font-size: 18px;
    line-height: 24px;
    font-weight: bold;
  }

  .reply {
    display: flex;
    justify-content: flex-end;
    color: #238c8f;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
  }

</style>
