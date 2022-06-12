import request from '../util/request.js'

/**
 * 创建订单
 */
export const createOrders = data => {
	return request({
		method: "POST",
		url:'/api/public/v1/my/orders/create',
		data
	})
}
/**
 * 订单预支付
 */
export const reqUnifiedorder = data => {
	return request({
		method: "POST",
		url:'/api/public/v1/my/orders/req_unifiedorder',
		data
	})
}
/**
 * 查询支付的结果
 */
export const checkOrder = data => {
	return request({
		method: "POST",
		url:'/api/public/v1/my/orders/chkOrder',
		data
	})
}