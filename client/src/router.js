// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from './pages/Login.vue';
import Signup from './pages/Signup.vue';
import Home from './pages/Home.vue';
import Dashboard from './pages/Dashboard.vue';
import DefaultLayout from './components/Layout/Defualt.vue';
import GuestLayout from './components/Layout/Guest.vue';
import NotFound from './pages/NotFound.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '/', 
      components: {
        main: Dashboard, 
      }
    },
      { path: '/dashboard', 
      components: {
        main: Dashboard, 
      },
    },
    ],
  },
  {
    path: '/',
    component: GuestLayout,
    children: [
      { path: '/login', 
      components: {
        main: Login, 
      }
    },
      { path: '/signup', 
      components: {
        main: Signup, 
      }
     },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
