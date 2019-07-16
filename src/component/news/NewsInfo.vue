<template>
    <!-- <div class="newsinfo-container">
        <h3 class="title">{{ newsinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间: {{ newsinfo.add_time | dateFormat }}</span>
            <span>点击: {{ newsinfo.click }}次</span>        
        </p>
        <hr>
        <div class="content">
            {{ newsinfo.content }}
        </div>
    </div> -->

    <div class="newsinfo-container">
        <h3 class="title">网易云热门评论 -- {{id}}</h3>
        <p class="subtitle">
            <span>发表时间: 2019-07-01 14:30:01</span>
            <span>点击: 1000次</span>        
        </p>
        <hr>
        <div class="content">
            <p>仿佛一下子回到了90年代的夏天，你光着上身，穿着大裤衩，一双简单的人字拖，摇着一把破旧的芭蕉扇，VCD里转动着盗版的碟片，满满都是广东香港泛滥到内地的流行歌曲和港片，手里的冰激凌在融化，碟片偶尔会卡，你拿起遥控摁了一下快进键，一下子就这么快进了十几年</p>
            <p>一开始觉得 “豢养” 这个词用的特别不好，感觉只有饲养猪牛之类的才会用豢养，后来偶然翻书看到这么一段：“ 金鲫始于钱塘，惟六和寺有之，未若今之盛。南渡驻驿，王公贵人园池竞建，豢养之法出焉------戴埴 《临安金鱼》。 这才感觉到陈绮贞这词用的别致精巧</p>
            <p>我是一个不矜持的女生 从得知你要北美巡演 想尽办法联系了主办方 申请了每个城市的志愿者 然后就每天按时上课 为了方便去你的演唱会 揣着两个月的期盼 结果团队有人没签过你就不来了 你你你不负责 给你背回去的核桃啤酒在麒麟琴行 记得喝酒</p>
            <p>第二天有个很重要的考试，却被她一句我好怕坐了五个小时的火车去她的城市看她，疯了一样冲进她的出租屋，看见她一个人坐在床上，我从后面抱住她，对她说别怕，她突然大声说5个小时，牛不牛逼，我转过身，看见身后多出来的那些人笑着对她说牛逼，愿赌服输，这顿饭我们请，我想这是我和她最后一次见面了</p>
            <p>超级喜欢汽水 喜欢你弹尤克里里享受的表情 喜欢你的声音喜欢你的白山茶 羡慕你和佳利盈妹妹的友情 喜欢你面对黑粉面带笑容抵回去 看着你和三儿幸福 你在闹他在笑 都让我感觉我就是喜欢这个女孩 这个叫陈雪凝的女孩 所有我都好喜欢 想努力成为你的样子 加油我的汽水妹 会一直一直喜欢你</p>
            <p>最痞的同学做了老师 最老实的同学成了痞子 最花心的学姐成了全职妈妈 最美好的初恋座了酒吧前台 最抠门的穷小子当上了酒店老板 最慷慨的朋友在建筑队里干活 这个世界就是那么的莫名其妙</p>
            <p>周国平在《风中的纸屑》里的一段话：我天性不宜交际。在多数场合，我不是觉得对方乏味，就是害怕对方觉得我乏味。可是我既不愿忍受对方的乏味，也不愿费劲使自己显得有趣，那都太累了。我独处时最轻松，因为我不觉得自己乏味，即使乏味，也自己承受，不累及他人。</p>
        </div>
        <!-- 评论子组件 -->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import comment from '../subcomponents/Comment.vue'

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
    },
    components:{
        'comment-box':comment
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
            p{
                word-break:break-all;
            }
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
