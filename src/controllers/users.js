const { User } = require('../config')
const { getOpenId } = require('../utils/wechatAuthorization')
const { calculateDays } = require('../utils/days')
const { isNil, isEmpty } = require('ramda')

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const data = await User.findAll()
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).send(error)      
    }
  },

  removeUser: async ({ params: { id } }, res) => {
    try {
      await User.destroy({
        where: {
          openid: id
        }
      })
      return res.status(200).send({
        message: `User with id ${id} was removed!`
      })
    } catch (err) {
      return res.status(500).send(err)
    }
  },
 
  getUser: async(req, res) => {
    const { id = '' } = req.params
    try {
      const foundUser = await User.findOne({ where: { openid: id } })
      return res.status(200).json({ foundUser })
    } catch (err) {
      return res.status(500).json({ err })
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
    const updatedInfo = {
      ...calculateDays({ start_date, expire_date, corridor }),
      ...body,
      visa_info: true
    }
    try {
      const user = await User.findOne({ where: { id } })
      if (!isEmpty(user) || !isNil(user)) {
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
    } catch(err) {
      res.status(500).json({
        error: err,
        message: 'User not found'
      })
    }
 
  },

  signInWithWeChat: async({ body: { js_code, userInfo } }, res) => {
    try {
      const { data } = await getOpenId(js_code)
      if (data.errcode || data.errmsg) {
        return res.status(403).json({ error: data.errmsg })
      }
      const { unionid = '', openid = '' } = data
      const foundUser = await User.findOne({ where: { openid } })
      if (isEmpty(foundUser) || isNil(foundUser)) {
        const createdUser = await new User({
          js_code,
          unionid,
          openid,
          ...userInfo
        }).save()
        return res.status(200).json(createdUser)
      } else {
        return res.status(200).json(foundUser)
      }
    } catch (err) {
      return res.status(403).json({ error: err })
    }
    
  }
}
