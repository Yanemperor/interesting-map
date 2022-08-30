<template>
	<view class="container">
		<u-toast ref="uToast"></u-toast>
		<view class="search">
			<u-search :showAction="true" actionText="搜索" :animation="false" @custom="search"></u-search>
		</view>
		<view class="">
			<map class="map" enable-satellite="true" :latitude="latitude" :longitude="longitude" :scale="scale"
				:enable-3D="true" @markertap="markertap" @regionchange="regionchange"></map>
		</view>
		<view class="longitude-latitude-bg">
			<view class="longitude-item">
				经度: {{ centerLocation.longitude ? centerLocation.longitude : longitude }}
			</view>
			<view class="latitude-item">
				纬度: {{ centerLocation.latitude ? centerLocation.latitude : latitude }}
			</view>
		</view>
		<view class="input-bg">
			<u--input v-model="author" placeholder="请输入您的昵称" border="surround" clearable></u--input>
			<view style="padding-top: 12px;">

			</view>
			<u--textarea v-model="details" placeholder="请输入详情"></u--textarea>
		</view>
		<view class="bottom-bg">
			<u-button text="提交" size="large" type="primary" @click="btnClick"></u-button>
		</view>
		<u-modal :show="show" title="是否提交" content="审核通过会展示到首页并在详情页面带上您的昵称" showCancelButton="true" @cancel="cancel"
			@confirm="confirm"></u-modal>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	let QQMapWX = require('@/libs/qqmap-wx-jssdk.js');

	export default {
		data() {
			return {
				show: false,
				details: "",
				popupShow: false,
				latitude: "",
				longitude: "",
				centerLocation: {
					latitude: "39.91507",
					longitude: "116.39686",
					scale: "15"
				},
				scale: "15",
				author: "",
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#1685a9',
					buttonColor: '#1685a9',
					iconColor: '#fff'
				}
			}
		},
		onLoad(option) {
			wx.showShareMenu({
				withShareTicket: true,
				//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
				menus: ["shareAppMessage", "shareTimeline"]
			});
			this.initData(option.longitude, option.latitude, option.scale);
		},
		methods: {
			initData(longitude, latitude, scale) {
				console.log(longitude, latitude)
				this.longitude = longitude;
				this.latitude = latitude;
				this.scale = scale;
			},
			markertap(e) {
				console.log(e);
			},
			regionchange(e) {
				console.log("regionchange", e);
				console.log(e);
				if (e.type == "end") {
					this.centerLocation = e.detail.centerLocation;
					this.centerLocation.scale = e.detail.scale;
				}
			},
			btnClick() {
				if (this.author == "" || this.author == null) {
					uni.showToast({
						title: '请输入您的昵称',
						icon: 'none'
					});
					return
				}
				this.show = true;
			},
			cancel() {
				this.show = false;
			},
			confirm() {
				this.show = false;
				this.contribute();
			},
			contribute() {
				console.log("投稿");
				const db = uniCloud.database();
				db.collection("contribute").add({
					"author": this.author,
					"longitude": String(this.centerLocation.longitude),
					"latitude": String(this.centerLocation.latitude) ,
					"scale": String(this.centerLocation.scale),
					"details": this.details
				}).then((res) => {
					console.log("投稿成功", res);
					this.$refs.uToast.show({
						type: 'success',
						title: '默认主题',
						message: "投稿成功"
					})
				}).catch((e) => {
					console.log("投稿失败", e);
				});
			},
			search(value) {
				console.log(value);
				this.getLocation(value);
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
		height: 350px;
		overflow: hidden;
	}

	.longitude-latitude-bg {
		display: flex;
		justify-content: space-between;
		margin-top: 16px;
		margin-left: 16px;
		margin-right: 16px;
	}

	.longitude-item {
		display: flex;
		align-items: center;
		border-style: solid;
		border-width: 1px;
		border-color: #333333;
		height: 30px;
		font-size: 12px;
		border-radius: 5px;
		padding-left: 6px;
		padding-right: 6px;
	}

	.latitude-item {
		display: flex;
		align-items: center;
		border-style: solid;
		border-width: 1px;
		border-color: #333333;
		height: 30px;
		font-size: 12px;
		border-radius: 5px;
		padding-left: 6px;
		padding-right: 6px;
	}

	.input-bg {
		margin-top: 16px;
		margin-left: 16px;
		margin-right: 16px;
	}

	.bottom-bg {
		margin-top: 16px;
		margin-left: 16px;
		margin-right: 16px;
	}
</style>
