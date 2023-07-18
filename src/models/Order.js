module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        "Order",
        {
            totalPrice: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            paymentSlip: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            underscored: true,
            timestamps: true,
        }
    );

    Order.associate = (models) => {
        Order.belongsTo(models.User, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
        }),
            Order.hasMany(models.OrderItem, {
                foreignKey: {
                    name: "orderId",
                    allowNull: false,
                },
                onDelete: "RESTRICT",
            });
    };

    return Order;
};
