
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
Vue.http.options.root = "http://192.168.0.185:8018"
// Vue.http.options.root = "http://192.168.1.105:8018"
// 全局设置 POST 时候表单的数据格式组织形式 application/x-www-form-urlencoded
Vue.http.options.emulateJson = true

// 导入 app 根组件
import app from './app.vue'

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//每次刚进入 网站 调用 main.js 在刚调用的时候 先从本地存储中 把 购物车的数量读出来 放到 store中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
    state:{
        //this.$store.state.'*'
        /*
            将购物车商品的数据 用一个数组存储起来 在car存储一些商品的对象 咱们可以暂时将这个商品对象
            设置成这个样子 {id:商品的id,count:商品的数量,price:商品的价格,seleted:true&false购物车开关}
        */
        car:car
    },
    mutations:{
        //this.$store.commit('方法的名称','按需传递唯一的参数')
        addToCar(state,goodsinfo){
            //console.log(state);
            //点击加入购物车 把商品信息 保存到store中的car上
            /**
             * 分析 1.如果购物车中 之前就已经有这个对应的商品 那么 只需要更新数量
             *      2. 如果没有 则直接把 商品数据 push 到 car中即可
             */

            //假设在购物车中没有找到对应的商品
            var flag = false
            
            state.car.some(item => {
                if(item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count)
                    //console.log(item.count)
                    flag = true
                    return true
                }
            })
            //如果最终 循环完毕 得到的flag还是false 则把商品数据直接 push 到 购物车中
            if(!flag){ 
                state.car.push(goodsinfo)
            }
            //当更新car 之后 把 car 数组 存储到 本地的 localStorage 中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsInfo(state,goodsinfo){
            //修改购物车商品的数量值
            state.car.some(item => {
                if(item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            //当修改商品的数量 把最新的购物车数据 保存到本地存储
            localStorage.setItem('car',JSON.stringify(state.car)) 
        },
        removeFormCat(state,id){
            //根据ID 从store 中的购物车删除对应的哪条商品数据
            state.car.some((item,i) => {
                if(item.id == id){
                    state.car.splice(i,1)
                    return true
                }
            })
            //当删除完毕后 把最新的购物车数据 同步 到本地存储
            localStorage.setItem('car',JSON.stringify(state.car)) 
        },
        updateGoodsSelected(state,info){
            state.car.some(item => {
                if(item.id == info.id){
                    item.selected = info.selected
                }
            })
            //把所有的购物车信息 同步到本地存储
            localStorage.setItem('car',JSON.stringify(state.car)) 
        }
    },
    getters:{
        // this.$store.getters.'*'
        // 相当于 计算属性 也相当于 filters
        getAllCount(state){
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            });
            return c
        },
        getGoodsCount(state){
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            });
            return o
        },
        getGoodsSelected(state){
            console.log(state.car)
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state){
            var o = {
                count:0,//勾选的数量
                amount:0 //勾选的总价
            }
            state.car.forEach(item => {
                if(item.selected){
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            })
            return o
        }
    }
})

var vm = new Vue({
    el:'#app',
    render:c => c(app),
    router, //1.4 挂载路由对象到VM实例上
    store // 挂载store 状态管理对象
})
