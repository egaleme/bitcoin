import * as React from 'react';
import {readString} from 'react-native-csv';

const currencyData = `purchasing_currency,to_currency1,to_currency2,to_currency3
CAD,USD,NGN,EUR`;

export function useCurrency() {
  const [currency, setCurrency] = React.useState([]);

  React.useEffect(() => {
    const results = readString(currencyData, {header: true});
    setCurrency(results.data);
  }, []);

  return {
    currency: currency,
  };
}
