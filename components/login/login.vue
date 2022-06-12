<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<!-- open-type="getUserProfile" 
			具体查看微信https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserProfile.html-->
			<!-- @click="getUserProfile"  -->
		<button type="primary" class="btn-login" @click="getUserProfile" >一键登录</button>
		<text class="tip-text">登录后尽享更多权益</text>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	// import {login} from '@/api/home.js'
	import {login} from '@/simulation_data/login.js'
	
	export default {
		name:"login",
		data() {
			return {
				user:{}
			};
		},
		computed:{
			...mapState('userModule',['redirectInfo'])
		},
		methods:{
			// 导入存储用户信息，
			...mapMutations('userModule',['updateUserInfo','updateUserToke','updateRedirctInfo']),
			async getUserProfile(){
				// 推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认z
				
				/* 获取用户信息成功， e.detail.userInfo 就是用户的基本信息
				// desc必须传入：声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				// const res = await wx.getUserProfile({desc: '用于完善会员资料'}).catch(error =>{
				// 	console.log(error)
				// 	if(error.errMsg === 'getUserProfile:fail auth deny')
				// 	return uni.$showMsg('您取消了登录授权！')
				// })*/
				
				// 基于uniapp写法
				try{
					const res = await wx.getUserProfile({desc: '用于完善会员资料'})
					console.log(res)
					// 将用户信息存储到vuex中，并进行数据持久化
					this.updateUserInfo(res.userInfo)
					
					// 获取登录成功后的 Token 字符串
					this.getToken(res)
				}catch(err){
					//TODO handle the exception
					console.log(err)
					if(err.errMsg === 'getUserProfile:fail auth deny') return uni.$showMsg('您取消了登录授权！')
				}
			},
			
			async getToken(info){
				// 根据wx生成相关字段，那这这些数据请求后台服务器
				// wx.login()调用接口获取登录凭证（code）。通过凭证进而换取用户登录态信息
				const [err,res] = await uni.login().catch(err => err)
				
				if(err || res.errMsg !=="login:ok") return uni.$showError('登录失败！')
				
				const query = {
					code: res.code, // 调用接口获取登录凭证
					encryptedData: info.encryptedData,
					iv:info.iv, //加密算法的初始向量，
					rawData: info.rawData, //不包括敏感信息的原始数据字符串，用于计算签名
					signature:info.signature //使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息
				}
				// console.log(query)
				// const {data:loginRes} = await login(query)
				// 这里模拟的数据进行返回
				const loginRes = await login() // 这里模拟后端返回的数据
				if(loginRes.meta.status !== 200) return uni.$showMsg('登录失败')
				uni.$showMsg('登录成功')
				
				// 将请求的token数据存储到本地
				this.updateUserToke(loginRes.message.token)
				
				// 判断 vuex 中的 redirectInfo 是否为 null
				// 如果不为 null，则登录成功之后，需要重新导航到对应的页面
				this.navigateBack()
				// 如果是购车cart页面跳转至登录，登录成功之后根据 store中的
			},
			navigateBack(){
				if(this.redirectInfo && this.redirectInfo.openType === 'switchTab'){ // 如果重定向对象存在，同时切换导航页面方式为switchTab
					// 导航到对应的url路径
					uni.switchTab({
						url: this.redirectInfo.from,
						complete:() => { // 跳转完成清空redirectInfo
							this.updateRedirctInfo(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.login-container{
	height: 100vh; // 相当于撑满整个盒子
	background-color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.btn-login{
		width: 80%;
		border-radius: 100px;
		margin: 50px 0 10px;
		background: #c00000;
	}
	.tip-text{
		font-size: 12px;
		color: gray;
	}
}
</style>