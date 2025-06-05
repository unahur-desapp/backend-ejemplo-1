export const showPasta = async (_req, res) => {
  // acá va la lógica de mi backend que se activa cuando se invoca este endpoint
  res.json({ tipo: 'ñoquis', salsa: 'pesto' });
};

export const getCarnes = async (req, res) => {
  const gramosAsNumber = Number(req.params.gramos);
  if (isNaN(gramosAsNumber)) {
    res
      .status(400)
      .json({ message: 'lo que me pasaste no es un número, fijate' });
  } else {
    res.json(42 + (Number(req.params.gramos) || 0));
  }
};

export const showPescado = async (_req, res) => {
  res.json([
    'abadejo',
    'merluza',
    'atún',
    'caballa',
    { especie: 'salmón', color: 'rosado' },
  ]);
};
