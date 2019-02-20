import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Forget from '@/components/login/Forget'
import Register from '@/components/login/Register'
import Register2 from '@/components/login/Register2'
import Register3 from '@/components/login/Register3'
import City from '@/components/base/city'
import Home from '@/components/home/home'
// 个人
import Person from '@/components/person/index'
import Person2 from '@/components/person/index2'
import Invite from '@/components/person/invite'
import Wallet from '@/components/person/wallet'
import Kiting from '@/components/person/kiting'
import Detail from '@/components/person/detail'

//  双向转诊
import TransferApply from '@/components/home/bothway/TransferApply'
import MbTransferOut from '@/components/home/bothway/MbTransferOut'
import MbTransferIn from '@/components/home/bothway/MbTransferIn'
import DocTransferOutDetails from '@/components/home/bothway/DocTransferOutDetails'
// 远程会诊
import MbConsultationApply from '@/components/home/telemedicine/MbConsultationApply'
import ConsultationList from '@/components/home/telemedicine/ConsultationList'
import ConsultationCgList from '@/components/home/telemedicine/ConsultationCgList'
import DocConsultationListDetails from '@/components/home/telemedicine/DocConsultationListDetails'
// 远程培训
import Teaching from '@/components/home/trainning/Teaching'
import Health from '@/components/home/trainning/Health'
import MbRemoteTraningDetails from '@/components/home/trainning/MbRemoteTraningDetails'
import Guide from '@/components/home/trainning/Guide'
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
    {
      path: "/invite",
      name: "invite",
      component: Invite
    },
    {
      path: "/wallet",
      name: "wallet",
      component: Wallet
    },
    {
      path: "/kiting",
      name: "kiting",
      component: Kiting
    },
    {
      path: "/detail",
      name: "detail",
      component: Detail
    },
    {
      path: "/transferApply",
      name: "TransferApply",
      component: TransferApply
    },
    {
      path: "/mbTransferOut",
      name: "MbTransferOut",
      component: MbTransferOut
    },
    {
      path: "/mbConsultationApply",
      name: "MbConsultationApply",
      component: MbConsultationApply
    },
    {
      path: "/teaching",
      name: "Teaching",
      component: Teaching
    },
    {
      path: "/mbRemoteTraningDetails",
      name: "MbRemoteTraningDetails",
      component: MbRemoteTraningDetails
    },
    {
      path: "/mbTransferIn",
      name: "MbTransferIn",
      component: MbTransferIn
    },
    {
      path: "/consultationList",
      name: "ConsultationList",
      component: ConsultationList
    },
    {
      path: "/guide",
      name: "Guide",
      component: Guide
    },
    {
      path: "/docTransferOutDetails",
      name: "DocTransferOutDetails",
      component: DocTransferOutDetails
    },
    {
      path: "/consultationCgList",
      name: "ConsultationCgList",
      component: ConsultationCgList
    },
    {
      path: "/docConsultationListDetails",
      name: "DocConsultationListDetails",
      component: DocConsultationListDetails
    },
    {
      path: "/health",
      name: "Health",
      component: Health
    },

  ],
  // mode: 'history'
})
