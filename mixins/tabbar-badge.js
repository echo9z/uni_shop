import {mapGetters} from 'vuex'
// 导出minx 对象
export default {
	// 当cart购物车的页面显示时，执行该函数
	onShow() {
		// 设置某一项tabbar的右上角添加文本
		this.setBadge()
	},
	computed:{
		// 把cartModule模块中的 cart数据映射到当前页面中，作为计算属性使用
		// ...mapState('模块名称',['要映射的模块中state属性1','要映射的模块中state属性2'])
		// ...mapState('cartModule',['cart'])
		// 映射cart共享模块中，购物车被选中的总数量
		...mapGetters('cartModule',['cartIsCheck'])
		
	},
	methods:{
		setBadge(){
			// 调用微信小程序的wx.setTabBarBadge(Object object)为 tabBar 某一项的右上角添加文本参数
			uni.setTabBarBadge({
				index:2, // 索引2为 购物车
				text: this.cartIsCheck + '' //text类型必须是字符串
			})
		}
	},
	watch:{
		cartIsCheck:{
			handler(value){
				// 当cartIsCheck 统计的数据变化了，立即调用修改tab右上角的徽标值
				this.setBadge()
			},
			immediate:true 
		}
	}
}