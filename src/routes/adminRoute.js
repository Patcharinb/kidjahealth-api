const express = require("express");
const adminController = require("../controllers/adminController");
const upload = require("../middlewares/upload");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/getProduct", adminController.getProducts);
router.get("/getProductById/:id", adminController.getProductById);
router.delete("/product/:id", adminController.deleteProduct);
router.post("/product/", adminController.createProduct);
router.patch("/product/:id", adminController.updateProduct);

router.patch(
    "/product/:productId/image",
    upload.fields([
        {
            name: "image",
            maxCount: 1,
        },
    ]),
    adminController.uploadImage
);

router.get("/getOrder/", authenticate, adminController.getOrder);
module.exports = router;
