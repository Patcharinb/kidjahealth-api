const userService = require("../services/user-service");
const uploadService = require("../services/uploadService");
const fs = require("fs");

exports.getProducts = async (req, res, next) => {
    try {
        const rs = await userService.getProduct();
        res.json(rs);
    } catch (err) {
        next(err);
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        // const { name } = req.boby;
        // console.log(name);
        const rs = await userService.getProductById(id);

        res.json(rs);
    } catch (err) {
        next(err);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        // const { productName, price, quantity, image, description } = req.body;
        console.log(req.body);
        const rs = await userService.createProduct(req.body);

        res.json(rs);
    } catch (err) {
        next(err);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const rs = await userService.deleteProduct(id);
        res.json(rs);
    } catch (err) {
        next(err);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateValue = req.body;
        const rs = await userService.updateProduct(id, updateValue);
        res.json(rs);
    } catch (err) {
        next(err);
    }
};

exports.getCart = async (req, res, next) => {
    try {
        const rs = await userService.getCart(req.user.id);
        res.json(rs);
    } catch (err) {
        next(err);
    }
};

exports.addCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const check = await userService.checkCart(req.user.id, productId);
        if (check) {
            const newQuantity = check.quantity + +quantity;
            const rs = await userService.updateCart(
                req.user.id,
                productId,
                newQuantity
            );
            res.json(rs);
        } else {
            const rs = await userService.addCart(
                req.user.id,
                productId,
                +quantity
            );

            res.json(rs);
        }
    } catch (err) {
        next(err);
    }
};

exports.deleteCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        const rs = await userService.deleteCart(req.user.id, id);
        res.json(rs);
    } catch (err) {
        next(err);
    }
};

exports.uploadSlip = async (req, res, next) => {
    try {
        if (!req.files.image) {
            createError(" image  is require");
        }
        if (req.files.image) {
            const result = await uploadService.upload(req.files.image[0].path);
            const image = result.secure_url;
            res.status(200).json(image);
        }
    } catch (err) {
        next(err);
    } finally {
        if (req.files.image) {
            fs.unlinkSync(req.files.image[0].path);
        }
    }
};

exports.addOrder = async (req, res, next) => {
    try {
        const { cart, address, phone, totalPrice, paymentSlip } = req.body;
        const payload = {
            userId: req.user.id,
            address,
            phone,
            totalPrice,
            paymentSlip,
            status: 1,
        };
        const createdOrder = await userService.addOrder(payload);

        for (let item of cart) {
            const payload = {
                productId: item.productId,
                quantity: item.quantity,
                price: item.Product.price,
                orderId: createdOrder.id,
            };
            await userService.addOrderItem(payload);
        }

        res.json("success");
    } catch (err) {
        next(err);
    }
};
