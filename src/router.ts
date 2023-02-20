import { Router } from 'express';
import { body } from 'express-validator'
import { handleInputErrors } from './modules/middleware'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from './handlers/products';
import { createUpdate, deleteUpdate, getUpdate, getUpdates, updateUpdate } from './handlers/updates';
import { createUpdatePoint, deleteUpdatePoint, getUpdatePoint, getUpdatePoints, updateUpdatePoint } from './handlers/update-points';

const router = new Router()

/**
 * Products
 */
router.get('/products', getProducts)
router.get('/product/:id', getProduct)
router.post('/product', body('name').isString(), handleInputErrors, createProduct)
router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct)
router.delete('/product/:id', deleteProduct)

/**
 * Updates
 */
router.get('/updates', getUpdates)
router.get('/update/:id', getUpdate)
router.post('/update', 
    body('title').exists().isString(), 
    body('body').exists().isString(), 
    body('productId').exists().isString(), 
    createUpdate
)
router.put('/update/:id', 
    body('title').optional(), 
    body('body').optional(), 
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    body('version').optional(), 
    updateUpdate
)
router.delete('/update/:id', deleteUpdate)

/**
 * Update points
 */
router.get('/update-points', getUpdatePoints)
router.get('/update-point/:id', getUpdatePoint)
// router.post('/update-point',
//     body('name').toString(), 
//     body('description').toString(),
//     body('updateId').exists().toString(),
//     body('update').optional(),
//     handleInputErrors,
//     createUpdatePoint
// )
router.put('/update-point/:id', 
    body('name').optional().isString(), 
    body('description').optional().isString(), 
    updateUpdatePoint
)
router.delete('/update-point/:id', deleteUpdatePoint)

export default router;