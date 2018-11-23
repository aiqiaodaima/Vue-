<template>
  <div :title="title2">
    <van-area :area-list="areaList" @confirm="confirm" @change="onChange" @cancel="cancel" :visible-item-count=3 />
  </div>
  <!-- :value="value" -->
</template>

<script>
import AreaList from "../../../static/js/area";

export default {
  data() {
    return {
      title2: "选中省市区",
      title3: "配置显示列",
      areaList: AreaList
    };
  },
  methods: {
    confirm(arr) {
      let city = `${arr[0].name} / ${arr[1].name} / ${arr[2].name}`;
      console.log(arr[0].name + arr[1].name + arr[2].name);
      this.$emit("city", city);
      this.$emit("showChange", false);
    },
    onChange(picker, value, index) {
      console.log(picker);
    },
    cancel() {
      console.log(222);
      this.$emit("showChange", false);
    }
  }
};
</script>
