<template>
  <div class="contain">
    <mu-container class="demo-container">
      <mu-row gutter>
        <mu-col span="6">
          <div class="grid-cell">
            <mu-select v-model="normal.value1" full-width>
              <mu-option v-for="(option,index) in options" :key="option" :label="option" :value="option" no-data-text="normal.value1"></mu-option>
            </mu-select>
          </div>
        </mu-col>
        <mu-col span="6">
          <div class="grid-cell">
            <mu-date-input action-icon="today" v-model="value10" type="month" container="dialog" full-width></mu-date-input>
          </div>
        </mu-col>
      </mu-row>
      <mu-row gutter>
        <mu-col span="12">
          <div class="grid-cell">
            <span class="tips"> {{normal.value2}}</span>
          </div>
        </mu-col>
      </mu-row>
    </mu-container>
    <mu-paper :z-depth="1" class="demo-list-wrap">
      <mu-list textline="three-line">
        <mu-sub-header>Today</mu-sub-header>
        <mu-list-item avatar button :ripple="false">
          <mu-list-item-action>
            <mu-avatar>
              <!-- <img src="../../assets/images/avatar1.jpg"> -->
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>张三丰</mu-list-item-title>
            <mu-list-item-sub-title>
              <span style="color: rgba(0, 0, 0, .87)">双向转诊-</span><br />
              今天13:37
            </mu-list-item-sub-title>
          </mu-list-item-content>

          <mu-list-item-action>
            <mu-list-item-after-text>￥300</mu-list-item-after-text>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item avatar button :ripple="false">
          <mu-list-item-action>
            <mu-avatar>
              <!-- <img src="../../assets/images/avatar2.jpg"> -->
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>Maco Mai</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value="chat_bubble"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item avatar button :ripple="false">
          <mu-list-item-action>
            <mu-avatar>
              <!-- <img src="../../assets/images/avatar3.jpg"> -->
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>Alex Qin</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value="chat_bubble"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item avatar button :ripple="false">
          <mu-list-item-action>
            <mu-avatar>
              <!-- <img src="../../assets/images/avatar4.jpg"> -->
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>Allen Qun</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value="chat_bubble"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
        <mu-list-item avatar button :ripple="false">
          <mu-list-item-action>
            <mu-avatar>
              <!-- <img src="../../assets/images/uicon.jpg"> -->
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>Myron Liu</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value="chat_bubble"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
      <!-- <mu-divider></mu-divider> -->

    </mu-paper>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4",
        "Option 5",
        "Option 6",
        "Option 7",
        "Option 8",
        "Option 9",
        "Option 10"
      ],
      normal: {
        value1: "筛选",
        value2: "本月：收入￥1000:00",
        value3: "",
        value4: "Option 1",
        value5: "Option 2"
      },
      value7: undefined,
      value8: undefined,
      value9: undefined,
      value10: undefined,
      value11: undefined
    };
  },
  methods: {
    alert() {}
  }
};
</script>
<style lang="less" scoped>
input {
  text-align: center;
}
.tips {
  display: block;
  width: 100%;
  height: 100%;
  line-height: 36px;
  padding: 0 10px;
  font-size: 14px;
}
.demo-container {
  .row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .grid-cell {
    border-radius: 4px;
    height: 36px;
    background: rgba(255, 255, 255, 0.8);
  }
}
.demo-container.is-stripe .col:nth-child(2n) .grid-cell {
  background: rgba(0, 0, 0, 0.54);
}
.demo-list-wrap {
  width: 100%;
  margin-top: 10px;
  // max-width: 360px;
}
/deep/ .mu-text-field-input {
  text-align: center;
}
/deep/ .mu-select-input {
  text-align: center;
}
</style>

