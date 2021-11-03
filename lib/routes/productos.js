import express from 'express';
import { getProducto } from '../controllers/productos_controller';

import { withErrorHandling } from './utils';

const router = express.Router();

router.get('/:id', withErrorHandling(getProducto));

export default router;
