import * as React from 'react';
import {readString} from 'react-native-csv';

const portfoliosData = `purchase_id,coin,unit,total_cost,percentage_to_sell_at
1,ETH,0.27,780,25
2,GAS,30,455,
3,VET,500,45,
4,GAS,10,250,15
5,OXT,1000,1200,
6,ETH,0.5,1000,
7,BTC,1,13000,50
8,DOT,4,400,80
9,ADA,500,800,
10,UNI,2,30,10
11,FIL,1,250,80`;

export function usePortfolios() {
  const [portfolios, setPortfolios] = React.useState([]);

  React.useEffect(() => {
    const results = readString(portfoliosData, {header: true});
    const portfoliosSet = results.data.map(c => {
      if (c.percentage_to_sell_at == '') {
        return {
          purchase_id: Number(c.purchase_id),
          coin_token: c.coin,
          unit: Number(c.unit),
          total_cost: Number(c.total_cost),
          percentage_to_sell_at: 25,
        };
      } else {
        return {
          purchase_id: Number(c.purchase_id),
          coin_token: c.coin,
          unit: Number(c.unit),
          total_cost: Number(c.total_cost),
          percentage_to_sell_at: Number(c.percentage_to_sell_at),
        };
      }
    });
    setPortfolios(portfoliosSet);
  }, []);

  return {
    portfolios: portfolios,
  };
}
