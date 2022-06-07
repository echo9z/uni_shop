<template>
	<view>
		<view class="good-item">
			<!-- 商品左侧图片 -->
			<view class="good-item-left">
				<image :src="good.goods_small_logo|| defaultPic" mode=""></image>
			</view>
			<!-- 商品右侧图片 -->
			<view class="good-item-right">
				<view class="good-title">{{good.goods_name}}</view>
				<!-- 商品价格 -->
				<view class="good-info">
					<view class="good-price">￥{{good.goods_price|toFixed}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"good-item",
		props:{
			good:{
				type:Object,
				default: ''
			}
		},
		data() {
			return {
				//使用默认的图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		filters:{
			//添加过滤器，对数字后添加两位小数点
			toFixed(num){
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
.good-item{
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #f0f0f0;
	.good-item-left{ // 图片左侧
		margin-right: 5px;
		image{
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	.good-item-right{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.good-title {
			font-size: 13px;
		}
		.good-price {
			font-size: 16px;
			color: #c00000;
		}
	}
}
</style>