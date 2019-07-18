<template>
    <div class="goodsinfo-container">
        <!-- 购物车小球 -->
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
		</div>
        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价: <del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价: <span class="now_price">
                            ￥{{ goodsinfo.sell_price }}
                        </span>
                    </p>
                    <p class="number">购买数量: <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                        <!--
                            分析 如何实现加入购物车的时候 拿到选择的数量
                            1. 经过分析发现 按钮属于 goodsinfo 页面 数字属于 numberbox组件
                            2. 由于涉及了父子组件的嵌套 所有无法直接在goodsinfo页面中 获取到 选中的数量值
                            3. 涉及到了 子组件向父组件传值(事件调用机制)
                            4. 事件调用本质 父向子传递方法 子调用这个方法 同时把 数据当做参数 传递给这个方法
                        -->
                    </p>
                </div>
            </div>
		</div>
        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数 </div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号: {{ goodsinfo.goods_no }}</p>
                    <p>库存情况: {{ goodsinfo.stock_quantity }}个</p>
                    <p>上架时间: {{ goodsinfo.add_time | dataFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
		</div>
    </div>
</template>

<script>
import swiper from '../subcomponents/Swiper.vue'
import numbox from '../subcomponents/GoodsInfo_numberbox.vue'

export default {
    data() {
        return {
            id:this.$route.params.id, //将路由参数对象中 id 挂载到 data 方便后期调用
            lunbotu:[], //轮播图数据
            goodsinfo:[], //获取到的商品信息
            ballFlag:false,//控制小球显示和隐藏
            selectedCount:1 //获取用户选中的商品数量，默认为1

        } 
    },
    created () {
        this.getLunbotu()
        this.getGoodsInfo()
    },
    methods: {
        getLunbotu(){
            // this.$http.get("data/getthumimages/"+this.id).then(result => {
            this.$http.get("data/getthumimages.json").then(result => {
                if(result.body.status === 0){
                    // 先循环轮播图的每一项，为item添加img属性，因为轮播图组建中，只认识item.img 不认识item.src
                    result.body.message.forEach(item => {
                        item.img = item.src
                    });
                    this.lunbotu = result.body.message
                }
            })
        },
        getGoodsInfo(){
            //获取商品的信息
            // this.$http.get("api/goods/getInfo/"+item.id).then(result => {
            this.$http.get("data/getInfo.json").then(result => {
                if(result.body.status === 0){
                    this.goodsinfo = result.body.message[0]
                }
            })
        },
        goDesc(id){
            //编程式跳转到 图文介绍页面
            this.$router.push({name:'goodsdesc',params:{id}})
        },
        goComment(id){
            //编程式跳转到 评论页面
            this.$router.push({name:'goodscomment',params:{id}})
        },
        addToShopCar(){
            //添加到购物车
            this.ballFlag = !this.ballFlag;
        },
        beforeEnter(el){
            el.style.transform="translate(0,0)"
        },
        enter(el,done){
            el.offsetWidth;
            //小球动画优化思路
            /* 
                1.先分析导致 动画 不准确的 本质原因 我们把 小球 最终 位移到的位置 已经局限在了某一分辨率
                滚动条为滑动的情况下
                2.只要分辨率和调试的时候不一样，或者 滚动条有一定的滚动距离之后，问题就出现了；
                3.因此，我们见过分析，得到结论，不能把位置的横纵坐标 直接写死了，而是应该根据不同情况下，动态的计算这个标准值
                4.解题思路 先得到 徽标的 横纵坐标 然后在得到小球的 横纵坐标 让y值 求差，x值也求差，得到的结果 就是横纵坐标要位移的距离
                5.如何获取 徽标和小球的 位置？？？ domObject.getBoundingClienRect()
            */
            
            //获取小球在页面中的位置 
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            const badgePosition = document.
            getElementById("badge")
            .getBoundingClientRect();
            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;
            console.log(xDist, yDist);

            el.style.transform=`translate(${xDist}px,${yDist}px)`;
            el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
            done()
        },
        afterEnter(el){
            this.ballFlag = false;
        },
        getSelectedCount(count){
            //当子组件把选中的数量 传递给父组件的时候 选中的值保存到 data上
            this.selectedCount = count
            console.log("父组件拿到的数据为:"+count);
        }
    },
    components:{
        swiper,
        numbox
    }
}
</script>

<style lang="scss" scoped>
    .goodsinfo-container{   
        background-color: #eee;
        overflow: hidden;
        .number>div{
            display: inline-block;
        }
        .now_price{
            color: red;
            font-size: 16px;
            font-weight: bold;
        }
        .mui-card-footer{
            display: block;
            button{
                margin: 15px 0px;
            }
        }
    }
    .ball{
        width: 15px;
        height: 15px; 
        position: absolute;
        z-index: 99;
        border-radius: 50%;
        background-color: red;
        top: 430px;
        left: 146px;
    }
</style>
