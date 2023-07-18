const { Product, Cart, Order, OrderItem } = require("../models");

exports.getProduct = () => Product.findAll();

exports.getProductById = (id) =>
    Product.findOne({
        where: { id: id },
    });

exports.createProduct = (input) => {
    // const { productName, price, quantity, image, description } = input;
    // return Product.create({
    //   productName,
    //   price,
    //   quantity,
    //   image,
    //   description,
    // });
    return Product.create(input);
};
exports.deleteProduct = (id) =>
    Product.destroy({
        where: { id: id },
    });

exports.updateProduct = (id, updateValue) =>
    Product.update(
        { ...updateValue },
        {
            where: { id: id },
        }
    );

exports.getCart = (userId) =>
    Cart.findAll({ where: { userId: userId }, include: { model: Product } });

exports.checkCart = (userId, productId) =>
    Cart.findOne({ where: { userId: userId, productId: productId } });

exports.addCart = (userId, productId, quantity) =>
    Cart.create({ userId: userId, productId: productId, quantity: quantity });

exports.updateCart = (userId, productId, quantity) =>
    Cart.update(
        { quantity: quantity },
        { where: { userId: userId, productId: productId } }
    );
exports.deleteCart = (userId, productId) =>
    Cart.destroy({
        where: { userId, productId },
    });

exports.addOrder = (payload) => Order.create(payload);

exports.addOrderItem = (payload) => OrderItem.create(payload);
