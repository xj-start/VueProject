<template>
  <div>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,i) in lunbotuList" :key="i">
        <img :src="item.img" alt>
      </mt-swipe-item>
    </mt-swipe>

    <!-- 九宫格 到 六宫格的改造 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../image/beauty.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../image/decorate.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../image/ktv.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../image/marry.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../image/pub.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../image/sport.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      lunbotuList: [] //保存轮播图的数组
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      //获取轮播图数据的方法
      this.$http.get("data/lunbotu.json").then(result => {
        if (result.body.status === 0) {
          //成功
          this.lunbotuList = result.body.message;
        } else {
          //失败
          Toast("加载轮播图失败了!");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 240px;
  .mint-swipe-item {
    &:nth-child(1) {
      background-color: #d9d9d9;
    }
    &:nth-child(2) {
      background-color: #ddd;
    }
    &:nth-child(3) {
      background-color: #999;
    }
    img {
      width: 100%;
      height: 100%;
      border: 0;
    }
  }
}

.mui-grid-view.mui-grid-9{
    background-color: #fff;
    img{
        width: 60px;
        height: 60px;
        border: 0px;
    }
    .mui-media-body{
        font-size: 13px;
    }
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: 0px;
}
</style>