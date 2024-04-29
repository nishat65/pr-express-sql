const express = require('express');
const {
    createMenuItem,
    deleteMenuItem,
    getMenuItems,
    getMenuItem,
    updateMenuItem,
} = require('@/controllers/menuitems');
const { upload } = require('@/utils/helper');

const router = express.Router();

router
    .route('/')
    .get(getMenuItems)
    .post(upload.single('image'), createMenuItem);
router
    .route('/:id')
    .get(getMenuItem)
    .patch(updateMenuItem)
    .delete(deleteMenuItem);

module.exports = router;

// pr10-express-sql1/src/routes/menuitems.js
