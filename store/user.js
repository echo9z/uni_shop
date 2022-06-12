export default {
	// 这里是user 用户模块
	// 为当前模块开启命名空间
	namespaced: true,
	state: () => ({
		userToken: uni.getStorageSync('yg-user-token')||'', // 用户登录成功之后的token字符串
		// address 用户的收货地址
		address: JSON.parse(uni.getStorageSync('yg-address') || '{}'),
		// 用户登录所有的信息对象
		userInfo: JSON.parse(uni.getStorageSync('yg-user-info') || '{}'),
		// 重定向的object 对象 {openType,from} openType:那种方式导航会之前的页面，from表示之前页面的url地址
		redirectInfo:null
	}),
	mutations:{
		// 更新用户收货地址
		updateAddress(state,address){
			state.address = address
			// 触发将地址数据 进行持久化
			this.commit('userModule/saveAddressStorage')
		},
		// 将用户收货地址存储到的本地
		saveAddressStorage(state){
			uni.setStorageSync('yg-address',JSON.stringify(state.address))
		},
		removeAddressStorage(state){
			state.address = {}
			uni.removeStorageSync('yg-address')
		},
		
		// 更新用户基本信息
		updateUserInfo(state,userInfo){
			state.userInfo = userInfo
			// 触发将地址数据 进行持久化
			this.commit('userModule/saveUserInfoStorage')
		},
		// 将用户基本信息存储到的本地
		saveUserInfoStorage(state){
			uni.setStorageSync('yg-user-info',JSON.stringify(state.userInfo))
		},
		removeUserInfoStorage(state){
			state.userInfo = {}
			uni.removeStorageSync('yg-user-info')
		},
		
		// 更新用户token 信息
		updateUserToke(state,userToken){
			state.userToken = userToken
			// 触发将地址数据 进行持久化
			this.commit('userModule/saveUserTokenStorage')
		},
		// 将用户token息存储到的本地
		saveUserTokenStorage(state){
			uni.setStorageSync('yg-user-token',JSON.stringify(state.userToken))
		},
		removeUserTokenStorage(state){
			state.userToken = ''
			uni.removeStorageSync('yg-user-token')
		},
		
		// 更新用户token 信息
		updateRedirctInfo(state,info){
			console.log(info)
			state.redirectInfo = info
		}
		
	},
	getters:{
		addstr(state){
			if(!state.address.provinceName) return '' // 如果 省级地址为空直接返回
			// 拼接 省，市，区，详细地址 的字符串并返回给用户
			return `${state.address.provinceName} ${state.address.cityName} ${state.address.countyName}${state.address.detailInfo}`
		}
	}
}