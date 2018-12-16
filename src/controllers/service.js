const { Service } = require('../config')

module.exports = {
  getAllServices: (req, res) =>
    Service.findAll()
    .then(data =>
      res.json(data)
    ),
  getService: ({ params: { id } }, res) =>
    Service.find({
      where: {
        id
      }
    }).then(data =>
      res.status(200)
        .send({
          data
        })
    ),
  createService: ({
      body: {
        poster,
        title,
        description,
        linkedId
      }
    }, res) =>
    new Service({
      description,
      poster,
      title,
      linkedId
    }).save().then(() =>
      res.status(200).send({
        status: 200
      })
    ),
    updateService: ({ params: { id }, body }, res) =>
      Service.update(
        { ...body },
        { where: { id } }
      ).then(() => 
        res.status(200)
          .send({
            status: 'Updated'
          })
      ),
    deleteService: ({ params: { id } }, res) =>
      Service.destroy({
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