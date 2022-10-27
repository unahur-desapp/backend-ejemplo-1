import Producto from '../models/productos';

export async function fetchTodosLosProductos(conCompras) {
  return Producto.findAll(conCompras ? { include: 'Compras' } : {});
}
