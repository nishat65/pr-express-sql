const express = require('express');
const {
    getProfile,
    updateProfile,
    deleteProfile,
    updatePassword,
    uploadImage,
} = require('@/controllers/users');
const { authMiddleware } = require('@/middlewares/auth');
const { upload } = require('@/utils/helper');

const router = express.Router();

router.route('/profile/password').patch(authMiddleware, updatePassword);
router
    .route('/profile/image')
    .patch(authMiddleware, upload.single('image'), uploadImage);

router
    .route('/profile')
    .get(authMiddleware, getProfile)
    .patch(authMiddleware, updateProfile)
    .delete(authMiddleware, deleteProfile);

module.exports = router;
