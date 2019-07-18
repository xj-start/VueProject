<template>
    <div>
        <!-- 顶部滑动条 -->
        <div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted" data-scroll="1">
				<div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px);">
					<a :class="['mui-control-item',item.id ==0 ? 'mui-active':'']" v-for="item in cates" :key="item.id" @tap="getPhoneListByCateId(item.id)">
						{{ item.title }}
					</a>
				</div>
			</div>
		</div>
		<!-- 图片列表区域 -->
		<ul class="phone-list">
			<router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
				<img v-lazy="item.img_url">
				<div class="info">
					<h1 class="info-title">{{ item.title }}</h1>
					<div class="info-body">{{ item.zhaiyao }}</div>
				</div>
			</router-link>
		</ul>
    </div>
</template>

<script>
// 1.导入 mui 的js文件
import mui from '../../lib/mui/js/mui.min.js'
//document.addEventListener("touchstart",function(){console.log(123);});
//window.addEventListener('touchmove', fn, { passive: false })

export default {
    data() {
        return {
			cates:[], //所有的分类的列表数组
			list:[] //图片列表
        }
    },
    mounted () { //当组件中的DOM结构渲染好并放到了页面上，会执行这个钩子函数
        // 如果要操作元素，最好在mounted里面，因为，这里时候 DOM元素是最新的
        // 2. 初始化滑动控件
        mui.init();
        mui('.mui-scroll-wrapper').scroll({
          deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006 
        });
	},
	created () {
		this.getAllCategory();
		//默认进入页面，就主动请求 所有图片列表的数据
		this.getPhoneListByCateId(0); 
	},
    methods: {
        getAllCategory(){
			//获取所有的图片分类
			this.$http.get("data/getimgcategory.json").then(result => {
				console.log(result.body);
				if(result.body.status === 0){
					result.body.message.unshift({"title":"全部","id":0});
					this.cates = result.body.message;
				}
			})
		},
		getPhoneListByCateId(cateId){
			//根据分类id,获取图片列表
			// this.$http.get("data/getimages.json/"+cateId).then(result => {
				this.$http.get("data/getimages.json").then(result => {
				if (result.body.status === 0) {
					this.list = result.body.message;
				}
			})
		}
    },
}
</script>

<style lang="scss" scoped>
    *{
        touch-action: pan-y;
    }
	.phone-list{
		list-style: none;
		margin: 0px;
		padding: 10px;
		padding-bottom: 0px;
		li{
			background-color: #ccc;
			text-align: center;
			margin-bottom: 10px;
			box-shadow: 0 0 9px #999;
			position: relative;
			img{
				width: 100%;
				vertical-align: middle;
			}
			img[lazy="loading"]{
				width: 40px;
				height: 300px;
				margin: auto;
			}
			.info{
				color: #fff;
				text-align: left;
				position: absolute;
				bottom: 0px;
				width: 100%;
				background-color:rgba(0,0,0,0.4);
				max-height: 84px; 
				.info-title{
					font-size: 14px;
				}
				.info-body{
					font-size: 13px;
				}
			}
		}
	}
</style>
