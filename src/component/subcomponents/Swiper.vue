<template>
    <div>
        <!-- 轮播图 -->
        <!-- 将来我们使用轮播图组件，谁为我们传递 lunbotuList
        此时，lunbotulist 应该是 父组件向子组件传值来设置 -->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,i) in lunbotuList" :key="i">
                <img :src="item.img" alt="" :class="{'full':isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>

        <!-- 
            分析 为什么 商品评论中的 轮播图那么丑
            1. 首页中的图片 宽和高都是100%
            2. 在商品详情页面中，轮播图的图片，如果也使用 宽度为100%的话 页面不好看
            3. 商品详情页面的轮播图，期望，高度是100%，但是 宽度为自适应
            4. 经过分析 得到 问题的原因 首页中的轮播图和详情页面的轮播图 分歧点就是 宽度到底是100% 还是 自适应
            5. 既然这两个轮播图 其他方面 都是没有问题 只是宽度有问题 那么 我们定义一个属性 让轮播图
                的调用者 手动指定 是否为 100% 的宽度
        -->
</template>

<script>
export default {
    props: ["lunbotuList","isfull"]
}
</script>

<style lang="scss" scoped>
    .mint-swipe {
        height: 240px;
        .mint-swipe-item {
            text-align: center; 
            // &:nth-child(1) {
            //     background-color: #d9d9d9;
            // }
            // &:nth-child(2) {
            //     background-color: #ddd;
            // }
            // &:nth-child(3) {
            //     background-color: #999;
            // }
            img {
                //width: 100%;
                height: 100%;
                border: 0;
            }
        }
    }
    .full{
        width: 100%;
    }
</style>
