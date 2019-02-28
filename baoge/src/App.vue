<template>
  <div id="app">
    <!-- <app-Login2 /> -->
    <router-view />
  </div>
</template>
<script>
// 局部注册组件
// import Login2 from "./components/login/Login2";
export default {
  name: "app",
  data() {
    return {
      title: "这是title"
    };
  }
  // 备注
  // components: {
  //   "app-Login2": Login2
  // }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background-size: cover;
  position: relative;
  /* width: 100vw; */
  height: 100vh;
}
#app {
  width: 100%;
  height: 100%;
}
/* .bg-login {
  width: 100vw;
  min-height: 90vh;
  background-color: #f4f6f8;
  padding-top: 10vh;
} */
</style>
