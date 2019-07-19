<template>
    <div>
        <div class="mui-numbox" data-numbox-min="1" style="height:25px">
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number"  @change="countChanged" ref="numbox" :value="initcount">
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
        mui('.mui-numbox').numbox();
        //console.log(this.max);
    },
    methods: {
        countChanged(){
            // 数量改变了
            //console.log(this.$refs.numbox.value)
            this.$store.commit('updateGoodsInfo',{
                id:this.goodsid,
                count:this.$refs.numbox.value
            })
        }
    },
    props:['initcount','goodsid']
}
</script>

<style lang="scss" scoped>

</style>
