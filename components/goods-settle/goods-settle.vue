<template>
	<view class="settle-container">
		<!-- 全选 -->
		<label class="radio" @click="changeAll">
			<radio color="#c00000" :checked="checkState" /><text>全选</text>
		</label>
		<!-- 合计 -->
		<view class="amount-box">
			合计:<text class="amount">￥{{checkGoodsAmount}}</text>
		</view>
		
		<!-- 结算按钮 -->
		<view class="btn-settle">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default {
		name:"goods-settle",
		data() {
			return {
				checkState: this.isFullCheck
			};
		},
		computed:{
			...mapGetters('cartModule',['total','cartIsCheck','checkedCount','checkGoodsAmount']),
			isFullCheck(){
				return this.total === this.cartIsCheck
			}
		},
		watch:{
			isFullCheck:{
				handler(newVal){
					this.checkState=newVal
				},
				immediate:true 
			}
		},
		methods:{
			...mapMutations('cartModule',['updateAllGoodsState']),
			// 全选或全部不选
			changeAll(){
				// !this.isFullCheck:表示进行反选，全选取反全不选；全不选取反全选
				this.updateAllGoodsState(!this.isFullCheck)
			}
		}
	}
</script>

<style lang="scss" >
.settle-container{
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 999;
	height: 50px;
	width: 100%;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 14px;
	padding-left: 5px;
	border-top: 1px solid #efefef;
	.radio{
		display: flex;
		align-items: center;
	}
	.amount-box{
		.amount{
			color: #c00000;
			font-weight: bold;
		}
	}
	.btn-settle{
		background-color: #c00000;
		color: #fff;
		height: 40px;
		line-height: 40px;
		padding: 0 10px;
		margin-right: 8px;
		border-radius: 10px;
		min-width: 80px;
		text-align: center;
	}
}
</style>