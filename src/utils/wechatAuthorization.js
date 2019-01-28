const axios = require('axios')
const qs = require('qs')

const appID = 'wx765adbde70b2a2eb'
const appSecret = '2f74ad4b70eaf805aa81b80206ee178e'

const getOpenId = js_code => {
	const data = qs.stringify({ 
		appid: appID, 
		secret: appSecret, 
		js_code,
		grant_type: 'authorization_code' 
	})
	return axios.post('https://api.weixin.qq.com/sns/jscode2session', data)
}

module.exports = {
	getOpenId
}