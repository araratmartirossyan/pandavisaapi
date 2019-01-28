const router = require('express-promise-router')()
const { fetchAllCounts } = require('../controllers/stats')

router.route('/').get(fetchAllCounts)

module.exports = router
