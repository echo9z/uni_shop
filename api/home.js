import request from '../util/request.js'

/**
 * 获取轮播图数据
 */
export const getSwiperList = () => {
	return request({
		method: 'GET',
		url:'/api/public/v1/home/swiperdata'
	})
}

/**
 * 获取首页分类选项数据
 */
export const getNavList = () => {
	return request({
		method: 'GET',
		url:'/api/public/v1/home/catitems'
	})
}

/**
 * 获取楼层数据
 */
export const getFloordata = () => {
	return request({
		method: 'GET',
		url:'/api/public/v1/home/floordata'
	})
}

/**
 * 获取分类数据
 */
export const getCateList = () => {
	return request({
		method: 'GET',
		url:'/api/public/v1/categories'
	})
}

/**
 * 获取搜索建议查询
 */
export const getKeyword = (keyword) => {
	console.log(keyword)
	return request({
		method: 'GET',
		url:`/api/public/v1/goods/qsearch?query=${keyword}`
	})
}

/**
 * 获取商品列表数据
 */
export const getGoodList = (query) => {
	return request({
		method: 'GET',
		url:`/api/public/v1/goods/search`,
		params: query
	})
}

/**
 * 获取商品详情数据
 */
export const getGoodsInfo = (goods_id) => {
	return request({
		method: 'GET',
		url:`/api/public/v1/goods/detail?goods_id=${goods_id}`,
	})
}

// /**
//  * 用户登录
//  * 模拟请求本地的json数据
//  */
// export const login = body => {
// 	return request({
// 		// method: 'POST',
// 		method: 'GET',
// 		url:`/api/public/v1/users/wxlogin`,
// 		body
// 	})
// }