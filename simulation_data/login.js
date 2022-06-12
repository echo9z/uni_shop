const loginData = {
			  "message": {
			    "user_id": 12,
			    "user_email_code": null,
			    "is_active": null,
			    "user_sex": "男",
			    "user_qq": "",
			    "user_tel": "",
			    "user_xueli": "本科",
			    "user_hobby": "",
			    "user_introduce": null,
			    "create_time": 1525402223,
			    "update_time": 1525402223,
			    "token":
			      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
			  },
			  "meta": { "msg": "登录成功", "status": 200 }
			}
let flag = false
export const login = () => {
	if(flag) return false
	flag = true
	return new Promise((resolve,reject) => {
		// console.log('ppp')
		setTimeout(function() {
			// console.log('sss')
			resolve(loginData)
		}, 500);
	}).finally(()=>{ //等待Promise直接完毕后执行，再执行finally函数 
		// console.log('fay')
		flag = false
	})
}