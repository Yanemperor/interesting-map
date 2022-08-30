<template>
	<view class="container">
		<view class="head">
			<view class="head-title"> 商务合作 </view>
			<view class="head-text"> 请发送邮件到: </view>
			<view class="head-mail-bg">
				<view class="head-mail">
					zhouzilong09@163.com
				</view>
				<view class="head-mail-btn">
					<u-button type="primary" size="mini" text="复制" @click="copy"></u-button>
				</view>
			</view>
		</view>
		<u-line color="#eeeeee"></u-line>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {},
		methods: {
			copy() {
				uni.setClipboardData({
					data: "zhouzilong09@163.com"
				});
				uni.showToast({
					title: '复制成功',
					icon: 'none'
				});
			}
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

	.head-text {
		padding-top: 24px;
		font-size: 16px;
		font-weight: 500;
		color: #666666;
		line-height: 24px;
	}

	.head-mail-bg {
		display: flex;
	}

	.head-mail {
		font-size: 16px;
		font-weight: 500;
		color: #0000ee;
		line-height: 24px;
	}

	.head-mail-btn {
		padding-left: 16px;
	}
</style>
