const { Lid, User } = require('../config')

module.exports = {
  getAllLids: (req, res) =>
    Lid.findAll({
      includes: [
        {
          model: User
        }
      ]
    })
      .then(data =>
        res.json(data)
      ),
  getLid: ({ params: { id } }, res) =>
    Lid.find({
      where: {
        id
      }
    }).then(data =>
      res.status(200)
        .send({
          data
        })
    ),
  createLid: ({ body }, res) =>
    new Lid({ ...body }).save().then(() =>
      res.status(200).send({
        status: 200
      })
    ),
    updateLid: ({ params: { id }, body }, res) =>
      Lid.update(
        { ...body },
        { where: { id } }
      ).then(() => 
        res.status(200)
          .send({
            status: 'Updated'
          })
      ),
    deleteLid: ({ params: { id } }, res) =>
      Lid.destroy({
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