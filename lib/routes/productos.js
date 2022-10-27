import express from 'express';
import {
  addProductoConCompra,
  addProductoSolo,
  getProducto,
  getTodosLosProductosConUltimaCompra,
  getTodosLosProductosConCompras,
  getTodosLosProductosSinCompras,
} from '../controllers/productos_controller';

import { withErrorHandling } from './utils';

const router = express.Router();

router.get('/', withErrorHandling(getTodosLosProductosSinCompras));
router.get('/conCompras', withErrorHandling(getTodosLosProductosConCompras));
router.get(
  '/conUltimaCompra',
  withErrorHandling(getTodosLosProductosConUltimaCompra)
);
router.get('/:id', withErrorHandling(getProducto));
router.post('/', withErrorHandling(addProductoSolo));
router.post('/conCompra', withErrorHandling(addProductoConCompra));

export default router;
