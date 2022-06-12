<template>
	<view>
		<!-- 登录 -->
		<login v-if="!userToken"></login>
		<!-- 用户信息组件 -->
		<userinfo v-else ></userinfo>
		
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import badgeMixin from '@/mixins/tabbar-badge.js'
	export default {
		data() {
			return {
				
			}
		},
		onShow() {
			console.log(this.userToken)
		},
		computed:{
			...mapState('userModule',['userToken'])
		},
		mixins: [badgeMixin],
		methods: {
			
		}
	}
</script>

<style lang="scss">

</style>
