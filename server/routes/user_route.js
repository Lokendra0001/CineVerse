const { Router } = require('express');
const router = Router();
const { handleUserSignup, handleUserNormalLogin, handleGetCurrentUser, handleLogoutUser, } = require('../controllers/user');
const checkAuthentication = require('../middleware/auth');
// const upload = require('../config/cloudinayConfig')

router.post('/signUp', handleUserSignup)

router.post('/login', handleUserNormalLogin)

router.get('/getCurrentUser', checkAuthentication, handleGetCurrentUser);

router.get('/logoutUser', checkAuthentication, handleLogoutUser);

module.exports = router;