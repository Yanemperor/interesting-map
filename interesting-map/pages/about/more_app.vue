<template>
	<view class="container">
		<view class="head">
			<view class="head-title"> 欢迎体验其他小程序 </view>
		</view>
		<view class="cell-bg">
			<view v-for="(item, index) in items" :key="index">
				<view class="cell" @click="cellClick(item)">
					<view class="cell-title">
						{{ item.name }}
					</view>
					<u-icon name="arrow-right" color="#b2b2b2"></u-icon>
				</view>
				<u-line color="#eeeeee"></u-line>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				logo: '/static/logo.png',
				items: [{
					name: '成考真题',
					appId: 'wx1b87633653856f3e',
					path: 'pages/question/index/index'
				}],
			}
		},
		onLoad() {},
		methods: {
			cellClick(item) {
				uni.navigateBackMiniProgram({
					appId: item.appId,
					path: item.path,
					success: (res) => {
						console.log("打开成功", res);
					},
					fail: (err) => {
						console.log(err);
					}
				})
			},
		},
	}
</script>

<style>
	.container {
		background-color: white;
	}

	.head {
		padding: 16px;
	}

	.head-title {
		font-size: 16px;
		font-weight: 500;
		color: #000000;
		line-height: 24px;
	}

	.cell-bg {
		padding-top: 10px;
	}

	.cell {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 56px;
		padding-left: 16px;
		padding-right: 19px;
	}

	.cell-title {
		color: rgba(0, 0, 0, 0.9);
		font-size: 16px;
	}
</style>
