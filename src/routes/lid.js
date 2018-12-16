const router = require('express-promise-router')()
const {
  getAllLids,
  createLid,
  deleteLid,
  getLid,
  updateLid
} = require('../controllers/lid')

const {
  getAllMoneyLids,
  getMoneyLid,
  createMoneyLid,
  updateMoneyLid,
  deleteMoneyLid
} = require('../controllers/moneyLid')

// money Lid
router.route('/exchanges/').get(getAllMoneyLids)
router.route('/exchanges/').post(createMoneyLid)
router.route('/exchanges/:id').delete(deleteMoneyLid)
router.route('/exchanges/:id').get(getMoneyLid)
router.route('/exchanges/:id').put(updateMoneyLid)

// Normal lid
router.route('/lids/').get(getAllLids)
router.route('/lids/').post(createLid)
router.route('/lids/:id').delete(deleteLid)
router.route('/lids/:id').get(getLid)
router.route('/lids/:id').put(updateLid)

module.exports = router