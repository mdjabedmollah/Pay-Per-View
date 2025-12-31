import express from 'express'
import { login, logout, me, register } from '../controller/AuthController.js'
import { protect } from '../middleware/AuthMiddleware.js'
const route=express.Router()
route.post('/register', register)
route.post('/login', login)
route.post('/logout', logout);
// route.get("/me", protect, me);


export default route