import Producto from "../models/productos";

export const getProducto = async (req, res) => {
    const productId = req.params.id;
    const product = await Producto.findByPk(productId);
    if (product) {
        res.json(product.toJSON());
    } else {
        res.status(404).json({ message: `Producto ${productId} no encontrado`});
    }
};
