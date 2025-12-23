import express from 'express'
import { protect } from '../middleware/AuthMiddleware.js'
import { isBuyer } from '../middleware/roleMiddleware.js'
import { CompleteOrder, CreateOrder } from '../controller/OrderController.js'

const route =express.Router()
route.post('/',protect,isBuyer,CreateOrder)
route.get('/:id',protect,CompleteOrder)

export default route