<template>
    <div class="goods-list">
        <!-- <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/'+item.id">
            <img :src="item.img_url" alt="">
            <h1 class="goods-title">{{ item.title }}</h1>
            <div class="goods-info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price  }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩下{{ item.stock_quantity }}台</span>
                </p>
            </div>
        </router-link> -->

        <!-- 在网页中，有两种方式跳转页面
        1. a 标签 的 href=""
        2. 使用window.location.href的形式 叫做 编程式导航 -->

        <div class="goods-item" v-for="(item,i) in goodslist" :key="i" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="goods-title">{{ item.title }}</h1>
            <div class="goods-info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price  }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩下{{ item.stock_quantity }}台</span>
                </p>
            </div>
        </div> 

        <!-- 加载更多 -->
        <mt-button type="danger" size="large" @click="getMore()">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data() {
        // 自己组件挂载的一些私有数据
        return {
            // id:this.$route.params.id,
            pageindex:1, //分页的页数
            goodslist:[] //存放商品列表的数组
        }
    },
    created () {
        this.getGoodsList();  
    },
    methods: {
        getGoodsList(){
            //获取商品列表
            // this.$http.get("api/getgoodslist?pageindex="+this.pageindex).then(result => {
            this.$http.get("data/getgoods.json").then(result => {
                if(result.body.status === 0){
                    //this.goodslist = result.body.message
                    this.goodslist = this.goodslist.concat(result.body.message);
                }
            })
        },
        getMore(){
            this.pageindex++;
            this.getGoodsList();
        },
        goDetail(id){
            //使用js的形式进行路由导航
            // 注意 一定要区分 $route 和 ￥router 这两个对象
            // 其中 this.$route 是路由[参数对象]，所有路由中的参数，params,query都属于它
            // 其中 this.$router 是一个路由[导航对象]，用它可以方便 使用JS代码,实现路由的前进后退，跳转到新的 URL 地址

            // 1. 最简单地
            //this.$router.push("/home/goodsinfo/"+id);

            // 2. 传递对象
            //this.$router.push({path:"/home/goodsinfo/"+id})

            // 3. 传递一个命名的路由
            this.$router.push({name:"goodsinfo",params:{id}})
        }
    },
}
</script>

<style lang="scss" scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        padding: 6px;
        justify-content: space-between;
        .goods-item{
            width:49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin:3px 0px;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 233px;
            img{
                width: 100%;
            }
            .goods-title{
                font-size: 14px;
            }
            .goods-info{
                background-color: #eee;
                p{
                    margin: 0;
                    padding: 0;
                }
                .price{
                    .now{
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }  
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }
            }
        }
    }
</style>
