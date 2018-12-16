const router = require('express-promise-router')()
const users = require('../controllers/users')

router.route('/').get(users.getAllUsers)
router.route('/wechat').post(users.signInWithWeChat)
router.route('/:id').get(users.getUser)
router.route('/:id').put(users.updateUserProfile)

module.exports = router
