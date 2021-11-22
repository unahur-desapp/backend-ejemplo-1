import { maxBy, omit, pick } from "lodash";
import Compra from "../models/compras";
import Producto from "../models/productos";

export const getProducto = async (req, res) => {
    const productId = req.params.id;
    const product = await Producto.findByPk(productId, { include: 'Compras' });
    if (product) {
        res.json(product.toJSON());
    } else {
        res.status(404).json({ message: `Producto ${productId} no encontrado`});
    }
};

export const getTodosLosProductos = async (req, res) => {
    const productsDB = await Producto.findAll({ include: 'Compras' });

    const productsConUltimaCompra = productsDB.map(productDB => {
        // le paso el "toJSON"
        const product = productDB.toJSON();
        // primero le quito "Compras"
        const productConUltimaCompra = omit(product, ["Compras"]);
        // ahora le agrego "ultimaCompra"
        if (product.Compras.length > 0) {
            productConUltimaCompra.ultimaCompra = maxBy(product.Compras, "fecha");
        }
        return productConUltimaCompra;
    });

    res.json(productsConUltimaCompra);
};

export const getTodosLosProductosQuery = async (req, res) => {
    const products = await Producto.findAll({ include: 'Compras' });

    // si no hay productos, que devuelva la lista vacia
    res.json(products.map(product => product.toJSON()));

    // si quisiera 404 si no hay productos
    // if (products.length > 0) {
    //     res.json(products.map(product => product.toJSON()));
    // } else {
    //     res.status(404).json({ message: `No hay productos` });
    // }
};

/*
 * codigo / nombre / proveedor / precio
 */
export const addProductoSolo = async (req, res) => {
    const datosDelProducto = req.body;

    // creo el producto
    // paso 1 - creo la instancia, esto no va a la base
    // const producto = Producto.build(datosDelProducto);
    // paso 2 - mando el INSERT
    // const dbResponseProducto = await producto.save();

    // lo mismo pero abreviado
    const dbResponseProducto = await Producto.create(datosDelProducto);

    res.json({ dbResponseProducto });
}


/*
 * codigo / nombre / proveedor / precio / fecha / cantidad
 */
export const addProductoConCompra = async (req, res) => {
    const productoConCompraData = req.body;
    const datosDelProducto = pick(productoConCompraData, ["codigo", "nombre", "precio", "proveedor"]);
    const datosDeLaCompra = pick(productoConCompraData, ["precio", "proveedor", "fecha", "precio", "cantidad"]);

    // primero creo el producto
    const producto = Producto.build(datosDelProducto);
    const dbResponseProducto = await producto.save();

    // completo el id del producto en la compra y creo la compra - la única forma que encontré
    datosDeLaCompra.ProductoId = dbResponseProducto.id;
    const compra = Compra.build(datosDeLaCompra);
    const dbResponseCompra = await compra.save();

    res.json({ producto: dbResponseProducto, compra: dbResponseCompra });
}

