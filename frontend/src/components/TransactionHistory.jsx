import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/payments').then((res) => {
      setTransactions(res.data.data);
    });
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Transaction History</h3>
      {transactions.length === 0 ? (
        <p className="text-sm text-gray-500">No transactions yet.</p>
      ) : (
        <ul className="text-sm divide-y divide-gray-200">
          {transactions.map((txn, idx) => (
            <li key={idx} className="py-2">
              <span className="font-medium">{txn.currency} {txn.amount}</span> —
              <span className="text-gray-500 text-xs ml-2">
                {new Date(txn.time).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionHistory;
