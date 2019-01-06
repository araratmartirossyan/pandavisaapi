const { User } = require('../config')
const { getOpenId } = require('../utils/wechatAuthorization')
const { calculateDays } = require('../utils/days')

module.exports = {
  getAllUsers: (req, res) =>
    User.findAll()
      .then(data =>
        res.json(data)
      ),
  getUser: async(req, res) => {
    const { id } = req.params
    const foundUser = await User.findOne({ openid: id })
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
        corridor
      },
      body
    } = req
    console.log(
      body
    )
    const updatedInfo = {
      ...calculateDays({ start_date, expire_date, corridor }),
      ...body,
      visa_info: true
    }
    const user = await User.findOne({ openid: id })
    if (user) {
      await User.update(
        { ...updatedInfo },
        { where: { id } }
      )
      return res.status(200).json({
        user,
        updatedInfo
      })
    } else {
      res.status(500).json({
        error: true,
        message: 'User not found'
      })
    }
    return res.status(200).json({ updatedInfo })

  },
  signInWithWeChat: async({ body: { js_code, userInfo } }, res) => {
    await getOpenId(js_code)
      .then(async({ data }) => {
        if (data.errcode || data.errmsg) {
          return res.status(403).json({ error: data.errmsg })
        }
        const { unionid, openid } = data
        const foundUser = await User.findOne({ openid })
        if (!foundUser) {
          new User({
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
