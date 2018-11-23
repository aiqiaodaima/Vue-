<template>
  <div class="contain">
    <mu-container class="demo-container">
      <mu-row gutter>
        <mu-col span="4">
          <div class="grid-cell" @click="alert"></div>
        </mu-col>
        <mu-col span="3">
          <div class="grid-cell"></div>
        </mu-col>
        <mu-col span="5">
          <div class="grid-cell">
            <mu-date-input action-icon="today" v-model="value10" type="month" container="dialog" full-width></mu-date-input>
          </div>
        </mu-col>
      </mu-row>
    </mu-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
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

/deep/ .mu-text-field-input {
  text-align: center;
}
</style>

