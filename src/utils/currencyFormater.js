export const currencyFormater = x => {
  const n = Number(x).toFixed(2);
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
