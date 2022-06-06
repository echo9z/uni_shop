<template>
	<view class="search-container" :style="{'background-color':bgcolor}"
	 @click="clickCompHandle">
		<view class="search-box" :style="{'border-radius':radius+'px'}">
			<!-- 搜索的小图标 -->
			<uni-icons type="search" size='17' ></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"search",
		// 根据父组件传递的值，进行修改搜索组件的圆角和组件的背景颜色
		props: {
			bgcolor:{
				type: String,
				default: '#C00000'
			},
			radius: {
				type: Number,
				default: 15 // 单位是15px
			}
		},
		data() {
			return {};
		},
		methods:{
			clickCompHandle(){
				console.log('===')
				// 触发父组件的监听事件自定义事件
				this.$emit('gotoClick')
			}
		}
	}
</script>

<style lang="scss">
.search-container{
	height: 50px;
	padding: 0 10px;
	// 这里就不需要在申明了，可通过props进行控制
	// background-color: #C00000;
	.search-box{
		background-color: #fff;
		height: 36px;
		width: 100%;
		// border-radius: 15px;
		display: flex;
		justify-content: center;
		align-items: center;
		.placeholder{
			font-size: 15px;
			margin-left: 5px;
		}
	}
}
</style>