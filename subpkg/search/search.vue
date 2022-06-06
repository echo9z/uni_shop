<template>
	<view>
		<view class="search-box">
			<!-- 使用uni-ui 提供的搜索组件
				:focus="true"：输入框自动获取焦点
			  radius搜索框的圆角
				cancelButton取消右侧的文字按钮-->
			<uni-search-bar
			 :focus="true"
			 @input="inputEve"
			 :radius="100" 
			 v-model="keyword"
			 cancelButton="none"></uni-search-bar>
		</view>
		<!-- 搜索结果 如果搜索列表区域为空则展示搜索历史区域
		 -->
		<view class="sugg-list" v-if="searchResult.length !== 0">
			<view class="sugg-item" v-for="(item,index) in searchResult" :key="index"
				@click="gotoDetail(item.goods_id)"
			>
				<view class="good-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		
		<!-- 搜索历史记录 -->
		<view class="history-box" v-else>
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<!-- 清空按钮 -->
				<uni-icons type="trash" size="17" @click="clear"></uni-icons>
			</view>
			<!-- 搜索历史记录区域 -->
			<view class="history-list">
				<uni-tag v-for="(item,index) in histories" :key="index"
				:text="item" 
				@click="goHistory(item)"
				:circle="true"></uni-tag>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {getKeyword} from '@/api/home.js'
	export default {
		data() {
			return {
				// 延时器的 timerId
				timer: null,
				keyword: '', // 搜索关键词
				searchResult: [], // 搜索关键词列表
				historyList: ['a','b','liil'] // 搜索关键词的历史记录
			};
		},
		onLoad() {
			// 在加载搜索页面时，读取storeage中数据
			// 如果未从storeage中读取到数据，默认给个 []数据
			this.historyList = JSON.parse(uni.getStorageSync('keyword') || '[]')
		},
		methods:{
			// input输入事件的处理函数
			inputEve(e){ // 通过e获取到用户的输入内容
				// 字节防抖
				clearTimeout(this.timer)
				this.timer = setTimeout(async ()=>{ //在输入的时候，只在500毫秒内输出内容
					// console.log(e)
					this.keyword = e.trim()
					// 关键词为空，直接返回并清空 搜索关键词列表
					if(this.keyword.length === 0 ){
						return this.searchResult = []
					}
					const {data:res} = await getKeyword(this.keyword)
					if(res.meta.status !== 200) return uni.$showMsg()
					// console.log(res)
					this.searchResult = res.message
					// 同时将 用户输入的内容添加到数组中
					this.saveHistoryList()
				},500)
			},
			// 点击跳转至商品详细
			gotoDetail(goods_id){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?good_id='+ goods_id
				})
			},
			// 存储关键词的数组
			saveHistoryList(){
				// this.historyList.unshift(this.keyword)
				// 这里为什么没有使用unshift，而使用push原因是会造成数组的重排序
				// this.historyList.push(this.keyword)
				// 1.使用set集合对数据进行取重操作
				const set = new Set(this.historyList)
				// 2.如果是一个重复的元素，先删除对应keyword元素
				set.delete(this.keyword)
				// 3.在set集合的最后添加keyword元素
				set.add(this.keyword)
				// 4.再将set对象转化为 数组，通过from将对象转化为数组
				// console.log(set) // Set(5) {"a", "b", "liil", "cc", "ee"}
				// console.log(Array.from(set)) // ["a", "b", "liil", "cc", "ee"]
				this.historyList = Array.from(set)
				
				// 将用户的搜索记录持久化到本地，通过setStore()方法，将数据存储到本地
				uni.setStorageSync('keyword',JSON.stringify(this.historyList))
				
			},
			clear(){
				this.historyList = []
				uni.setStorageSync('keyword','[]')
			},
			goHistory(text){
				// 这里通过双向绑定，为搜索框进行重新赋值，同时触发搜错功能
				this.keyword = text
			}
		},
		computed:{
			histories(){
				// 为什么不用this.historyList.reverse()，而是先通过展开运算符在调用reverse
				// 原因是会影响的元数据historyList
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
.uni-searchbar{
	// 定义 uni-ui提供的搜索组件，修改提供组件的样式
	background-color: #C00000;
}
.search-box{// 将搜索的input框固定到最顶部
	position: sticky;
	top: 0;
	z-index: 999;
}

.sugg-list{
	padding: 0 15px;
	.sugg-item{
		font-size: 12px;
		padding: 12px 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #efefef;
		.good-name{
			white-space: nowrap; //不允许换行，单行文本
			overflow: hidden; // 溢出隐藏部分
			text-overflow: ellipsis; // 溢出文字部分用...替代
			margin-right: 3px;
		}
	}
}

.history-box{
	.history-title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 15px;
		height: 40px;
		font-size: 13px;
		border-bottom: 1px solid #efefef;
	}
	.history-list{
		display: flex;
		flex-wrap: wrap;
		margin-top: 10px;
		.uni-tag{
			display: inline-block;
			background-color: #cccccc;
			border: 1px solid #cccccc;
			color: #000;
			font-weight: 400;
			margin-left: 15px;
			margin-bottom: 10px;
			padding-left: 15px;
			padding-right: 15px;
		}
	}
}
</style>
