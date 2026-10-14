import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/HomeView.vue'
import Movies from '../views/MoviesView.vue'
import Series from '../views/SeriesView.vue'
import MyList from '../views/MyListView.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'Movies',
    component: Movies
  },
  {
    path: '/series',
    name: 'Series',
    component: Series
  },
  {
    path: '/mylist',
    name: 'MyList',
    component: MyList
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
