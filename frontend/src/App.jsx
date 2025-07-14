import React from 'react';
import PaymentForm from './components/PaymentForm';
import TransactionHistory from './components/TransactionHistory';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">💸 Mock Payment Portal</h1>
      <div className="w-full max-w-md space-y-6">
        <PaymentForm />
        <TransactionHistory />
      </div>
    </div>
  );
}

export default App;
