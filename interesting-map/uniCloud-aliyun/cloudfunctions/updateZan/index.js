'use strict';
const db = uniCloud.database()
const collection = db.collection('address_info')
const dbCmd = db.command
exports.main = async (event, context) => {
	const db = uniCloud.database();
	const res = await collection.doc(event.id).update({
		"zan" : dbCmd.inc(1)
	})
	return {
		code: 200,
		msg: "查询成功"
	}
};
