import express from 'express';
import usuarios from './usuarios';
import comidas from './comidas';
import productosHecho from './productos-hecho';
import productos from './productos';
import ciudades from './ciudades';

const router = express.Router();

router.use('/api/usuarios', usuarios);
router.use('/api/comidas', comidas);
router.use('/api/productos-hecho', productosHecho);
router.use('/api/productos', productos);
router.use('/api/ciudades', ciudades);

export default router;
