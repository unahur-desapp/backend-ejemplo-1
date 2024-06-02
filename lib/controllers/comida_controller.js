export const showPasta = async (_req, res) => {
  // acá va la lógica de mi backend que se activa cuando se invoca este endpoint
  res.json({ tipo: 'ñoquis', salsa: 'pesto' });
};

export const getCarnes = async (req, res) => {
  res.json(42);
};

export const showPescado = async (req, res) => {
  res.json([
    'abadejo',
    'merluza',
    'atún',
    'caballa',
    { especie: 'salmón', color: 'rosado' },
  ]);
};
