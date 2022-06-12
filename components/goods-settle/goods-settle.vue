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
		<view class="btn-settle" @click="settlement">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import {mapState,mapGetters,mapMutations} from 'vuex'
	import {createOrders,reqUnifiedorder,checkOrder} from '@/api/pay.js'
	// 模拟订单返回的数据
	// import {createOrder} from '@/simulation_data/pay.js' 
	
	export default {
		// 结算按钮组件
		name:"goods-settle",
		data() {
			return {
				checkState: this.isFullCheck,
				seconds: 3, // 倒计时跳转my 时间
				timeId: null // 定时器id
			};
		},
		computed:{
			...mapState('cartModule',['cart']),
			...mapGetters('cartModule',['total','cartIsCheck','checkedCount','checkGoodsAmount']),
			...mapState('userModule',['userToken']),
			...mapGetters('userModule',['addstr']),
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
			...mapMutations('userModule',['updateRedirctInfo']),
			// 全选或全部不选
			changeAll(){
				// !this.isFullCheck:表示进行反选，全选取反全不选；全不选取反全选
				this.updateAllGoodsState(!this.isFullCheck)
			},
			// 点击节点按钮触发结算逻辑
			async settlement(){
				// 判断是否勾选了要结算的商品、是否选择了收货地址、是否登录。
				if(!this.cartIsCheck) return uni.$showMsg('请选择购买的商品！') //cartIsCheck=0 取反为return true;
				
				if(!this.addstr) return uni.$showMsg('请选择收货地址！') //addstr为空
				
				// if(!this.userToken) return uni.$showMsg('请先登录！')
				if(!this.userToken) return this.delayNavigate()
				
				// 这里是后续结算逻辑
				console.log('后续结算逻辑')
				// 后续支付的接口需要真实token，这里的登录返回的token是 模拟的数据返回的假数据token，数据在simulation_data目录下
				this.payOrder()
				
			},
			// 提示用户请求登录
			showTip(n){
				uni.showToast({
					title:'请登录后再结算'+ n +'秒后自动跳转到登录页',
					mask: true, // 页面遮罩，防止用户点击穿透
					duration: 1500,// 1.5 秒后自动消失
					icon:'none' // 无图标展示
				})
			},
			// 延时跳转值 my 页面
			delayNavigate(){
				this.seconds = 3 // 重置seconds
				// 上来展示一次提示信息
				this.showTip(this.seconds)
				
				this.timeId = setInterval(()=>{
					this.seconds--
					if(this.seconds <= 0){
						// 清理定时器
						clearInterval(this.timeId)
						
						// seconds 为0时，跳转值my页面
						uni.switchTab({
							url:"/pages/my/my",
							success:() => { // 如果switchTab执行成功，触发success函数
								// 记录本次跳转的页面
								this.updateRedirctInfo({
									openType:'switchTab', // 通过那种方式跳转到导航页
									from:'/pages/cart/cart' // 跳转到那个页面路径
								})
							}
						})
						return 
					}
					// 每1秒执行一次showTip提示信息
					this.showTip(this.seconds)
				},1000)
				
			},
		
			// 点击创建商品订单
			async payOrder(){
				
				// 1.准备根据商品，创建商品信息对象
				const orderGoods = {
					// order_price: this.checkGoodsAmount // 购物车选中的商品总价
					order_price: 0.1, // 商品的价格
					consignee_addr: this.addstr, //地址
					// 已勾选的商品 要购买的商品信息对象
					goods: this.cart.filter(item => item.goods_state)
					// 通过map函数进行数据处理，处理为后台所需要格式
						.map(x => ({ goods_id: x.goods_id, goods_number: x.goods_count, goods_price: x.goods_price }))
				}
				uni.showLoading({
					title:'正在创建商品订单'
				})
				const {data: res} = await createOrders(orderGoods)
				// 这里模拟的调用创建订单 接口，数组在simulation_data/pag.js
				// const res = await createOrder(orderGoods)
				
				if(res.meta.status !== 200) uni.$showMsg('创建订单失败')
				// uni.hideLoading() // 成功隐藏loading效果
				const orderNumber = res.message.order_number
				console.log(orderNumber)
				
				// 2.订单预支付
				const {data: payOrd} = await reqUnifiedorder({order_number: orderNumber})
				if(payOrd.meta.status !== 200) uni.$showMsg('预付订单生成失败！')
				const payInfo = payOrd.message.pay
				console.log(payInfo)
				/** payInfo
					nonceStr: "ugbxySvU4ee6FNbg"
					package: "prepay_id=wx12182032939483258838d892a124080000"
					paySign: "EC8C07C7867CA47B550EDB2DAFBC0AB8"
					signType: "MD5"
					timeStamp: "1655029234"
				 */
				
				// 3.发起微信支付
				// 调用 uni.requestPayment() 发起微信支付功能 - 微信支付入口申请接入微信支付
				const [err, succ] = await uni.requestPayment(payInfo)
				console.log(err,succ)
				// err存在
				if (err) return uni.$showMsg('订单未支付！')// 基本上都是 err报异常 requestPayment:fail no permission，个得申请支付接口权限
				
				// 订单完成了，查询支付结果是否成功
				const {data: payRes} = await checkOrder({order_number: orderNumber})
				if (payRes.meta.status !== 200) return uni.$showMsg('订单未支付！')
			 // 检测到订单支付完成
			 uni.showToast({
				 title: '支付完成！',
				 icon: 'success'
			 })
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