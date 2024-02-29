import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: () => import( '@/modules/common/layouts/GenericLayout.vue' ),
      children: [
        {
          path: 'home',
          name: 'home',
          component: HomeView
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/AboutView.vue')
        },
        {
          path: '',
          redirect: { name: 'home' },
        }
      ],
      meta: {
        requiresAuth: true,
      },
    },
    
    {
      path: '/auth',
      name: 'auth',
      component: () => import( '@/modules/auth/layout/AuthLayout.vue'),
      children: [
        {
          path: 'singin',
          name: 'singin',
          component: () => import('@/modules/auth/pages/SingInPage.vue'),
        },
        {
          path: 'singup',
          name: 'singup',
          component: () => import('@/modules/auth/pages/SingUpPage.vue'),
        },
        {
          path: '',
          redirect: { name: 'singin' },
        }
      ],
    }
  ]
})

const getCurrenteUser = () => {
  return new Promise( (resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      user => {
        unsubscribe()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if( to.matched.some( record => record.meta.requiresAuth ) ){
    // Si el usuario no esta autenticado lo redirigimos a la pagina de autenticacion 
    await getCurrenteUser() ? next() : next('/auth/singin')
  } else {
    // Si el usuario esta autenticado y quiere ir a la pagina de autenticacion lo redirigimos al home
    (await getCurrenteUser() && to.path.includes('/auth')) ? next('/') : next()
  }
})


export default router
