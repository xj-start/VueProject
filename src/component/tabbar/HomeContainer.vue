<template>
    <div>
        <!-- 轮播图 -->
        <mt-swipe :auto="4000"> 
            <mt-swipe-item v-for="item in lunbotuList" :key="item.url"> 
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'

export default {
    data() {
        return {
            lunbotuList:[] //保存轮播图的数组
        }
    },
    created () {
        this.getLunbotu()
    },
    methods: {
        getLunbotu(){
            //获取轮播图数据的方法
            this.$http.get("../../data/lunbotu.json").then(result => {
                if(result.body.status === 0){
                    //成功
                    this.lunbotuList = result.body.message
                }else{
                    //失败
                    Toast('加载轮播图失败了!')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .mint-swipe{
        height:240px;
        .mint-swipe-item{
            &:nth-child(1){
                background-color: #d9d9d9;    
            }
            &:nth-child(2){
                background-color: #ddd;    
            }
            &:nth-child(3){
                background-color: #999;    
            }
            img{
                width: 100%;
                height: 100%;
                border: 0;
            }
        }
    }
</style>