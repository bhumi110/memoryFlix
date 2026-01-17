const express=require("express");
const router = express.Router();

const authController=require("../controllers/auth.controller.js");
const authMiddleware= require("../middleware/auth.middleware.js");


router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/me", authMiddleware, authController.getMe);
router.get("/status",authMiddleware, authController.status);

// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { session: false }),
//   (req, res) => {
//     const token = generateToken(req.user._id);

//     res.redirect(
//       `http://localhost:8080/auth-success?token=${token}`
//     );
//   }
// );

module.exports= router;
