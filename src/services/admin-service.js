const { Product, Order, OrderItem } = require("../models");

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

exports.getOrder = () =>
    Order.findAll({
        include: [{ model: OrderItem, include: { model: Product } }],
    });

// const userRepository = require("../respositories/user-repository");
// exports.checkEmailOrMobileExist = async (emailOrMobile) => {
//   const existUser = await userRepository.getUserByEmailOrMobile(emailOrMobile);
//   return !!existUser;
// };

// exports.createUser = (user) => userRepository.createUser(user);
// exports.getUserByEmailOrMobile = async (emailOrMobile) => {
//   const user = await userRepository.getUserByEmailOrMobile(emailOrMobile);
//   return user;
// };

// exports.getUserById = (id) => userRepository.getUserById(id);
