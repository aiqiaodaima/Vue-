import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Forget from '@/components/login/Forget'
import Register from '@/components/login/Register'
import Register2 from '@/components/login/Register2'
import City from '@/components/base/city'
Vue.use(Router)

export default new Router({
  routes: [{
      path: "/",
      name: 'Login',
      component: Login
    },
    {
      path: "/forget",
      name: 'Forget',
      component: Forget
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/register2",
      name: "register2",
      component: Register2
    },
    {
      path: "/city",
      name: "city",
      component: City
    },

  ],
  mode: 'history'
})
