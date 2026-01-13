const express=require("express");
const router = express.Router();

const authController=require("../controllers/auth.controller.js");
const authMiddleware= require("../middleware/auth.middleware.js");


router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/me", authMiddleware, authController.getMe);

module.exports= router;
