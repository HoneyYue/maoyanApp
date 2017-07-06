import Vue from 'vue'
import Router from 'vue-router'

import login from "../components/login/login.vue"
import reg from "../components/reg/reg.vue"
import info from "../components/info/info.vue"
import movie from "../components/info/movie/movie.vue"
import schedule from "../components/info/schedule/schedule.vue"
import seating from "../components/info/seating/seating.vue"
import studio from "../components/info/studio/studio.vue"
import theater from "../components/info/theater/theater.vue"
import users from "../components/info/users/users.vue"


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: login
    }, {
      path: '/login/:username',
      name: 'login',
      component: login
    }, {
      path: '/reg',
      name: 'reg',
      component: reg
    }, {
      path: '/info',
      name: 'info',
      component: info,
      children:[{
        path:"movie",
        name:"movie",
        component:movie
      }, {
        path:"schedule",
        name:"schedule",
        component:schedule
      }, {
        path:"seating",
        name:"seating",
        component:seating
      }, {
        path:"studio",
        name:"studio",
        component:studio
      }, {
        path:"theater",
        name:"theater",
        component:theater
      }, {
        path:"users",
        name:"users",
        component:users
      }]
    }]
})

