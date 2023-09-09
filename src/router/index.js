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
import Graduation from '../components/Graduation.vue'
import NotFound from '../components/NotFound.vue'
import Main from '../components/Main.vue'



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
      path: '/graduation',
      name: 'graduation',
      component: Graduation
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFound
    },
    {
      path: '/',
      name: 'main',
      component: Main
    }



  ]
})

export default router