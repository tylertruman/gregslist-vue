import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/cars',
    name: 'Cars',
    component: loadPage('CarsPage')
  },
  {
    path: '/cars/:carId',
    name: 'Car',
    component: loadPage('CarPage')
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: loadPage('JobsPage')
  },
  {
    path: '/jobs/:jobId',
    name: 'Job',
    component: loadPage('JobPage')
  },
  {
    path: '/houses',
    name: 'Houses',
    component: loadPage('HousesPage')
  },
  {
    path: '/houses/:houseId',
    name: 'House',
    component: loadPage('HousePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
