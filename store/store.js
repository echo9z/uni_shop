import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) //将 Vuex 安装为 Vue 的插件
import cart from './cart.js'
import user from './user.js'

const stroe = new Vuex.Store({ //创建 Store 的实例对象
	state:{ //全局事件数据
		count:0
	}, 
	modules:{ //局部模块
		cartModule:cart, // 访问cart中store数据，就需要通过$store.state.cartModule访问cart模块下的共享数据
		userModule:user
	}
})

export default stroe