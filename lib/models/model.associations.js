import Producto from './productos';
import Compra from './compras';

// associations
// leer pacientemente https://sequelize.org/v5/manual/associations.html
// lo de las FK la verdad que no lo hice, y habría que hacerlo

export default function injectAssociations() {
    Compra.belongsTo(Producto);
    Producto.hasMany(Compra, { as: "Compras" });
}
