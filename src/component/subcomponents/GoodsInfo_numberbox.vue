<template>
    <!-- 
        我们不知道什么时候拿到max值 但是 总归有一刻 会得到一个真正的 max 值 
        我们可以使用watch 属性监听 来监听 父组件传递过来的 max值 不管watch会触发多少次 但是 
        最后一次 指定会获取一个合法的 max 值
    -->
    <div>
        <div class="mui-numbox" data-numbox-min="1">
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox">
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>
    <!-- 子组件什么时候把数据传递给父组件 -->
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'

export default {
    mounted() {
        //初始化数字选择框组件
        mui('.mui-munbox').numbox();
        //console.log(this.max);
    },
    methods: {
        countChanged(){
            //每当文本框的数据发生改变的时候 立即把改变的数据 通过事件调用 传递给父组件
            //console.log(this.$refs.numbox.value); 
            this.$emit('getcount',parseInt(this.$refs.numbox.value));
        }
    },
    props: ['max'],
    watch: {
        'max':function(newVal,oldVal) {
            //使用 JS api 设置numbox 的最大值
            mui(".mui-numbox").numbox().setOption("max",newVal)
        }  
    }
}
</script>

<style lang="scss" scoped>

</style>
