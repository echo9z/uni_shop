<template>
	<view  v-if="good_info.goods_name">
		<!-- 商品图片轮播 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in good_info.pics" :key="index">
				<!-- prview(index)传入的index是索引的第几张图片 -->
				<image :src="item.pics_big" mode="widthFix"
				 @click="prview(index)"></image>
			</swiper-item>
		</swiper>
		
		<!-- 商品信息 -->
		<view class="goods-info-box" >
			<!-- 价格 -->
			<view class="price">￥{{good_info.goods_price | price}}</view>
			<!-- 商品信息 -->
			<view class="goods-info-body">
				<view class="name">{{good_info.goods_name}}</view>
				<!-- 收藏 -->
				<view class="favl">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			
			<!-- 运费 -->
			<view class="yf">快递：免运费</view>
		</view>
		<!-- 商品的详情 -->
		<view class="goods-introduce-box">
			<rich-text :nodes="good_info.goods_introduce"></rich-text>
		</view>
		
		<!-- 商品底部按钮区域 -->
		<view class="good-nav-bar">
			<!-- 这里使用uni-ui的组件：https://uniapp.dcloud.io/component/uniui/uni-goods-nav.html#%E4%BB%8B%E7%BB%8D
					 fill控制左右按钮样式 
					 options左侧商品图标和店铺配置
					 buttonGroup右侧按钮配置
					@click是响应option中选项的点击事件
					@buttonClick是buttonGroup配置项的点击事件-->
			<uni-goods-nav :fill="true"  
				:options="options" 
				:buttonGroup="buttonGroup"  
				@click="onClick" 
				@buttonClick="buttonClick" />
		</view>
		
	</view>
	
</template>

<script>
	import {getGoodsInfo} from '@/api/home.js'
	export default {
		data() {
			return {
				// 商品详细对象
				good_info: {},
				goods_id: 0,
				options: [{
						icon: 'shop',
						text: '店铺',
					}, {
						icon: 'cart',
						text: '购物车',
						info: 2
					}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}]
			};
		},
		onLoad(options) {
			this.goods_id = options.goods_id
			this.getGoodInfo()
		},
		methods:{
			async getGoodInfo(){
				const {data:res} = await getGoodsInfo(this.goods_id)
				console.log(res)
				if(res.meta.status !== 200) return uni.$showMsg()
				// 解决图片与图片 直接的白色的小缝隙区域
				// 将html字符串中'<img' 全部替换为 '<img style="display: block;"'
				res.message.goods_introduce = res.message.goods_introduce
					.replace(/<img /g,'<img style="display:block;" ')
					.replace(/webp/g, 'jpg')
				this.good_info = res.message
			},
			// 点击图片触发图片预览效果
			prview(index){
				uni.previewImage({
					current: index, // 点击图片的索引位置
					// 通过map函数，过滤出每项的pics_big属性，返回一个数组
					urls: this.good_info.pics.map(item => item.pics_big)
				})
			},
		
			// 点击了店铺和购物车
			// 事件参数e 包含了点击按钮的相关信息
			onClick(e){
				console.log(e)
				if(e.content.icon === "cart"){
					// 切换到购物车页面
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
			// 右侧
			buttonClick(e){
				console.log(e)
			}
		},
		filters:{
			price(price){
				return Number(price).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
swiper{
	height: 700rpx;
	image{
		width: 100%;
		height: 100%;
	}
}
.goods-info-box{
	padding: 10px 0 10px 10px;
	.price{
		color: #c00000;
		font-size: 18px;
		margin: 10px 0;
	}
	.goods-info-body{
		display: flex;
		justify-content: space-between;
		// flex-direction: row;
		.name{
			display: inline-flex;
			justify-content: center;
			padding-right: 10px;
			font-size: 13px;
		}
		.favl{
			width: 120px;
			font-size: 12px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: gray;
			border-left: 1px solid #efefef;
		}
	}
	.yf{
		margin: 10px 0;
		font-size: 12px;
		color: gray;
	}
}
.good-nav-bar{
		position: sticky;
		bottom: 0;
		z-index: 999;
	}
</style>
