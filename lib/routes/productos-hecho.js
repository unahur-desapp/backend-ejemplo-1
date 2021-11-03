import express from 'express';
import { getInfoDeUnProducto, getProductos, addProductoConCompra } from '../controllers/productosHecho_controller';

import { withErrorHandling } from './utils';

const router = express.Router();

router.get('/', withErrorHandling(getProductos));
router.get('/:id', withErrorHandling(getInfoDeUnProducto));
router.post('/con-compra', withErrorHandling(addProductoConCompra));

export default router;
