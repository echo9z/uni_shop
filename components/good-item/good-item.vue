<template>
	<view>
		<view class="good-item">
			<!-- 商品左侧图片 -->
			<view class="good-item-left">
				<!-- showRadio:看外界是否传入 -->
				<radio
				 :checked="goods.goods_state"
				 color="#C00000" 
					v-if="showRadio"
					@click="radioClickHandler"></radio>
				<image :src="goods.goods_small_logo|| defaultPic" mode=""></image>
			</view>
			<!-- 商品右侧图片 -->
			<view class="good-item-right">
				<view class="good-title">{{goods.goods_name}}</view>
				<!-- 商品信息价格 -->
				<view class="good-info">
					<view class="good-price">￥{{goods.goods_price|toFixed}}</view>
					<uni-number-box v-if="showNum" 
						:min="1" :max="999" 
					  :value="goods.goods_count" 
						class="good-num"
						@change="numChange"></uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"good-item",
		props:{
			goods:{
				type:Object,
				default: ''
			},
			showRadio:{
				type:Boolean,
				// 如果外界没有传showRadio值，默认值为false，则不展示radio标签
				default: false
			},
			showNum:{
				type: Boolean,
				// 如果外界没有传showNum值，默认值为false，则不展示uni-number-box 标签
				default: false
			}
		},
		data() {
			return {
				//使用默认的图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			}
		},
		methods:{
			// radio点击事件触发该函数
			radioClickHandler(){
				// console.log(e.target)
				// 触发父级的radio-change事件，修改store中cart模块对象goods.state属性
				this.$emit('radio-change',{
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			// 当uni-number-box 的数值发送变化时触发该函数
			numChange(value){
				this.$emit('num-change',{
					goods_id: this.goods.goods_id,
					goods_count: value
				})
			}
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
		display: flex;
		align-items: center;
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
		flex: 1; // 标题 和 商品信息各自占1份
		.good-title {
			font-size: 13px;
		}
		.good-info{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.good-price {
				font-size: 16px;
				color: #c00000;
			}
		}
		
	}
}
</style>