const express = require("express");
const userController = require("../controllers/userController");
const authenticate = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");
const router = express.Router();

router.get("/getProduct/", authenticate, userController.getProducts);
router.get("/getProductById/:id", authenticate, userController.getProductById);
router.delete("/product/:id", authenticate, userController.deleteProduct);
router.post("/product/", authenticate, userController.createProduct);
router.put("/product/:id", authenticate, userController.updateProduct);
router.get("/cart/", authenticate, userController.getCart);
router.put("/cart/", authenticate, userController.addCart);
router.delete("/cart/:id", authenticate, userController.deleteCart);
router.put(
    "/uploadSlip",
    authenticate,
    upload.fields([
        {
            name: "image",
            maxCount: 1,
        },
    ]),
    userController.uploadSlip
);
router.put("/addorder", authenticate, userController.addOrder);

module.exports = router;
