import express from 'express';
import usuarios from './usuarios';
import comidas from './comidas';
import productos from './productos';
import ciudades from './ciudades';
import compras from './compras';

const router = express.Router();

router.use('/api/comidas', comidas);
router.use('/api/usuarios', usuarios);
router.use('/api/productos', productos);
router.use('/api/ciudades', ciudades);
router.use('/api/compras', compras);

export default router;
