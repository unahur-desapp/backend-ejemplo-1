import { last, omit, pick } from "lodash";
import Compra from "../models/compras-hecho";
import Producto from "../models/productos-hecho";

const FIXED_PRODUCT = {
    id: 1,
    codigo: 'AFX82',
    nombre: 'Agua oxigenada',
    precio: 350,
    proveedor: 'Chino de la vuelta',
}

export const getInfoDeUnProductoFixed = async (req, res) => {
    const idProducto = req.params.id;
    res.json({...FIXED_PRODUCT, id: idProducto });
};


// para ver cómo incluir associations en queries
// - manual: https://sequelize.org/master/manual/eager-loading.html
// - un artículo que puede ser útil: https://blog.agney.dev/sequelize-associations-fetch/

export const getInfoDeUnProducto = async (req, res) => {
    const idProducto = req.params.id;
    const productoBD = await Producto.findByPk(idProducto, { include: 'Compras'} );

    // hay que verificar si vino o no un producto
    if (productoBD) {
        // conviene siempre pasarle toJSON a lo que sale como response de un endpoint
        res.json(productoBD.toJSON());
    } else {
        res.status(404).json({ message: `No se encontró producto con id ${idProducto}`})
    }
};

// acá no hay 404 porque de última si no hay productos 
// se devuelve la lista vacía y listo
export const getProductos = async (req, res) => {
    const productosBD = await Producto.findAll({ include: 'Compras' });
    const productosConTodasLasCompras = productosBD.map(prod => prod.toJSON());
    const productosConUltimaCompra = productosConTodasLasCompras.map(prod => {
        const productoListo = omit(prod, ["Compras"]);
        productoListo.ultimaCompra = prod.Compras.length > 0 ? last(prod.Compras) : {}
        return productoListo;
    });
    res.json(productosConUltimaCompra);
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
    datosDeLaCompra.ProductoHechoId = dbResponseProducto.id;
    const compra = Compra.build(datosDeLaCompra);
    const dbResponseCompra = await compra.save();

    res.json({ producto: dbResponseProducto, compra: dbResponseCompra });
}

export const addProductoConCompra2 = async (req, res) => {
    const productoConCompraData = req.body;
    const datosDelProducto = pick(productoConCompraData, ["codigo", "nombre", "precio", "proveedor"]);
    const datosDeLaCompra = pick(productoConCompraData, ["precio", "proveedor", "fecha", "precio", "cantidad"]);
    const productoConCompraParaCreate = { ...datosDelProducto, Compras: [datosDeLaCompra] };

    const dbResponse = await Producto.create(productoConCompraParaCreate, { include: ['Compras'] });

    // en este caso no anda build + save, *hay* que hacerlo usando create
    // ver en https://sequelize.org/v5/class/lib/model.js~Model.html 
    // que el save no acepta include entre los options
    // const productoConCompra = Producto.build(productoConCompraParaCreate);
    // const dbResponse = await productoConCompra.save({ include: ['Compras'] });      

    res.json(dbResponse);
}

