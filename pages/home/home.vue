<template>
	<view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item  class="swiper-item" v-for="(item,index) in swiperList" :key="index" >
				<!-- 跳转至/subpkg/goods_detail/goods_detail页面 -->
				<navigator class="swiper-item" 
					:url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<image :src="item.image_src" mode="widthFix">
				</navigator>
			</swiper-item>
		</swiper>
		
		<!-- 分类导航 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navList" 
				:key="index"
				@click="clickHandle(item)"
			>
				<image :src="item.image_src" mode="aspectFit"></image>
			</view>
		</view>
		
		<!-- 楼层区域 -->
		<view class="floor-list">
			<!-- 楼层item项 -->
			<view class="floor-item" v-for="(item,index) in floorData" :key="index">
				<!-- 楼层标题 -->
				<image class="floor-title" :src="item.floor_title.image_src"></image>
			
				<!-- 楼层图片内容区域 -->
				<view class="floor-box">
					<!-- 左边的区域 -->
					<view class="floor-left">
						<image :src="item.product_list[0].image_src"
						 :style="{width: item.product_list[0].image_width + 'rpx'}"
						 mode="widthFix"></image>
					</view>
					
					<!-- 右边的区域 -->
					<view class="floor-right" >
						<view class="floor-right-item" 
							v-for="(item2,index2) in item.product_list" 
							:key="index2" v-if="index2 !== 0">
							<image :src="item2.image_src"
							 :style="{width: item2.image_width + 'rpx'}"
							 @click="goGoodsList(item2)"
							 mode="widthFix"></image>
							 
						</view>
					</view>
					
				</view>
			</view>
		</view>
	
	
	
	
	</view>
</template>

<script>
	import {getSwiperList,getNavList,getFloordata} from '../../api/home.js'
	export default {
		data() {
			return {
				swiperList:[], // 存储每个轮播图对象
				navList:[], // 分类导航的数据
				floorData:[]// 商品楼层数据列表
			};
		},
		// 小程序页面刚加载时触发
		onLoad() {
			this.getSwiperLists()
			this.getNavLists()
			this.getFloordatas()
		},
		methods:{
			// 获取轮播图数据
			async getSwiperLists(){
				const {data: res} = await getSwiperList()
				if(res.meta.status !== 200){
					// 请求失败，给出失败提示消息，将wx对象改为uni进行调用，因为是全局对象
					return uni.$showMsg()
				}
				// console.log(res)
				this.swiperList = res.message
			},
			
			// 获取首页分类选项数据
			async getNavLists(){
				const {data: res} = await getNavList()
				if(res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.message
			},
			
			// 根据点击name 跳转值对应的 tabbar页面
			clickHandle(item){
				if(item.name === '分类'){
					// 切换到 分类 页面
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			
			// 获取楼层数据
			async getFloordatas(){
				const {data: res} = await getFloordata()
				if(res.meta.status !== 200) return uni.$showMsg()
				// 处理数据，后台的数据navigator_url，将取出?query=胸针
				res.message.forEach(floor => {
					floor.product_list.forEach(product => {
						product.key_words = '/subpkg/goods_list/goods_list?' + product.navigator_url.split('?')[1] 
					})
					
				})
				this.floorData = res.message
			},
			// 跳转至商品列表页面
			goGoodsList(product){
				console.log(product.key_words)
				uni.navigateTo({
					url:product.key_words
				}) 
			}
		}
	}
</script>

<style lang="scss">
	swiper{
		height: 330rpx;
		.swiper-item image{
			width: 100%;
			height: 100%;
		}
	}

	.nav-list{
		display: flex;
		justify-content: space-between;
		margin: 30rpx;
		.nav-item image{
			width: 128rpx;
			height: 140rpx;
		}
	}
	
	.floor-list{
		// 楼层区域
		.floor-title{ // 楼层标题
			height: 60rpx;
			width: 100%;
		}

		.floor-box{ // 楼层内容图片
			display: flex;
			padding-left: 10rpx;
			// .floor-left image{
			// 	width: 232rpx;
			// }
			.floor-right{
				display: flex;
				flex-wrap: wrap; // 一行显示不下，允许换行
				justify-content: space-around;
			}
		}
	}

</style>
