import * as React from 'react';
import create from 'zustand';

import {Portfolios} from '../models/portfolios';

export const usePortfolioStore = create((set, get) => ({
  portfolios: Portfolios.filter(c => c.percentage_to_sell_at !== null),
}));
