<template>
	<view class="container">
		<view class="list">
			<u-list @scrolltolower="scrolltolower">
				<u-list-item>
					<u-swiper :list="banners" height="150" keyName="image" showTitle circular @click="bannerClick">
					</u-swiper>
				</u-list-item>
				<u-list-item v-for="(item, index) in urls" :key="index">
					<view class="cell" @click="cellClick(item)">
						<view class="cell-image">
							<u-image :showLoading="true" :src="item" width="100%" height="160" radius="4"
								loadingIcon="defalutImg">
								<view style="width: 100%; height: 100%" slot="loading">
									<img :src="defalutImg" style="width: 100%; height: 100%" />
								</view>
								<view style="width: 100%; height: 100%" slot="error">
									<img :src="defalutImg" style="width: 100%; height: 100%" />
								</view>
							</u-image>
						</view>
						<view class="cell-bottom">
							<view class="cell-title">
								池塘版中国地图
							</view>
							<view class="cell-zan">
								<u-image :src="zan" width="16px" height="16px"></u-image>
								<view class="cell-title" style="padding-left: 4px;">
									120
								</view>
							</view>
						</view>
					</view>
					<view class="cell-line">
						<u-line margin="16" color="#f5f5f5"></u-line>
					</view>
				</u-list-item>
			</u-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLoading: true,
				zan: "/static/cell_zan.png",
				defalutImg: "/static/defalut-img.png",
				banners: [{
					image: 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					title: '昨夜星辰昨夜风，画楼西畔桂堂东',
				}, {
					image: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					title: '身无彩凤双飞翼，心有灵犀一点通'
				}, {
					image: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
				}],
				urls: [
					'https://cdn.uviewui.com/uview/album/1.jpg',
					'https://cdn.uviewui.com/uview/album/2.jpg',
					'https://cdn.uviewui.com/uview/album/3.jpg',
					'https://cdn.uviewui.com/uview/album/4.jpg',
					'https://cdn.uviewui.com/uview/album/5.jpg',
					'https://cdn.uviewui.com/uview/album/6.jpg',
					'https://cdn.uviewui.com/uview/album/7.jpg',
					'https://cdn.uviewui.com/uview/album/8.jpg',
					'https://cdn.uviewui.com/uview/album/9.jpg',
					'https://cdn.uviewui.com/uview/album/10.jpg',
				]
			}
		},
		onLoad() {
			wx.showShareMenu({
				withShareTicket: true,
				//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
				menus: ["shareAppMessage", "shareTimeline"]
			});
			this.loadData();
		},
		methods: {
			loadData() {
				console.log("获取数据");
				const db = uniCloud.database();
				const resume = db.collection("address_info").get().then((res) => {
					console.log(res)
				}).catch((e) => {
					console.log(e)
				});
			},
			scrolltolower() {

			},
			bannerClick() {

			},
			cellClick() {
				uni.navigateTo({
					url: '/pages/map/map'
				})
			},
			onShareAppMessage(res) {
				if (res.from === 'button') { // 来自页面内分享按钮
					console.log(res.target)
				}
				return {
					title: '奇趣地图', //分享的名称
					path: '/pages/index/index',
					mpId: 'wx120caeda2bba21e7' //此处配置微信小程序的AppId
				}
			},
			//分享到朋友圈
			onShareTimeline(res) {
				return {
					title: '奇趣地图',
					type: 0,
					summary: "",
				}
			},
		}
	}
</script>

<style>
	.container {
		padding: 16px;
	}

	.list {
		/* margin-top: 12px; */
	}

	.cell {
		/* padding: 16px; */
		padding-top: 16px;
	}

	.cell-image {
		background: #d8d8d8;
		border-radius: 4px;
	}

	.cell-bottom {
		display: flex;
		justify-content: space-between;
		padding-top: 8px;
		padding-bottom: 16px;
	}

	.cell-zan {
		display: flex;
		align-items: center;
	}

	.cell-title {
		font-size: 14px;
		font-weight: 400;
		color: #333333;
		line-height: 20px;
	}

	.cell-time {
		font-size: 12px;
		font-weight: 400;
		color: #999999;
		line-height: 16px;
		padding-top: 8px;
	}

	.cell-line {
		margin-left: 16px;
		margin-right: 16px;
	}
</style>
