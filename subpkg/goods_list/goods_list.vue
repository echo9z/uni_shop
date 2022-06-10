<template>
	<view>
		<view class="good-list">
			<!-- block不会渲染到页面中 -->
			<view v-for="(item,index) in goodsList" :key="index"
			@click="gotoDetail(item)">
				<good-item :goods="item"></good-item>
			</view>
		</view>
	</view>
</template>

<script>
	import {getGoodList} from '@/api/home.js'
	export default {
		data() {
			return {
				// 查询分页的参数对象
				queryObj:{
					query:'', // 查询关键词
					cid:'', // 分类ID
					pagenum: 1, // 页码索引，默认第一页
					pagesize: 10 // 每页长度，默认20条
				},
				// 商品列表数据
				goodsList:[],
				total: 0, //总数
				flag: false // 节流处理
				// //使用默认的图片
				// defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png', 
			};
		},
		onLoad(option) {
			// 通过wx中的onload钩子函数，通过option获取相关参数，存储到data数据
			this.queryObj.query = option.query|| '' //如果query不存在
			this.queryObj.cid = option.cid|| ''
			this.getGoodsList()
		},
		// wx 上拉触底，会触发onReachBottom函数
		async onReachBottom(){
			console.log('触发了下拉事件')
			if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total ) return uni.$showMsg('数据加载完毕！')
			if(this.flag) return // 如果节流阀为true，还处于数据请求阶段直接返回
			
			this.flag = true
			this.queryObj.pagenum++
			// 调用加载商品列表数据
			this.getGoodsList()
			// console.log(...res.message.goods)
		},
		
		// 页面的下拉刷新事件
		onPullDownRefresh() {
			// 重置相关数据
			this.queryObj.pagenum = 1
			this.total = 0
			this.flag = false
			this.goodsList = []
			// 传入一个回调函数，用于立即停止页面的下效果
			this.getGoodsList(()=> uni.stopPullDownRefresh())
		},
		methods:{
			// 获取商品的列表数据
			// cb 回调函数，用于立即停止页面的下效果
			async getGoodsList(cb){
				uni.showLoading({
					title:'数据加载中'
				})
				// const {data:res} = await getGoodList(this.queryObj)
				const {data:res} = await getGoodList(this.queryObj).finally(()=>{
					console.log('finally代码一定会被执行')
					this.flag = false
					uni.hideLoading()
					// 如果的回调函数存在，则执行cb函数
					cb && cb()
				})
				
				console.log(res)
				if(res.meta.status !== 200) return uni.$showMsg()
				// 存储数据
				// this.goodsList = res.message.goods
				this.goodsList.push(...res.message.goods)
				this.total = res.message.total
			},
			// 跳转至商品详细页
			gotoDetail(item){
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		}
	}
</script>

<style lang="scss">
.good-list{
	background-color: #fff;
	// .good-item{
	// 	display: flex;
	// 	padding: 10px 5px;
	// 	border-bottom: 1px solid #f0f0f0;
	// 	.good-item-left{ // 图片左侧
	// 		margin-right: 5px;
	// 		image{
	// 			width: 100px;
	// 			height: 100px;
	// 			display: block;
	// 		}
	// 	}
	// 	.good-item-right{
	// 		display: flex;
	// 		flex-direction: column;
	// 		justify-content: space-between;
	// 		.good-title {
	// 			font-size: 13px;
	// 		}
	// 		.good-price {
	// 			font-size: 16px;
	// 			color: #c00000;
	// 		}
	// 	}
	// }
}
</style>
