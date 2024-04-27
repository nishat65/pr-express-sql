const express = require('express');
const { profile } = require('@/controllers/users');
const { authMiddelware } = require('@/middlewares/auth');

const router = express.Router();

router.route('/profile').get(authMiddelware, profile);

module.exports = router;
