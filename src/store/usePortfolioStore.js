import * as React from 'react';
import create from 'zustand';

import {api} from '../services/api';

export const usePortfolioStore = create((set, get) => ({
  currency: 'CAD',
  xchangeRate: {},
  portfolios: [],
  setPortfolios: data => {
    set({portfolios: data});
  },
  getXchangeRate: async () => {
    try {
      const res = await api.getExchangeRates();

      set({xchangeRate: res.data});
    } catch (error) {
      console.log(error);
    }
  },
  convertCurrency: (type, currency, Portfolios) => {
    const key0 = Object.keys(get().xchangeRate)[0];
    const values0 = Object.values(get().xchangeRate)[0];
    const currentCurrency0 = Object.values(get().xchangeRate)[0]['CAD'];
    const key1 = Object.keys(get().xchangeRate)[1];
    const values1 = Object.values(get().xchangeRate)[1];
    const currentCurrency1 = Object.values(get().xchangeRate)[1]['CAD'];

    if (type == key0) {
      for (let x in values0) {
        if (x == currency) {
          set({
            portfolios: Portfolios.map(c => {
              return {
                purchase_id: c.purchase_id,
                coin_token: c.coin_token,
                unit: c.unit,
                total_cost: Number(
                  (c.total_cost * Object.values(get().xchangeRate)[0][x]) /
                    currentCurrency0,
                ),
                percentage_to_sell_at: c.percentage_to_sell_at,
              };
            }),
            currency: currency,
          });
        }
      }
    } else if (type == key1) {
      for (let x in values1) {
        if (x == currency) {
          set({
            portfolios: Portfolios.map(c => {
              return {
                purchase_id: c.purchase_id,
                coin_token: c.coin_token,
                unit: Number(c.unit),
                total_cost: Number(
                  (c.total_cost * Object.values(get().xchangeRate)[1][x]) /
                    currentCurrency1,
                ),
                percentage_to_sell_at: c.percentage_to_sell_at,
              };
            }),
            currency: currency,
          });
        }
      }
    } else {
      set({
        portfolios: Portfolios.map(c => {
          return {
            purchase_id: c.purchase_id,
            coin_token: c.coin_token,
            unit: Number(c.unit),
            total_cost: Number(c.total_cost),
            percentage_to_sell_at: c.percentage_to_sell_at,
          };
        }),
        currency: 'CAD',
      });
    }

    // return currentCurrency1;
  },
}));
