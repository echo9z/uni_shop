<template>
	<view class="">
		<!-- 搜索按钮 -->
		<search @gotoClick="gotoSearch"></search>
		
		<view class="scroll-view-container">
			<!-- 左侧滑动区域 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: deviceWh +'px'}">
				<block v-for="(item,index) in cateList" :key="index">
					<view class="left-scoll-item" :class="{active: isActive === index}"
						@click="activeChanged(index)"
					>
						{{item.cat_name}}
					</view>
				</block>
			</scroll-view>
			
			<!-- 右侧滑动区域 -->
			<scroll-view class="right-scroll-view" scroll-y="true" :style="{height: deviceWh +'px'}"
				:scroll-top="scrollTop">
				<!-- 二级分类 -->
				<view class="cate-level2" v-for="(item2,index2) in cateLevel2" :key="index2">
					<!-- 二级标题 -->
					<view class="level2-title">/{{item2.cat_name}}/</view>
					<!-- 当前二级分类下的三级分类 -->
					<view class="cate-level3-list">
						<view class="cate-level3-item"
							v-for="(item3,index3) in item2.children" 
							:key="index3"
							@click="gotoGoodsList(item3)">
							<!-- 图片部分 -->
							<image :src="item3.cat_icon" mode=""></image>
							<!-- 文字部分 -->
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {getCateList} from '../../api/home.js'
	export default {
		data() {
			return {
				// 当前设备可用高度
				deviceWh: 0,
				cateList: [], // 分类列表的数据
				isActive: 0, // 默认激活第一项
				cateLevel2:[], // 二级分类
				scrollTop: 0 // 滚动条距离顶部的距离 0px 竖着方向滚动的距离
			};
		},
		onLoad(){
			// 通过uniapp的api uni.getSystemInfoSync()获取系统信息的同步接口
			const res = uni.getSystemInfoSync()
			// console.log(res)
			// 可用高度为 总页面高度 - (navbar高度 + tabbar高度 + search组件高度50)
			this.deviceWh = res.windowHeight - 50 // 将设备的可用高度，赋值这deviceWh，为scroll-view高度使用
			
			this.getCatesList()
		},
		methods:{
			// 获取分类列表的数据
			async getCatesList(){
				const {data:res} = await getCateList()
				if(res.meta.status !== 200) return uni.$showMsg()
				console.log(res)
				this.cateList = res.message
				// 第一次渲染，默认的二级分类数据 为第一个元素
				this.cateLevel2 = res.message[0].children
			},
			
			// 切换一级分类，当用户点击某一项时，修改action的值
			activeChanged(index){
				// 修改为点击的index项的值
				this.isActive = index
				this.cateLevel2 = this.cateList[index].children
				// 重置 右侧scroll-view的竖向滑动距离为0，但是每次赋值数据没有发生变化，所有赋值时是0 和 1的切换
				this.scrollTop = this.scrollTop == 0 ? 1 : 0
			},
			// 跳转到某个商品的列表页
			gotoGoodsList(good){
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid='+good.cat_id
				}) 
			},
			// 跳转到搜索页面
			gotoSearch(){
				// console.log('okok')
				// search组件触发事件，跳转到search页面
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
.scroll-view-container{
	display: flex;
	// 左边滑动块
	.left-scroll-view{
		width: 120px;
		.left-scoll-item{
			background-color: #f7f7f7;
			line-height: 60px;
			font-size: 12px;
			text-align: center;
			
			&.active{ // css中写法 .left-scoll-item, .active交集选择器
				background-color: #fff;
				position: relative;
				&::before{ //.left-scroll-view, .active ::before
					content: ' ';
					display: block;
					background-color: #C00000;
					width: 3px;
					height: 30px;
					position: absolute;
					left:0 ;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	}
	// 右边滑动块
	.right-scroll-view{
		background-color: #ffffff;
		.cate-level2{
			.level2-title{ //二级分类的标题
				font-size: 12px;
				font-weight: bold;
				text-align: center;
				padding: 15px 0;
			}
			// 二级分类下的 每个三级分类
			.cate-level3-list{
				display: flex;
				flex-wrap: wrap;
				.cate-level3-item{
					width: 33.33%; //一行放下三个 每个的item项都是33.33
					margin-bottom: 10px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					image {
						width: 60px;
						height: 60px;
					}
					text {
						font-size: 12px;
					}
				}
			}
		}
	}
	
}
</style>
