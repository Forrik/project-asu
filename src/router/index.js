import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Teachers from '../components/Teachers.vue'
import Specialties from '../components/Specialties.vue'
import Registration from '../components/Registration.vue'
import Login from '../components/Login.vue'
import Profile from '../components/Profile.vue'
import Test from '../components/Test.vue'


const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
      path: '/teachers',
      name: 'teachers',
      component: Teachers
    },
    {
      path: '/specialties',
      name: 'specialties',
      component: Specialties
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/profile/',
      name: 'profile',
      component: Profile
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },



  ]
})

export default router