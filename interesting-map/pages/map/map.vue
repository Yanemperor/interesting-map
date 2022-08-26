<template>
	<view class="container">
		<u-toast ref="uToast"></u-toast>
		<view class="search">
			<u-search :showAction="true" actionText="搜索" :animation="false" @custom="search"></u-search>
		</view>
		<view class="">
			<map class="map" enable-satellite="true" :latitude="latitude" :longitude="longitude" :scale="scale" :enable-3D="true"></map>
		</view>
		<uni-fab ref="fab" :pattern="pattern" :content="content" horizontal="right" vertical="bottom"
			direction="vertical" @trigger="trigger" @fabClick="fabClick" />
	</view>
</template>

<script>
	let QQMapWX = require('@/libs/qqmap-wx-jssdk.js');
	
	export default {
		data() {
			return {
				latitude: "39.91507",
				longitude: "116.39686",
				scale: "15",
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#1685a9',
					buttonColor: '#1685a9',
					iconColor: '#fff'
				},
				content: [{
						iconPath: '/static/map_up.png',
						selectedIconPath: '/static/map_up.png',
						text: '投稿',
						active: false
					},
					{
						iconPath: '/static/fab_navigation.png',
						selectedIconPath: '/static/fab_navigation.png',
						text: '导航',
						active: false
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
		},
		methods: {
			search(value) {
				console.log(value);
				this.getLocation(value);
			},
			fabClick() {
				// uni.showToast({
				// 	title: '点击了悬浮按钮',
				// 	icon: 'none'
				// })
			},
			trigger(e) {
				console.log(e)
				if (e.index == 0) {
					this.$refs.uToast.show({
						type: 'success',
						title: '默认主题',
						message: "点赞成功",
						complete() {
			
						}
					})
				} else if (e.index == 1) {
					
				}
			},
			getLocation(title) {
			  // 实例化API核心类
			  let qqmapsdk = new QQMapWX({
			    key: 'KDRBZ-DGVLJ-5W4FO-KLF7C-VGQT2-M4FOE' // 必填
			  });
			
			  //调用地址解析接口
			  qqmapsdk.geocoder({
			    //获取表单传入地址
			    address: title, // 地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
			    success: res => {
			      //成功后的回调
			      res = res.result;
			      const lat = res.location.lat;
			      const lng = res.location.lng;
				  this.latitude = lat;
				  this.longitude = lng;
				  console.log(res);
			    },
			    fail: error => {
			      wx.showToast({
			        icon: 'none',
			        title: '定位失败'
			      });
			    },
			    complete: res => {
			      console.log(res);
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
	.search {
		padding-top: 12px;
		padding-left: 16px;
		padding-right: 16px;
		padding-bottom: 12px;
	}
	.map {
		width: 100%;
		height: 1260rpx;
		overflow: hidden;
	}
</style>
