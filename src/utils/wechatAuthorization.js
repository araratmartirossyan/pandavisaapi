const axios = require('axios')
const qs = require('qs')

const appID = 'wxa07eb02e9983ef10'
const appSecret = '1c0bda62298c1d52fe9d5323f54c28de'

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