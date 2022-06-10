<template>
	<view>
		<!-- 选中收货地址 address对象为空对象，则展示选择地址-->
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}' " >
			<button type="primary" size="mini"
			 class="btnChooseAddress"
			 @click="chooseAddress">请选择收货地址+</button>
		</view>
		<!-- 已添加的收货地址 -->
		<view class="address-info-box" v-else>
			<view class="row1">
				<view class="row1-left">
					<!-- 收货人 -->
					<view class="username">
						收货人：{{address.userName}}
					</view>
				</view>
				<view class="row1-right">
					<!-- 收货地址 -->
					<view class="phone">
						电话：{{address.telNumber}}
					</view>
					<uni-icons type="arrowright" size="16" @click="chooseAddress"></uni-icons>
				</view>
			</view>
			
			<view class="row2">
				<view class="row2-left">
					<!-- 收货地址 -->
					<view class="area">
						收货地址：
					</view>
				</view>
				<view class="row2-right">
					<!-- 收货地址 -->
					<view class="address">
						{{addstr}}
					</view>
				</view>
			</view>
		</view>
		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	import {mapState, mapMutations,mapGetters} from 'vuex'
	export default {
		name:"goods-address",
		data() {
			return {
				// address: {} // 获取到收货地址数据存放到store的user模块中
			};
		},
		computed:{
			...mapState('userModule',['address']),
			...mapGetters('userModule',['addstr'])
			// 收货地址计算属性，进行地址字符串拼接
			// addstr(){
			// 	if(!this.address.provinceName) return '' // 如果 省级地址为空直接返回
			// 	// 拼接 省，市，区，详细地址 的字符串并返回给用户
			// 	return `${this.address.provinceName} ${this.address.cityName} ${this.address.countyName}${this.address.detailInfo}`
			// }
		},
		methods:{
			...mapMutations('userModule', ['updateAddress']),
			// 选择收货地址
			async chooseAddress(){
				// 1.调用微信api wx.chooseAddress(Object object)获取用户收货地址。调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址。
				// 返回的是一个数组，第1个元素为错误对象，第2个元素为成功后的收货地址对象
				const [err, succ] = await uni.chooseAddress().catch(err => console.log(err))
				// console.log(await uni.chooseAddress())
				console.log(err)
				// 2.用户成功点击了收货地址，err为null succ.errMsg的对象为'chooseAddress:ok'
				if(err === null && succ.errMsg === 'chooseAddress:ok'){
					console.log(succ)
					// 赋值给data中地址对象
					// this.address = succ
					
					// 调用user模块将 收货地址数据存储到store中
					this.updateAddress(succ)
				}
			}
		}
	}
</script>

<style lang="scss">
.address-choose-box{
	height: 90px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.address-border{
	display: block;
	width: 100%;
	height: 5px;
}
.address-info-box{
	padding: 0 5px;
	font-size: 12px;
	height: 90px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	.row1{
		display: flex;
		justify-content: space-between;
		margin-bottom: 5px;

		.row1-right{
			display: flex;
		}
	}
	
	.row2{
		display: flex;
		align-items: center;
		justify-content: space-between;
		.row2-left{
			white-space: nowrap;
		}
	}
}
</style>