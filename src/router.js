
import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './component/tabbar/HomeContainer.vue'
import MemberContainer from './component/tabbar/MemberContainer.vue'
import ShopcarContainer from './component/tabbar/ShopcarContainer.vue'
import SearchContainer from './component/tabbar/SearchContainer.vue'
import NewsList from './component/news/NewsList.vue'
import NewsInfo from './component/news/NewsInfo.vue'
import PhotoList from './component/photos/PhotoList.vue'
import PhotoInfo from './component/photos/PhotoInfo.vue'

// 1.3 创建路由对象 
var router = new VueRouter({
    routes:[//路由配置规则
        {path:'/',redirect: '/home'},
        {path:'/home',component:HomeContainer},
        {path:'/member',component:MemberContainer},
        {path:'/shopcar',component:ShopcarContainer},
        {path:'/search',component:SearchContainer},
        {path:'/home/newslist',component:NewsList},
        {path:'/home/newsinfo/:id',component:NewsInfo},
        {path:'/home/photolist',component:PhotoList},
        {path:'/home/photoInfo/:id',component:PhotoInfo}
    ],
    linkActiveClass:'mui-active'//覆盖默认的路由高亮的类 默认的类叫做 router-link-active
})
// 把路由对象暴露出去
export default router