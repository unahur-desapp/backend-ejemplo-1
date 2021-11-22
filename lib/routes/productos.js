import express from 'express';
import { addProductoConCompra, addProductoSolo, getProducto, getTodosLosProductos } from '../controllers/productos_controller';

import { withErrorHandling } from './utils';

const router = express.Router();

router.get('/', withErrorHandling(getTodosLosProductos));
router.get('/:id', withErrorHandling(getProducto));
router.post('/', withErrorHandling(addProductoSolo));
router.post('/conCompra', withErrorHandling(addProductoConCompra));

export default router;
