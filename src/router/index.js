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
import GraduationItem from '../components/GraduationItem.vue'
import MyTickets from '../components/MyTickets.vue'
import Tickets from '../components/Tickets.vue'
import {
  useUserStore
} from '@/stores/user'
import Forbidden from '../components/Forbidden.vue'




const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
      path: '/teachers',
      name: 'teachers',
      component: Teachers,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: '/specialties',
      name: 'specialties',
      component: Specialties,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/profile/',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/graduation',
      name: 'graduation',
      component: Graduation,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: '/graduation/:graduationId',
      name: 'graduationItem',
      component: GraduationItem,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFound,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/my-tickets',
      name: 'myTickets',
      component: MyTickets,
      meta: {
        requiresAuth: true,
        requiresStudent: true,
      },
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: Tickets,
      meta: {
        requiresAuth: true,
        requiresTeacher: true,
      },
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: Forbidden,
      meta: {
        requiresAuth: true,
      }
    }
  ]
})




router.beforeEach((to, from, next) => {
  const isAuthenticated = useUserStore().user.isAuthenticated
  const isAdmin = useUserStore().user.isAdmin
  const isTeacher = useUserStore().user.isTeacher
  const isStudent = useUserStore().user.isStudent

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({
      name: 'login'
    })
  } else if (to.meta.requiresStudent && !isStudent) {
    next({
      name: 'myTickets'
    })
  } else if (to.meta.requiresTeacher && !isTeacher) {
    next({
      name: 'tickets'
    })
  } else if (to.meta.requiresAdmin && !isAdmin) {
    next({
      name: 'specialties'
    })
  } else {
    next()
  }
})

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = useUserStore().user.isAuthenticated

//   if (to.name !== 'login' && !isAuthenticated) {
//     next({
//       name: 'login'
//     })
//   } else if (to.name === 'login' && isAuthenticated) {
//     next({
//       name: 'main'
//     })
//   } else {
//     next()
//   }
// })

export default router