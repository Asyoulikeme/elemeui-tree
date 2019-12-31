import Vue from 'vue';
import VueRouter from 'vue-router';
import ModuleConfig from '../components/ModuleConfig';
import InterfaceConfig from '../components/InterfaceConfig'
import App from '../App';
Vue.use(VueRouter);

const routes = [
  {
    path:'/ModuleConfig/:index',
    name:'ModuleConfig',
    component:ModuleConfig,
    children:[
      {
        path:'InterfaceConfig',
        name:'InterfaceConfig',
        component:InterfaceConfig

      }
    ]
  }
];

const router = new VueRouter({
  mode:'history',
  routes
});

export default router;

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

