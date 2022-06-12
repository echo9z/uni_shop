<template>
	<view class="my-userinfo-container">
		<!-- 头像和昵称区域 -->
		<view class="top-box">
			<image :src="userInfo.avatarUrl" class="avatar" ></image>
			<view class="nickname">{{userInfo.nickName}}</view>
		</view>
		
		<!-- 面板区域 -->
		<view class="panel-list">
			<view class="panel-info">
				<view class="panel-body">
					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>8</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>18</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>84</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
			
			<!-- 第二个面板 -->
			<view class="panel-info">
				<view class="panel-title">
					我的订单
				</view>
				<view class="panel-body">
					<view class="panel-item">
						<image src="/static/my-icons/icon1.png" class="icon"></image>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon2.png" class="icon"></image>
						<text>待付货</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon3.png" class="icon"></image>
						<text>退款/退货</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon4.png" class="icon"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
		
			<!-- 第三个面板 -->
			<view class="panel-info">
				<view class="panel-list-item">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		name:"userinfo",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('userModule',['userInfo'])
		},
		methods:{
			...mapMutations('userModule',['removeAddressStorage','removeUserInfoStorage','removeUserTokenStorage']),
			// 退出登录
			async logout(){
				// 调用wx.showModal(Object object)显示模态对话框
				const [err, succ] = await uni.showModal({
					title: '提示',
					content: '确认退出登录吗？'
				}).catch(err => err)
				
				// 点击确认 succ对象存在同时，confirm为true
				if(succ && succ.confirm){
					console.log('用户点击确定')
					// 本地 清空收货地址，token，userinfo
					this.removeAddressStorage()
					this.removeUserInfoStorage()
					this.removeUserTokenStorage()
				}
			}
		}
	}
</script>

<style lang="scss">
.my-userinfo-container{
	height: 100vh;
	background-color: #f4f4f4;
	// 用户头像 和 昵称区域
	.top-box{
		height: 400rpx;
		background-color: #c00000;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.avatar{
			width: 90px;
			height: 90px;
			border-radius: 45px;
			border: solid 2px #fff;
			box-shadow: 0px 1px 5px black;
		}
		.nickname{
			font-size: 16px;
			color: #fff;
			font-weight: bold;
			margin-top: 10px;
		}
	}
	// 整个panel面板
	.panel-list{
		padding: 0 10px;
		position: relative;
		top: -10px;
		.panel-info{ //每个panel面板
			background-color: #fff;
			border-radius: 3px;
			margin-bottom: 10px;
			
			.panel-body{
				display: flex;
				justify-content: space-around;
				.panel-item{
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;
					padding: 10px 0;
					font-size: 13px;
					
					.icon{
						width: 35px;
						height: 35px;
					}
				}
			}
			// 第二面板标题
			.panel-title{
				font-size: 15px;
				padding: 10px;
				border-bottom: 1px solid #f4f4f4;
			}
			// 第三个面板
			.panel-list-item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 15px;
				padding: 0 10px;
				line-height: 45px;
			}
		}
	}
}
</style>