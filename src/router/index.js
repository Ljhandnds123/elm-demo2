import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

import goods from '../components/content/goods/goods';
import seller from '../components/content/seller';
import ratings from '../components/content/ratings';

export default new Router({
  linkActiveClass : 'active',
  routes: [
    {
         path:'/goods' , components:{default:goods}
    },
    {
         path:'/seller', components:{default:seller}
    },
    {
         path:'/ratings',components:{default:ratings}
    },
    {
    	path:'*',redirect:'/goods'
    }
  ]
})


