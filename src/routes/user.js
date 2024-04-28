const express = require('express');
const {
    getProfile,
    updateProfile,
    deleteProfile,
    updatePassword,
    uploadImage,
} = require('@/controllers/users');
const { authMiddelware } = require('@/middlewares/auth');
const { upload } = require('@/utils/helper');

const router = express.Router();

router.route('/profile/password').patch(authMiddelware, updatePassword);
router
    .route('/profile/image')
    .patch(authMiddelware, upload.single('image'), uploadImage);

router
    .route('/profile')
    .get(authMiddelware, getProfile)
    .patch(authMiddelware, updateProfile)
    .delete(authMiddelware, deleteProfile);

module.exports = router;
