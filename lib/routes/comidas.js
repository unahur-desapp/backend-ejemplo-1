import express from 'express';
import { getCarnes, showPasta, toto } from '../controllers/comida_controller';

import { withErrorHandling } from './utils';

const router = express.Router();

router.get('/pastas', withErrorHandling(showPasta));
router.get('/toto', withErrorHandling(toto));
router.get('/carnes', withErrorHandling(getCarnes));

export default router;
