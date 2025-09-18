import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import NewYearCountdown from './views/NewYearCountdown.vue'
import SummerCountdown from './views/SummerCountdown.vue'

const routes = [
  { path: '/', redirect: '/new-year' },
  { path: '/new-year', component: NewYearCountdown },
  { path: '/summer', component: SummerCountdown }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
