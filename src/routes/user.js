const express = require('express');
const {
    getProfile,
    updateProfile,
    deleteProfile,
    updatePassword,
} = require('@/controllers/users');
const { authMiddelware } = require('@/middlewares/auth');

const router = express.Router();

router.route('/profile/password').patch(authMiddelware, updatePassword);

router
    .route('/profile')
    .get(authMiddelware, getProfile)
    .patch(authMiddelware, updateProfile)
    .delete(authMiddelware, deleteProfile);

module.exports = router;
