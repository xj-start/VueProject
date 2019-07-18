<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间: {{ photoinfo.add_time | dataFormat }}</span>
            <span>点击: {{ photoinfo.click }}次</span>
        </p>

        <hr>
        <!-- 缩略图区域 -->
        <!-- <img class="preview-img" v-for="(item,index) in list" :src="item.src" height="100" @click="$preview.open(index,list)" :key="item.src"> -->
        <vue-preview :slides="slide1" @close="handleClose" class="thumbImg"></vue-preview>

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 放置一个现成的评论子组件 -->
        <!-- <cmt-box :id="id"></cmt-box> -->
        <cmt-box></cmt-box>
    </div>
</template>

<script>
//导入评论子组件
import comment from '../subcomponents/Comment.vue'
export default {
    data() {
        return {
            id:this.$route.params.id,
            photoinfo:[],
            slide1: [
            {
                src: 'http://images.jiayuan.com/w4/global/cms/uploadfile/2012/0625/20120625095216935.jpg',
                msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
                alt: 'picture1',
                title: 'Image Caption 1',
                w: 600,
                h: 400
            },
            {
                src: 'http://images.jiayuan.com/w4/global/cms/uploadfile/2012/1029/20121029021849357.jpg',
                msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
                alt: 'picture2',
                title: 'Image Caption 2',
                w: 600,
                h: 400
            }
            ]
        }
    },
    created () {
        this.getPhotoInfo()
    },
    methods: {
        getPhotoInfo(){
            //获取图片的详情
            this.$http.get("data/getimageInfo.json").then(result => {
                if(result.body.status === 0){
                    this.photoinfo = result.body.message[0]
                }
            })
        },
        handleClose () {
            console.log('close event')
        }
    },
    components:{//注册评论子组件
        'cmt-box':comment
    }
}
</script>

<style lang="scss" >
    .photoinfo-container{
        padding: 3px;
        h3{
            color: #26A2FF;
            font-size: 15px;
            text-align: center;
            margin: 15px 0px;
        }
        .subtitle{
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }
        .content{
            font-size: 13px;
            line-height: 30px;
        }
    }
    .thumbImg{
        padding: 5px;
        figure[itemprop="associatedMedia"]{
            display: inline-block;
            margin: 0px;
            margin-right: 10px;
        }
        img[alt*="picture"]{
            width: 100px!important;
        }
    }
</style>
