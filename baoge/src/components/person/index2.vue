<template>
  <div class="contain">
    <div class="doctor-div">
      <div class="title-div">个人信息</div>
      <van-cell-group>
        <van-field v-model="username" label="头像" placeholder="请输入用户名" icon="arrow" />
        <van-field v-model="username" label="用户名" placeholder="请输入用户名" icon="arrow" />
        <van-field v-model="phone" label="手机号" placeholder="请输入手机号" icon="arrow" />
      </van-cell-group>
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell title="单选框 1" clickable @click="radio = '1'">
            <van-radio name="1" />
          </van-cell>
          <van-cell title="单选框 2" clickable @click="radio = '2'">
            <van-radio name="2" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: "1",
      username: "",
      phone: "",
      options: ["男", "女"],
      labelPosition: "left",
      form: {
        input: "",
        select: "",
        date: "",
        radio: "",
        checkbox: [],
        switch: false,
        slider: 30,
        textarea: ""
      }
    };
  }
};
</script>
<style lang="less" scoped>
.title-div {
  // background: #666;
  font-size: 0.4rem;
  padding: 5px 10px;
}
.mu-demo-form {
  width: 100%;
  max-width: 460px;
}
</style>

