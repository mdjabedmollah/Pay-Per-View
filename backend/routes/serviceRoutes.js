import express from 'express'
import { getSerVices, service } from '../controller/ServiceController.js'
import { protect } from '../middleware/AuthMiddleware.js'
import { isSeller } from '../middleware/roleMiddleware.js'

const route=express.Router()
route.get('/',getSerVices)
route.post('/',protect,isSeller,service)
export default route