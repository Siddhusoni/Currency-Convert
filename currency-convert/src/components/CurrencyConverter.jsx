import React, { useState, useEffect } from 'react';
import axios from 'axios';

const currencyData = {
  USD: { name: 'United States Dollar', symbol: '$', flag: '🇺🇸' },
  EUR: { name: 'Euro', symbol: '€', flag: '🇪🇺' },
  GBP: { name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  INR: { name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  JPY: { name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  AUD: { name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  CAD: { name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  CNY: { name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  AED: { name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  PKR: { name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰' },
};

const CurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [converted, setConverted] = useState(null);

  useEffect(() => {
    axios.get('https://open.er-api.com/v6/latest/USD')
      .then(res => setRates(res.data.rates))
      .catch(err => console.error('Error fetching rates', err));
  }, []);

  useEffect(() => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const baseInUSD = amount / rates[fromCurrency];
      const result = baseInUSD * rates[toCurrency];
      setConverted(result.toFixed(2));
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url('https://i.pinimg.com/originals/c4/05/e5/c405e59f2114f36defe07f92a771d9a5.gif')` }}>
      <div className="absolute inset-0  bg-opacity-70"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-xl w-full max-w-xl text-white">
          <h1 className="text-3xl font-bold text-center mb-6">🌍 Currency Converter</h1>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mb-4 p-3 rounded-lg bg-white/10 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter amount"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full p-3 bg-white/10 rounded-lg text-white"
            >
              {Object.keys(currencyData).map((code) => (
                <option key={code} value={code} className="text-black">
                  {currencyData[code].flag} {code} - {currencyData[code].name}
                </option>
              ))}
            </select>

            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full p-3 bg-white/10 rounded-lg text-white"
            >
              {Object.keys(currencyData).map((code) => (
                <option key={code} value={code} className="text-black">
                  {currencyData[code].flag} {code} - {currencyData[code].name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center mb-4">
            <button
              onClick={handleSwap}
              className="bg-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition"
            >
              🔁 Swap
            </button>
          </div>

          <div className="text-center text-2xl font-bold text-green-300 mt-4">
            {converted !== null ? (
              <>
                {amount} {currencyData[fromCurrency].symbol} = {converted} {currencyData[toCurrency].symbol}
              </>
            ) : (
              'Loading...'
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
