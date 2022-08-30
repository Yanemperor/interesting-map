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
				items: [],
				page: 1,
				pageSize: 5,
				isLoadMore: true
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
				this.page = 1;
				console.log("获取数据");
				const db = uniCloud.database();
				db.collection("address_info").orderBy("zan", "desc").limit(this.pageSize).get().then((res) => {
					console.log("获取数据成功", res.result.data);
					this.items = res.result.data;
					this.setBanner();
					this.isLoadMore = true;
				}).catch((e) => {
					console.log("获取数据失败", e);
				});
			},
			loadMoreData() {
				console.log("加载更多数据");
				const db = uniCloud.database();
				db.collection("address_info").orderBy("zan", "desc").skip((this.page - 1) * this.pageSize)
					.limit(this.pageSize).get().then((res) => {
					console.log("加载更多数据成功", res.result.data);
					this.items.push(...res.result.data) 
					console.log("count", res.result.data.length);
					if (res.result.data.length < this.pageSize) {
						this.isLoadMore = false
					}
				}).catch((e) => {
					console.log("加载更多数据失败", e);
				});
			},
			setBanner() {
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
				console.log("加载跟多");
				if (this.isLoadMore) {
					this.page++;
					this.loadMoreData();
				}
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
					title: '鸟瞰地理', //分享的名称
					path: '/pages/index/index',
					mpId: 'wx120caeda2bba21e7' //此处配置微信小程序的AppId
				}
			},
			//分享到朋友圈
			onShareTimeline(res) {
				return {
					title: '鸟瞰地理',
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
