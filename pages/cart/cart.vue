<template>
	<view class="cart-container">
		<view class="cart-goods-container" v-if="cart.length !== 0">
			<!-- 商品收货地址组件 -->
			<goods-address></goods-address>
			
			<!-- 商品列表标题区域 -->
			<view class="cart-title">
				<!-- 左侧的图标 -->
				<uni-icons type="shop" size="18"></uni-icons>
				<!-- 右侧的文本 -->
				<text class="cart-title-text">购物车</text>
			</view>
			
			<!-- 商品的列表区域 -->
			<view class="cart-goods">
				<uni-swipe-action>
					<view v-for="(item,index) in cart" :key="index">
						<!-- 滑动块区域组件 
						@click 点击滑动块出行的按钮是触发点击事件
						@change 对包裹组件进行滑动时触发函数-->
						<uni-swipe-action-item >
							<goods-item :goods="item" :showRadio="true" :showNum="true"
								@radio-change="radioChangeHandler"
								@num-change="numChangHandler">
							</goods-item>
							
							<template v-slot:right>
								<view class="slot-button" @click="delCartGoods(item)">
								<text class="slot-button-text">删除</text>
							</view>
							
							</template>
						</uni-swipe-action-item>
					</view>
				</uni-swipe-action>
			</view>
			
			<!-- 商品结算组件 -->
			<goods-settle></goods-settle>
		</view>
		
		<!-- 空购物车展示页面 -->
		<view class="empty-cart" v-else>
			<image class="empty-img" src="/static/cart_empty@2x.png" mode=""></image>
			<text class="tip-text">空空如也</text>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	// 除了在cart页面中要使用，还需要在home、cate、my页面中使用
	import badgeMixin from '@/mixins/tabbar-badge.js'
	import goods from '@/components/good-item/good-item.vue'
	import address from '@/components/goods-address/goods-address.vue'
	
	export default {
		data() {
			return {
				// 滑块的文字配置项
				options:[{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				]
			};
		},
		mixins: [badgeMixin],
		computed:{
			...mapState('cartModule',['cart']),
		},
		components:{
			goodsItem:goods,
			goodsAddress:address
		},
		methods:{
			...mapMutations('cartModule',['updateGoodsState','updateGoodsCount','removeGoodsById','updateCart']),
			radioChangeHandler(e){// 子组件good-item传递的数据
				console.log(e)
				// 调用cartModule模块下updateGoodsState更新商品是否勾选状态
				this.updateGoodsState(e)
			},
			// 处理store中cart元素的goods_count购物车中
			numChangHandler(e){
				console.log(e)
				// 调用cartModule模块下updateGoodsCount更新商品件数
				this.updateGoodsCount(e)
			},
			change(){
				console.log('滑动我了')
			},
			delCartGoods(goods){
				console.log(goods)
				this.removeGoodsById(goods.goods_id)
			}
		}
		
		/*// 当cart购物车的页面显示时，执行该函数
		onShow() {
			// 设置某一项tabbar的右上角添加文本
			this.setBadge()
		},
		computed:{
			// 把cartModule模块中的 cart数据映射到当前页面中，作为计算属性使用
			// ...mapState('模块名称',['要映射的模块中state属性1','要映射的模块中state属性2'])
			// ...mapState('cartModule',['cart'])
			// 映射cart共享模块中，购物车被选中的总数量
			...mapGetters('cartModule',['cartIsCheck'])
		},
		methods:{
			setBadge(){
				// 调用微信小程序的wx.setTabBarBadge(Object object)为 tabBar 某一项的右上角添加文本参数
				uni.setTabBarBadge({
					index:2, // 索引2为 购物车
					text: this.cartIsCheck + '' //text类型必须是字符串
				})
			}
			
			click(){
				console.log(this.cart)
				// const cartM = this.$store.state.cartModule
				// console.log(cartM)
				// console.log(cartM.cart[0]) // 获取cart模块中cart的state数据
			}
		}*/
	}
</script>

<style lang="scss">
.cart-container{
	background-color: #fff; 
	.cart-goods-container{
		margin-bottom: 50px;
		.cart-title{
			height: 40px;
			display: flex;
			align-items: center;
			padding-left: 5px;
			border-bottom:1px solid #efefef;
			
			.cart-title-text{
				font-size: 14px;
				margin-left: 10px;
			}
		}

		.cart-goods{
			.slot-button {
				background-color: #C00000;
				display: flex;
				width: 140rpx;
				justify-content: center;
				align-items: center;
			}
			
			.slot-button-text {  
				color: #f0f0f0;  
				font-size: 14px;  
			}
		}
	}
	
	.empty-cart{
		// padding-top: 150px;
		height: 100vh;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		.empty-img {
			width: 90px;
			height: 90px;
		}
		.tip-text {
			font-size: 12px;
			color: gray;
			margin-top: 15px;
		}
	}
}

</style>
