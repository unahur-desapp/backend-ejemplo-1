import express from 'express';
import {
  getCarnes,
  showPasta,
  showPescado,
} from '../controllers/comida_controller';

import { withErrorHandling } from './utils';

const router = express.Router();

router.get('/pastas', withErrorHandling(showPasta));
router.get('/carnes', withErrorHandling(getCarnes));
router.get('/pescados', withErrorHandling(showPescado));

export default router;
