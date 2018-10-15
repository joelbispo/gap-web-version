import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/homeResearcher',
      name: 'welcome-view',
      component: require('@/components/WelcomeView').default
    },
    {
      path: '/inspire',
      name: 'inspire',
      component: require('@/components/InspireView').default
    },
    {
      path: '/loginResearcher',
      name: 'login-researcher',
      component: require('@/components/LoginView/LoginResearcher').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/firstAccessResearcher',
      name: 'first-access-researcher',
      component: require('@/components/LoginView/FirstAccessResearcher').default
    },
    {
      path: '/',
      name: 'home-researcher',
      component: require('@/components/ResearcherView/HomeResearcher').default
    },
    {
      path: '/experimentSetup',
      name: 'experiment-setup',
      component: require('@/components/ResearcherView/ExperimentSetup').default
    }
  ]
})
