export const transformType = (type) => {
  if (type === 'monitores') {
    return 'monitor';
  } else if (type === 'impresoras') {
    return 'impresora';
  } else {
    throw new Error('Tipo de fabricante invalido');
  }
};
