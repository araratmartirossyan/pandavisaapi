const { Users } = require('../config')
const { getOpenId } = require('../utils/wechatAuthorization')
const { calculateDays } = require('../utils/days')

module.exports = {
  getAllUsers: (req, res) =>
    Users.findAll()
      .then(data =>
        res.json(data)
      ),
  getUser: async(req, res) => {
    const { id } = req.params
    const foundUser = await Users.findOne({ openid: id })
    if (foundUser) {
      return res.status(200).json({ foundUser })
    }
  },
  updateUserProfile: async(req, res) => {
    const {
      params: { id },
      body: {
        start_date,
        expire_date,
        coridor
      },
      body
    } = req
    const updatedInfo = {
      ...calculateDays({ start_date, expire_date, coridor }),
      ...body,
      visa_info: true
    }
    await Users.findOne({ openid: id })
      .then(user => {
        if (user) {
          Users.update(
            { ...updatedInfo },
            { where: { id } }
          ).then(data =>
            res.status(200).json({
              user,
              updatedInfo
            })  
          )
        } else {
          return res.status(403).json({ error: 'User not found' })
        }
      })
  },
  signInWithWeChat: async({ body: { js_code, userInfo } }, res) => {
    await getOpenId(js_code)
      .then(async({ data }) => {
        if (data.errcode || data.errmsg) {
          return res.status(403).json({ error: data.errmsg })
        }
        const { unionid, openid } = data
        const foundUser = await Users.findOne({ openid })
        if (!foundUser) {
          new Users({
            js_code,
            unionid,
            openid,
            ...userInfo
          }).save()
            .then(createdUser =>
              res.json(createdUser)
            )
        } else {
          return res.status(200).json(foundUser)
        }
      })
  }
}
