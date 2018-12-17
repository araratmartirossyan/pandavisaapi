const { MoneyLid, User } = require('../config')

module.exports = {
  getAllMoneyLids: (req, res) =>
    MoneyLid.findAll({
      includes: [
        {
          model: User
        }
      ]
    })
      .then(data =>
        res.json(data)
      ),
  getMoneyLid: ({ params: { id } }, res) =>
    MoneyLid.find({
      where: {
        id
      }
    }).then(data =>
      res.status(200)
        .send({
          data
        })
    ),
  createMoneyLid: ({ body }, res) =>
    new MoneyLid({ ...body })
      .save()
      .then(() =>
        res.status(200).send({
          status: 200
        })
    ),
    updateMoneyLid: ({ params: { id }, body }, res) =>
      MoneyLid.update(
        { ...body },
        { where: { id } }
      ).then(() => 
        res.status(200)
          .send({
            status: 'Updated'
          })
      ),
    deleteMoneyLid: ({ params: { id } }, res) =>
      MoneyLid.destroy({
        where: {
          id
        }
      }).then(() =>
        res.status(200)
          .send({
            status: 'Deleted'
          })
      )
}