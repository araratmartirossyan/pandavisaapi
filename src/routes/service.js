const router = require('express-promise-router')()
const service = require('../controllers/service')

router.route('/').get(service.getAllServices)
router.route('/').post(service.createService)
router.route('/:id').delete(service.deleteService)
router.route('/:id').get(service.getService)
router.route('/:id').put(service.updateService)

module.exports = router
