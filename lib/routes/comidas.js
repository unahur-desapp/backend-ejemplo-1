import express from 'express';
import { showPasta } from '../controllers/comida_controller';

import { withErrorHandling } from './utils';

const router = express.Router();

router.get('/pastas', withErrorHandling(showPasta));

export default router;
