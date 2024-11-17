import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import PostDetails from '../views/PostDetails.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/post/:id',
    name: 'PostDetails',
    component: PostDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
