const adminService = require("../services/admin-service");
const uploadService = require("../services/uploadService");
const createError = require("../utils/createError");
const { Product } = require("../models");
const fs = require("fs");
const { LONG } = require("mysql/lib/protocol/constants/types");

exports.getProducts = async (req, res, next) => {
    try {
        const rs = await adminService.getProduct();
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
        const rs = await adminService.getProductById(id);

        res.json(rs);
    } catch (err) {
        next(err);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const { productName, price, quantity, description } = req.body;

        const payload = {
            productName,
            price,
            quantity,
            description,
            image: "",
        };

        const rs = await adminService.createProduct(payload);
        res.json(rs);
    } catch (err) {
        next(err);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        const rs = await adminService.deleteProduct(id);
        res.json(rs);
    } catch (err) {
        next(err);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateValue = req.body;
        const rs = await adminService.updateProduct(id, updateValue);
        res.json(rs);
    } catch (err) {
        next(err);
    }
};

exports.uploadImage = async (req, res, next) => {
    const { productId } = req.params;

    try {
        if (!req.files.image) {
            createError(" image  is require");
        }
        updateValue = {};
        if (req.files.image) {
            const result = await uploadService.upload(req.files.image[0].path);
            updateValue.image = result.secure_url;
        }
        await Product.update(updateValue, { where: { id: productId } });
        res.status(200).json("success");
    } catch (err) {
        console.log(err);
        next(err);
    } finally {
        if (req.files.image) {
            fs.unlinkSync(req.files.image[0].path);
        }
    }
};

exports.getOrder = async (req, res, next) => {
    try {
        const rs = await adminService.getOrder();
        res.json(rs);
    } catch (err) {
        next(err);
    }
};
