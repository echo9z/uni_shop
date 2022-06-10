export default {
	// 这里是user 用户模块
	// 为当前模块开启命名空间
	namespaced: true,
	state: () => ({
		// address 用户的收货地址
		address: JSON.parse(uni.getStorageSync('yg-address') || '{}')
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