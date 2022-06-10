export default {
	// 这里是cart 购物车模块
	// 为当前模块开启命名空间
	namespaced: true,
	state: () => ({
		// 购物车数组，存放每个商品的信息对象
		// cart 每个购车车的商品包含一下属性
		// {goods_id,goods_name,goods_price,goods_small_logo,goods_count:添加到购物商品的数量,goods_state:商品的是否被选中状态}
		cart: JSON.parse(uni.getStorageSync('yg-cart') || '[]')
	}),
	mutations:{
		addToCart(state,goods){
			// 根据商品的id对，cart购物车数组中是否存在
			// find函数查找元素，如果元素不存在于则返回undefined，否则返回查找的元素信息对象
			const resultGoods = state.cart.find(x => x.goods_id === goods.goods_id)
			console.log(state)
			if(!resultGoods){
				// 购物车数组中没有添加的商品，则添加cart数组
				// goods.goods_count = 1
				state.cart.push(goods)
			}else{
				// 存在，则返回的商品对象添加goods_count++ 加1
				resultGoods.goods_count++ 
			}
			
			// 调用cart模块下的方法，进行数据持久化 触发cartModule命名空间下的方法
			this.commit('cartModule/saveCartStorage')
		},
		
		// 将cart数组中的数据，持久化到本地
		saveCartStorage(state){
			uni.setStorageSync('yg-cart',JSON.stringify(state.cart) || '[]')
		},
		
		// 更新购物车勾选状态；修改对应商品id goods_id的 cart元素的 goods_state属性
		updateGoodsState(state,goods){ // goods外界调用传入参数
			console.log(goods)
			// 查找对应cart元素对象
			const resultGoods = state.cart.find(item => item.goods_id === goods.goods_id)
			if(resultGoods){ // 存在
				// 更新查找出的数据对象goods_state值
				resultGoods.goods_state = goods.goods_state
				
				// 将新的cart数据，持久化的本地
				this.commit('cartModule/saveCartStorage')
			}
		},
		// 更新购物车的商品数量
		updateGoodsCount(state,goods){
			const resultGoods = state.cart.find(item => item.goods_id === goods.goods_id)
			if(resultGoods){ // 存在
				// 更新查找出的数据对象goods_count值
				resultGoods.goods_count = goods.goods_count
				
				// 将新的cart数据，持久化的本地
				this.commit('cartModule/saveCartStorage')
			}
		},
		// 根据商品id，删除对应
		removeGoodsById(state,goods_id){
			// 通过 过滤器删除元素
			state.cart = state.cart.filter(item => item.goods_id !== goods_id)
			
			// 将新的cart数据，持久化的本地
			this.commit('cartModule/saveCartStorage')
		},
		updateAllGoodsState(state,goods_state){
			state.cart.forEach(item => item.goods_state = goods_state)
			
			// 持久化数据到本地
			this.commit('cartModule/saveCartStorage')
		},
	},
	getters:{
		// 购物车商品的总数
		total(state){
			return state.cart.length
		},
		// 购物车中哪些 商品被选中的数量
		cartIsCheck(state){
			//pre 相遇于统计累加的变量，默认值为0
			return state.cart.reduce((pre, item, index) => {
				// 如果cart数组中的每个元素的goods_state为true则累加1 到 pre中并进行返回
				return pre + (item.goods_state ? 1:0)
			},0)
		},
		// 商品被选中的 总件数，比如创维电视这件商品为选中，件数5个，此时就需要计算勾选的件数
		checkedCount(state){
			// 使用filter 过滤goods_state为true
			// 再使用reduce方法，勾选的商品的件数 进行累加,total默认是0开始
			return state.cart.filter(item => item.goods_state)
				.reduce((total,item) => total += item.goods_count ,0) // item每个商品对象，累加计算每个商品数量
		},
		// 动态勾选商品的总价格
		checkGoodsAmount(state){
			// 使用filter 过滤goods_state为true
			// reduce方法，勾选的商品的件数*商品单价，再进行累加
			return state.cart.filter(item => item.goods_state)
				.reduce((total,item) => total += item.goods_count*item.goods_price ,0)
				.toFixed(2)
		}
	}
}