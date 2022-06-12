// 模拟的数据，返回的数据为创建订单的数据
const orderData = {
  "message": {
    "order_id": 45,
    "user_id": 12,
    "order_number": "GD20180504000000000045",
    "order_price": 0.1,
    "order_pay": "0",
    "is_send": "否",
    "trade_no": "",
    "order_fapiao_title": "个人",
    "order_fapiao_company": "",
    "order_fapiao_content": "",
    "consignee_addr": "广州市天河区",
    "pay_status": "0",
    "create_time": 1525408071,
    "update_time": 1525408071,
    "order_detail":
      "[{\"goods_id\":55578,\"goods_name\":\"初语2017秋装新款潮牌女装加绒宽松BF风慵懒卫衣女套头连帽上衣\",\"goods_price\":279,\"goods_small_logo\":\"http://image2.suning.cn/uimg/b2c/newcatentries/0070067836-000000000690453616_2_400x400.jpg\",\"counts\":1,\"selectStatus\":true}]",
    "goods": [
      {
        "id": 64,
        "order_id": 45,
        "goods_id": 5,
        "goods_price": 15,
        "goods_number": 11,
        "goods_total_price": 15
      }
    ]
  },
  "meta": { "msg": "创建订单成功", "status": 200 }
}
let flag = false
export const createOrder = (data) => { // data 创建的订单信息
	console.log(data)
	if(flag) return false
	flag = true
	return new Promise((resolve,reject) => {
		// console.log('ppp')
		setTimeout(function() {
			// console.log('sss')
			resolve(orderData)
		}, 500);
	}).finally(()=>{ //等待Promise直接完毕后执行，再执行finally函数 
		// console.log('fay')
		flag = false
	})
}