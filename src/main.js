
//入口文件
console.log('OK');

import Vue from "vue"

//导入 MUI 的样式
import './lib/mui/css/mui.min.css'

//按需导入 Mint-ui 中组件
import 'mint-ui/lib/style.css'
import {Header} from 'mint-ui'
Vue.component(Header.name,Header)

// 导入 app 根组件
import app from './app.vue'

var vm = new Vue({
    el:'#app',
    render:c => c(app)
})
