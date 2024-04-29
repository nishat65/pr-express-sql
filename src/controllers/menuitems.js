const MenuItems = require('@/models/menuitems');
const AppError = require('@/utils/error');
const log = require('@/utils/logger');
const { cloudUpload } = require('@/utils/helper');

exports.getMenuItems = async (req, res, next) => {
    try {
        const menuItems = await MenuItems.findAll();
        log.info('menu items fetched');
        return res.status(200).json({
            status: 'success',
            data: {
                menuItems,
            },
        });
    } catch (error) {
        log.error('error while fetching menu items: ', error);
        next(new AppError(500, error));
    }
};

exports.getMenuItem = async (req, res, next) => {
    try {
        const menuItem = await MenuItems.findOne({
            where: { id: req.params.id },
        });
        if (!menuItem) {
            log.error('menu item is not found');
            return next(new AppError(404, 'Menu item not found'));
        }
        log.info('menu item fetched');
        return res.status(200).json({
            status: 'success',
            data: {
                menuItem,
            },
        });
    } catch (error) {
        log.error('error while fetching menu item: ', error);
        next(new AppError(500, error));
    }
};

exports.createMenuItem = async (req, res, next) => {
    try {
        let { name, description, price, image, type, mealType, category } =
            req.body;
        const result = await cloudUpload(req.file.path, 'menuitems');
        image = result.url;
        const menuItem = await MenuItems.create({
            name,
            description,
            price,
            image,
            type,
            mealType,
            category,
        });
        log.info('menu item created');
        return res.status(201).json({
            status: 'success',
            data: {
                menuItem,
            },
        });
    } catch (error) {
        log.error('error while creating menu item: ', error);
        next(new AppError(500, error));
    }
};

exports.updateMenuItem = async (req, res, next) => {
    try {
        const { name, description, price, image, type, mealType, category } =
            req.body;
        const menuItem = await MenuItems.update(
            {
                name,
                description,
                price,
                image,
                type,
                mealType,
                category,
            },
            { where: { id: req.params.id } },
        );
        log.info('menu item updated');
        return res.status(200).json({
            status: 'success',
            data: {
                menuItem,
            },
        });
    } catch (error) {
        log.error('error while updating menu item: ', error);
        next(new AppError(500, error));
    }
};

exports.deleteMenuItem = async (req, res, next) => {
    try {
        const menuItem = await MenuItems.update(
            {
                isDeleted: true,
            },
            {
                where: { id: req.params.id },
            },
        );
        log.info('menu item deleted');
        return res.status(200).json({
            status: 'success',
            data: {
                menuItem,
            },
        });
    } catch (error) {
        log.error('error while deleting menu item: ', error);
        next(new AppError(500, error));
    }
};
