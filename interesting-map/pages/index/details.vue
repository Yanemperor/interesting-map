<template>
	<view class="container">
		<u-toast ref="uToast"></u-toast>
		<view class="">
			<map class="map" :longitude="item.longitude" :latitude="item.latitude" enable-satellite="true"
				:scale="item.scale"></map>
		</view>
		<view class="text">
			<u--text :text="item.details"></u--text>
		</view>
		<uni-fab ref="fab" :pattern="pattern" :content="content" horizontal="right" vertical="bottom"
			direction="vertical" @trigger="trigger" @fabClick="fabClick" />
		<u-action-sheet :actions="list" :show="sheetShow" cancelText="取消" safeAreaInsetBottom="true"
			closeOnClickOverlay="true" @select="sheetSelect" @close="sheetClose"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: {},
				show: false,
				sheetShow: false,
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#1685a9',
					buttonColor: '#1685a9',
					iconColor: '#fff'
				},
				content: [{
						iconPath: '/static/cell_zan.png',
						selectedIconPath: '/static/cell_zan.png',
						text: '点赞',
						active: false
					},
					{
						iconPath: '/static/fab_navigation.png',
						selectedIconPath: '/static/fab_navigation.png',
						text: '导航',
						active: false
					}
				],
				list: [{
						name: '腾讯地图',
					},
					{
						name: '高德地图',
					}
				],
			}
		},
		onLoad(option) {
			wx.showShareMenu({
				withShareTicket: true,
				//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
				menus: ["shareAppMessage", "shareTimeline"]
			});
			this.initData(option.json)
		},
		methods: {
			clickZan() {
				console.log("获取数据");
				const db = uniCloud.database();
				const dbCmd = db.command;
				db.collection('address_info').where({
					_id: '63088219abcff22faaa3c47e'
				}).update({
					zan: dbCmd.inc(1)
				}).then((res) => {
					console.log("点赞成功", res);
				}).catch((e) => {
					console.log("点赞失败", e);
				});
			},
			initData(json) {
				console.log(json);
				this.item = JSON.parse(json);
				uni.setNavigationBarTitle({
					title: this.item.name
				});
			},
			fabClick() {
				// uni.showToast({
				// 	title: '点击了悬浮按钮',
				// 	icon: 'none'
				// })
			},
			testco() { // 注意异步
			
				uniCloud.callFunction({
					name: 'updateZan',
					data: {a:1,b:2}
				}).then((res) => {
					console.log(res.result) // 结果是 {sum: 3}
				}).catch((err) => {
					console.error(err)
				})
			},
			trigger(e) {
				console.log(e)
				if (e.index == 0) {
					this.testco();
					// this.clickZan();
					// this.$refs.uToast.show({
					// 	type: 'success',
					// 	title: '默认主题',
					// 	message: "点赞成功",
					// 	complete() {

					// 	}
					// })
				} else if (e.index == 1) {
					this.sheetShow = true;
				}
			},
			sheetSelect(item) {
				console.log(item);
				this.address();
			},
			sheetClose() {
				this.sheetShow = false;
			},

			address() {
				uni.getLocation({
					success(res) {
						uni.openLocation({
							latitude: 110.237768,
							longitude: 20.068638,
							scale: 14
						});
					}
				});
			},
			onShareAppMessage(res) {
				if (res.from === 'button') { // 来自页面内分享按钮
					console.log(res.target)
				}
				return {
					title: '奇趣地图', //分享的名称
					path: '/pages/map/map',
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
			}
		}
	}
</script>

<style>
	.map {
		width: 100%;
		height: 400px;
		overflow: hidden;
	}

	.text {
		padding-top: 12px;
		padding-left: 16px;
		padding-right: 16px;
		color: #333333;
		font-size: 16px;
	}

	.floatview {
		width: 68px;
		height: 68px;
		position: fixed;
		right: 12px;
		bottom: 20px;
		z-index: 99999;
		background-color: rgba(0, 0, 0, 0);
		border-radius: 0px;
		border: 0rpx solid #ffffff;
	}

	.floatbtn {
		width: 68px;
		height: 68px;
		background-color: rgba(0, 0, 0, 0);
	}
</style>
