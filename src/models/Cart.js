module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: true,
    }
  );

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    }),
      Cart.belongsTo(models.Product, {
        foreignKey: {
          name: "productId",
          allowNull: false,
        },
        onDelete: "RESTRICT",
      });
  };

  return Cart;
};
