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

