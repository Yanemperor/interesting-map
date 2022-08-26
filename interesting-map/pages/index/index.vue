<template>
	<view class="container">
		<view class="list">
			<u-list @scrolltolower="scrolltolower">
				<u-list-item>
					<u-swiper mode="scaleToFill" :list="banners" height="150" keyName="imageUrl" showTitle circular
						@click="bannerClick">
					</u-swiper>
				</u-list-item>
				<u-list-item v-for="(item, index) in items" :key="index">
					<view class="cell" @click="cellClick(item)">
						<view class="cell-image">
							<u-image :lazy-load="true" :showLoading="true" :src="item.imageUrl" width="100%"
								height="160" radius="4" loadingIcon="defalutImg">
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
								{{ item.name }}
							</view>
							<view class="cell-zan">
								<u-image :src="zan" width="16px" height="16px"></u-image>
								<view class="cell-title" style="padding-left: 4px;">
									{{ item.zan }}
								</view>
							</view>
						</view>
					</view>
					<view class="cell-line">
						<u-line margin="16" color="#eeeeee"></u-line>
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
				banners: [],
				items: [{
						"name": "北京故宫",
						"address": "北京故宫",
						"longitude": "116.39706",
						"latitude": "39.91584",
						"scale": "15",
						"isBanner": false,
						"zan": 0,
						"imageUrl": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-6ad7a12a-0993-4c3e-8b0b-f6c4f77738b6/dd04ea7b-7b7d-478e-a956-c4b3766c28b6.jpg",
						"details": "北京故宫是中国明清两代的皇家宫殿，旧称紫禁城，位于北京中轴线的中心"
					}, {
						"name": "北京大兴机场",
						"address": "北京大兴机场",
						"longitude": "116.41652",
						"latitude": "39.51120",
						"scale": "17",
						"isBanner": false,
						"zan": 0,
						"imageUrl": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-6ad7a12a-0993-4c3e-8b0b-f6c4f77738b6/30a3f308-1e1f-4bf6-9da1-801cb6d4cfe1.jpg",
						"details": "北京大兴机场"
					}, {
						"name": "上帝之眼",
						"address": "上海滴水湖",
						"longitude": "121.941259",
						"latitude": "30.896982",
						"scale": "14",
						"isBanner": true,
						"zan": 0,
						"imageUrl": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-6ad7a12a-0993-4c3e-8b0b-f6c4f77738b6/cee5c4ca-5b4e-41fc-90a6-2a71ab7ace03.jpg",
						"details": "这个被叫做上帝之眼的地方叫做滴水湖，它就位于上海的浦东新区，不知道大家在来这里旅游的时候是否也来过滴水湖旅游呢，他们这里的滴水湖呈现的是一个非常正的圆形，而且它的直径达到了2600米，在高空中俯瞰下去就像是上帝之眼一样，而且有不少的人在看到下面这张图片之后，不由得想起一句非常中二的话，那就是你凝望着深渊，深渊也正在望着你。"
					},
					{
						"name": "砖石项链",
						"address": "常州市的武进区春秋地面城池遗址",
						"longitude": "119.924203",
						"latitude": "31.703026",
						"scale": "15",
						"isBanner": true,
						"zan": 0,
						"imageUrl": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-6ad7a12a-0993-4c3e-8b0b-f6c4f77738b6/87377f16-ebbd-47c1-b015-cd85cca07435.jpg",
						"details": "这个被叫做钻石项链的地方就是一个遗址公园，它是我们国家现存为止保存得最完整的春秋地面城池遗址，这里就位于常州市的武进区，他的样子非常的好看，虽然这里都是道路，但是他这里就像是一个迷宫一样，看起来非常的曲折。"
					},
					{
						"name": "巨型八卦图",
						"address": "杭州八卦田遗址公园",
						"longitude": "120.151673",
						"latitude": "30.211053",
						"scale": "17",
						"isBanner": true,
						"zan": 0,
						"imageUrl": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-6ad7a12a-0993-4c3e-8b0b-f6c4f77738b6/4c375449-1426-43c4-8e0b-b5da58925548.jpg",
						"details": "这里就是八卦田遗址公园，之所以有一个这样的名字就是因为他们这里的意志非常的像一个八卦牌一样，毕竟古代的皇帝都相信一些鬼神之说，所以他们有一些东西都建造的就像是八卦一样，其实他们这里还有着一定的作用，那就是举行一些仪式，希望来年农业能够风调雨顺之类的。"
					}
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
					console.log("获取数据成功", res);
				}).catch((e) => {
					console.log("获取数据失败", e);
				});

				var banners = [];
				for (let i = 0; i < this.items.length; i++) {
					var item = this.items[i];
					if (item.isBanner === true) {
						item.title = item.address;
						banners.push(item);
					}
				}
				console.log(banners)
				this.banners = banners;
			},
			scrolltolower() {

			},
			bannerClick(index) {
				console.log(index);
				this.pushMap(this.banners[index]);
			},
			cellClick(item) {
				this.pushMap(item);
			},
			pushMap(item) {
				let json = JSON.stringify(item);
				uni.navigateTo({
					url: '/pages/index/details?json=' + json
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
