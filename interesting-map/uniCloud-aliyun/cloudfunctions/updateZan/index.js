'use strict';
// exports.main = async (event, context) => {
// 	//event为客户端上传的参数
// 	console.log('event : ', event)
// 	//返回数据给客户端
// 	return {sum : event.a + event.b}
// };
// db.cmd.inc(1)
const db = uniCloud.database()
const collection = db.collection('address_info')

exports.main = async (event, context) => {
	// db.collection('address_info').where({
	// 	_id: '63088219abcff22faaa3c47e'
	// }).update({
	// 	zan: 2
	// }).then((res) => {
	// 	console.log("点赞成功", res);
	// 	return "点赞成功"
	// }).catch((e) => {
	// 	console.log("点赞失败", e);
	// 	return "点赞失败"
	// });


	// const dbJQL = res = await dbJQL.collection("address_info")
	// 	.where("_id=='63088219abcff22faaa3c47e'")
	// 	.update({
	// 		zan: 2
	// 	})
	// 	.then((res) => {
	// 		console.log("点赞成功", res);
	// 		return "点赞成功"
	// 	}).catch((e) => {
	// 		console.log("点赞失败", e);
	// 		return "点赞失败"
	// 	});
	
	const db = uniCloud.database();
	const res = await db.collection("address_info")
	return {
		code: 200,
		msg: "查询成功",
		data: res.data
	}
};
