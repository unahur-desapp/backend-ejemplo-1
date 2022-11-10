export const showPasta = async (req, res) => {
  res.json({ tipo: 'ñoquis', salsa: 'pesto' });
};

export const getCarnes = async (req, res) => {
  res.json(42);
};

export const toto = async (req, res) => {
  res.json({
    id: 1,
    codigo: 'PIL34',
    nombre: 'Pilas triple A',
    precio: '180.00',
    proveedor: 'Kiosco El Toto',
    createdAt: '2022-10-26T19:58:28.544Z',
    updatedAt: '2022-10-26T19:58:28.544Z',
    Compras: [
      {
        id: 1,
        proveedor: 'Mercado Central',
        fecha: '2021-08-23',
        precio: '190.00',
        cantidad: '3.00',
        createdAt: '2022-10-26T19:58:28.560Z',
        updatedAt: '2022-10-26T19:58:28.560Z',
        ProductoId: 1,
      },
      {
        id: 2,
        proveedor: 'Mercado Lateral',
        fecha: '2021-12-15',
        precio: '220.00',
        cantidad: '8.00',
        createdAt: '2022-10-26T19:58:28.560Z',
        updatedAt: '2022-10-26T19:58:28.560Z',
        ProductoId: 1,
      },
    ],
  });
};
