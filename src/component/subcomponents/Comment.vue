<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要BB的内容(最多吐槽150个字)" maxlength="150" v-model="something"></textarea>

        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <!-- <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户: {{ item.user_name }} &nbsp;&nbsp; 发表时间: {{ item.add_time }}
                </div>
                <div class="cmt-body">
                    {{ item.content == "undefined" ? "此用户很懒,啥都没说":item.content}}
                    纵使你满身污秽如刺猬，我扔伸手相拥毫无忌讳
                </div>
            </div> 
        </div> -->

        <div class="cmt-list">
            <div class="cmt-item">
                <div class="cmt-title">
                    第1楼&nbsp;&nbsp;用户: 匿名用户 &nbsp;&nbsp; 发表时间: 2019-07-01 12:12:12
                </div>
                <div class="cmt-body">
                    纵使你满身污秽如刺猬，我扔伸手相拥毫无忌讳
                </div>
            </div> 
        </div>

        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
    data() {
        return {
            pageIndex:1, //默认第一页数据
            comments:[], //所有的评论数据,
            msg:''
        }
    },
    created(){
        //this.getComments()
    },
    methods: {
        getComments(){
            this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then( result => {
                if(result.body.status === 0){
                    //this.comments = result.body.message
                    //每次获取新的评论数据的时候 不要把老数据情况重置 而是以老数据,拼接上新数据
                    this.comments = this.comments.concat(result.body.message)
                }else{
                    Toast("获取评论数据失败!")
                }
            })
        },
        getMore(){
            this.pageIndex++;
            this.getComments();
        },
        postComment(){
            if(this.msg.trim().length === 0){
                Toast("评论内容不能为空!")
            }
            //发表评论
            // post 参数1:请求的URL地址  
            //      参数2:提交给服务器的数据对象(content:this.msg)
            //      参数3:定义提交时候,表单中数据的格式 { emulateJSON.true } 
            this.$http.post('api/postcomment/'+this.$route.params.id,{
                context:this.msg.trim()
            })
            .then(function(result){
                if(result.body.status === 0){
                    // 1.拼接处一个评论对象
                    var cmt = {
                        user_name:'匿名用户',
                        add_time:Date.now(),
                        context:this.msg.trim()
                    };
                    this.comments.unshift(cmt)
                    this.msg = ""
                }
            })
        }
    },
    props:["id"]
}
</script>

<style lang="scss" scoped>
    .cmt-container{
        h3{
            font-size: 18px;
        }
        textarea{
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
        .cmt-list{
            margin:5px 0px;
            .cmt-item{
                font-size: 13px;
                .cmt-title{
                    background-color: #ccc;
                    line-height: 30px;
                }
                .cmt-body{
                    text-indent: 2em;
                    line-height: 30px;
                }
            }
        }
    }
</style>
