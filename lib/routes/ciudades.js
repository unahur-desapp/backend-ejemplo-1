import express from 'express';
import { getCiudades, getCiudad } from '../controllers/ciudades_controller';

import { withErrorHandling } from './utils';

const router = express.Router();

router.get('/', withErrorHandling(getCiudades));
router.get('/:nombre', withErrorHandling(getCiudad));

export default router;
