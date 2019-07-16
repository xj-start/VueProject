
//入口文件

import Vue from "vue"

// 1.1 导入路由的包
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入 MUI 的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//按需导入 Mint-ui 中组件
//import 'mint-ui/lib/style.css'
// import {Header,Swipe,SwipeItem,Button,Lazyload} from 'mint-ui'  

// Vue.component(Header.name,Header)
// Vue.component(Swipe.name,Swipe)
// Vue.component(SwipeItem.name,SwipeItem)
// Vue.component(Button.name,Button)
// Vue.use(Lazyload);
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
Vue.use(MintUI) 

//图片缩略图预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview,{
    mainClass: 'pswp--minimal--dark',
    barsSize: {top: 0, bottom: 0},
    captionEl: false,
    fullscreenEl: false,
    shareEl: false,
    bgOpacity: 0.85,
    tapToClose: true,
    tapToToggleControls: false
})

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
// 全局设置 POST 时候表单的数据格式组织形式 application/x-www-form-urlencoded
Vue.http.options.emulateJson = true

// 导入 app 根组件
import app from './app.vue'

var vm = new Vue({
    el:'#app',
    render:c => c(app),
    router //1.4 挂载路由对象到VM实例上
})
