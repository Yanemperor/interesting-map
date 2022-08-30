<template>
  <view class="bg">
    <view class="logo">
      <view class="">
        <u-image :src="logo" mode="heightFix" width="100" height="100"></u-image>
      </view>
      <label class="name">鸟瞰地理 V1.0.0</label>
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
      items: [
        {
          name: '商务合作',
          url: '/pages/about/business_cooperation',
        },
        {
          name: '更多小程序',
          url: '/pages/about/more_app',
        }
      ],
    }
  },
  onLoad() {},
  methods: {
	  cellClick(item) {
		console.log(item.url)
	  	uni.navigateTo({
	  		url: item.url,
	  	})
	  },
  },
}
</script>

<style>
.bg {
  background-color: white;
}
.logo {
  padding-top: 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.name {
  padding-top: 20px;
  color: #666666;
  font-size: 16px;
}
.cell-bg {
  padding-top: 32px;
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
