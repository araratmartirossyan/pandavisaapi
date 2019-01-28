const {
  User,
  Service,
  Lid,
  MoneyLid
} = require('../config')

module.exports = {
  // Create new event
  fetchAllCounts: async(req, res) => {
    const moneysCount = await MoneyLid.count()
    const lidsCount = await Lid.count()
    const servicesCount = await Service.count()
    const usersCount = await User.count()

    return res.json({
      moneysCount,
      lidsCount,
      servicesCount,
      usersCount
    })
  }
}