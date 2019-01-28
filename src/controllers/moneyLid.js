const { MoneyLid, User } = require('../config')

module.exports = {
  getAllMoneyLids: async (req, res) => {
    try {
      const data = await MoneyLid.findAll({
        include: [
          {
            model: User
          }
        ]
      })
      return res.status(200).send(data)
    } catch (err) {
      throw err
    }
  },
  getMoneyLid: async ({ params: { id } }, res) => {
    try {
      const data = await MoneyLid.find({
        where: {
          id
        }
      })
      return res.status(200).send(data)
    } catch (err) {
      throw err
    }
  },
  createMoneyLid: async ({ body }, res) => {
    try {
      const data = await new MoneyLid({ ...body }).save()
      return res.status(200).send(data)
    } catch (err) {
      throw err
    }
  },
  updateMoneyLid: async ({ params: { id }, body }, res) => {
    try {
      await MoneyLid.update(
        { ...body },
        { where: { id } }
      )
      return res.status(200).send({
        status: 'Updated'
      })
    } catch (err) {
      throw err
    }
  },
  deleteMoneyLid: async ({ params: { id } }, res) => {
    try {
      await MoneyLid.destroy({
        where: {
          id
        }
      })
      return res.status(200).send({
        status: 'Deleted'
      })
    } catch (err) {
      throw err
    }
  }
}