import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Forget from '@/components/login/Forget'
import Register from '@/components/login/Register'
import Register2 from '@/components/login/Register2'
import Register3 from '@/components/login/Register3'
import City from '@/components/base/city'
import Home from '@/components/home/home'
import Person from '@/components/person/index'
import Person2 from '@/components/person/index2'
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
      path: "/register3",
      name: "register3",
      component: Register3
    },
    {
      path: "/city",
      name: "city",
      component: City
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/person",
      name: "person",
      component: Person
    },
    {
      path: "/person2",
      name: "person2",
      component: Person2
    },

  ],
  mode: 'history'
})
