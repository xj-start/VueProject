<template>
    <div class="newsinfo-container">
        <h3 class="title">{{ newsinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间: {{ newsinfo.add_time | dateFormat }}</span>
            <span>点击: {{ newsinfo.click }}次</span>        
        </p>
        <hr>
        <div class="content">
            {{ newsinfo.content }}
        </div>
    </div>
</template>

<script>
import { Toast } from 'mini-ui'

export default {
    data() {
        return {
            id:this.$route.params.id, //将url地址传递过来的id值 方便以后调用
            newsinfo:[]
        }
    },
    create(){
        this.getNewsInfo()
    },
    methods: {
        getNewsInfo(){//获取新闻资讯详情
            this.$http.get('data/newslist.jsop'+this.id).thin(result=>{
                if(result.body.status === 0){
                    this.newsinfo = result.body.message[0]
                }else{
                    Toast("获取新闻资讯失败!")
                }
            })
        }
    }
}
</script>

<style lang="scss">
    .newsinfo-container{
        padding:0 4px;
        .title{
            font-size: 16px;
            text-align: center;
            margin:15px 0px;
            color: red;
        }
        .subtitle{
            font-size: 13px;
            color: #226aff;
            display: flex;
            justify-content:space-between;
        }
        .content{
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
