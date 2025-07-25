import express from 'express'
import user from "../models/userModel.js"
import UserController from '../controllers/userController.js'
import middleware from "../middleware/auth.js"

const router=express.Router();
router.post("/login",UserController.login);
router.post("/Registration",UserController.register)
router.get("/getUserInfo",middleware,UserController.getUserInfo)
// router.get("/getAllUser",UserController.getAllUser)


export default router;