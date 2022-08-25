<template>
	<view class="container">
		<view class="list">
			<u-list @scrolltolower="scrolltolower">
				<u-list-item>
					<u-swiper mode="scaleToFill" :list="banners" height="150" keyName="imageUrl" showTitle circular @click="bannerClick">
					</u-swiper>
				</u-list-item>
				<u-list-item v-for="(item, index) in items" :key="index">
					<view class="cell" @click="cellClick(item)">
						<view class="cell-image">
							<u-image :lazy-load="true" :showLoading="true" :src="item.imageUrl" width="100%" height="160" radius="4"
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
					},
					{
						"name": "珍珠项链",
						"address": "南京中山陵9号美龄宫",
						"longitude": "118.846181",
						"latitude": "32.045819",
						"scale": "17",
						"isBanner": true,
						"zan": 0,
						"imageUrl": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-6ad7a12a-0993-4c3e-8b0b-f6c4f77738b6/7a1a1803-dc65-4aa3-9dfa-77456ba95b83.jpg",
						"details": "从他的名字上看，大家都应该已经想到了覆盖下去，到底是什么样的图案，这里位于南京市的玄武区，有不少的名人都曾经来过这里，比如说是宋美龄，比如说是蒋介石，其实这里是国民政府主席的宅邸，因为这里有一些道路，再加上一些法官沟通正好组建了这样的一幅图案。"
					},
					{
						"name": "爱心形状",
						"address": "巢湖",
						"longitude": "117.56334",
						"latitude": "31.581597",
						"scale": "9.5",
						"isBanner": false,
						"zan": 0,
						"imageUrl": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-6ad7a12a-0993-4c3e-8b0b-f6c4f77738b6/256c2d11-ca58-4b5b-abbb-d64f6ca5e606.jpg",
						"details": "它的名字叫做巢湖，是我们国家非常出名的一个淡水湖，虽然他看起来不大，而且呈现的都是心形的，但是它的面积却非常的大，总共13000多平方千米，直接就占了整个安徽省总面积的9.3%，让不少的游客都惊讶她的大。"
					},
					{
						"name": "宝葫芦",
						"address": "西藏自治区阿里地区日土县龙木错",
						"longitude": "80.454101",
						"latitude": "34.611472",
						"scale": "11",
						"isBanner": false,
						"zan": 0,
						"imageUrl": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-6ad7a12a-0993-4c3e-8b0b-f6c4f77738b6/899d892c-1793-4cad-8ae8-61eb719051c6.jpg",
						"details": "位于西藏自治区阿里地区日土县，空中鸟瞰像一个葫芦形状。"
					},
					{
						"name": "池塘版中国地图",
						"address": "上海金山区吕巷镇白漾村蝶镜湖",
						"longitude": "121.235523",
						"latitude": "30.842449",
						"scale": "17",
						"isBanner": false,
						"zan": 0,
						"imageUrl": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-6ad7a12a-0993-4c3e-8b0b-f6c4f77738b6/37a0da83-d8f7-4dbd-907f-e795a0cf2897.jpg",
						"details": "位于上海金山区吕巷镇白漾村生态林丛中，空中鸟瞰像不像中国地图-雄鸡呢？"
					},
					{
						"name": "停靠的战舰",
						"address": "广州市天河区海心沙公园",
						"longitude": "113.325147",
						"latitude": "23.111698",
						"scale": "15.5",
						"isBanner": false,
						"zan": 0,
						"imageUrl": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-6ad7a12a-0993-4c3e-8b0b-f6c4f77738b6/1c2248e1-51e7-41c0-a128-87578cb74dca.jpg",
						"details": "广州市天河区，被誉为广州旅游圣地，自建成以来成为游人心驰神往之地。"
					},
					{
						"name": "海水版太极图",
						"address": "海南省海口市秀英区南海明珠岛",
						"longitude": "110.237768",
						"latitude": "20.068638",
						"scale": "14",
						"isBanner": false,
						"zan": 0,
						"imageUrl": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-6ad7a12a-0993-4c3e-8b0b-f6c4f77738b6/27be0b3c-9349-4052-b7a1-68ef871027d7.jpg",
						"details": "位于海南省海口市秀英区南海明珠岛，空中鸟瞰就是那海水版的太极图。"
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
					console.log("获取数据成功",res);
				}).catch((e) => {
					console.log("获取数据失败",e);
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
					url: '/pages/map/map?json=' + json
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
