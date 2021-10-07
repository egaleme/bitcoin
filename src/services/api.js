import axios from 'axios';

// https://min-api.cryptocompare.com/data/pricemulti?fsyms=DOT,ADA&tsyms=USD,CNY,NGN,CAD
const instance = axios.create({
  baseURL: 'https://min-api.cryptocompare.com/data',
});

export const api = {
  getExchangeRates: () =>
    instance({
      method: 'GET',
      url: `pricemulti?fsyms=DOT,ADA&tsyms=USD,CNY,NGN,CAD`,
    }),
};
