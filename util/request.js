import axios from 'axios'
// import mpAdapter from 'axios-miniprogram-adapter'

let baseURL = 'http://www.uinav.com/'
const http = axios.create({
	baseURL,
	// time: 5000 // 请求时间超过5秒钟，会自动断开
})

//请求拦截器2
http.interceptors.request.use(function(config) {
	uni.showLoading({
		title: '数据加载中...'
	})
	// config.headers.Authorization = `Bearer ${user.token}`
	// config.headers.Authorization = `Bearer test`
	return config
}, function(error) {
	// 对请求错误做些什么
	console.log(error);
	return Promise.reject(error);
})

//响应拦截器
http.interceptors.response.use(function(response) {
	uni.hideLoading()
	// http响应的状态码为：2xx，执行这里逻辑期
	return response;
}, function(error) {
	console.log(error)
	// 对请求错误做些什么
	if (error.response.status) {
		switch (error.response.status) {
			case 401:
				break;
			default:
				break;
		}
	}
	return Promise.reject(error);
})

//真机获取 解决app上adapter is not a function问题
http.defaults.adapter = function(config) {
	return new Promise((resolve, reject) => {
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		var buildFullPath = require('axios/lib/core/buildFullPath');
		let fullurl = buildFullPath(config.baseURL,config.url)
		uni.request({
			method: config.method.toUpperCase(),
			url: buildURL(fullurl, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete:function complete(response){
				console.log(response)
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};
				settle(resolve, reject, response);
			}
		})
	})
}

export default http
