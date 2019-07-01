
//入口文件

import Vue from "vue"

// 1.1 导入路由的包
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入 MUI 的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//按需导入 Mint-ui 中组件
import 'mint-ui/lib/style.css'
import {Header,Swipe,SwipeItem} from 'mint-ui'  
Vue.component(Header.name,Header)
Vue.component(Swipe.name,Swipe)
Vue.component(SwipeItem.name,SwipeItem)

// 1.3 导入自己的 router.js 路由模块
import router from './router'

//导入格式时间的插件
import moment from 'moment'

//定义全局过滤器
Vue.filter('dataFormat',function (dataStr,pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})

// 2.1 导入 vue-resource  安装 vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

// 设置请求的根路径
Vue.http.options.root = "http://localhost:8018"

// 导入 app 根组件
import app from './app.vue'

var vm = new Vue({
    el:'#app',
    render:c => c(app),
    router //1.4 挂载路由对象到VM实例上
})
