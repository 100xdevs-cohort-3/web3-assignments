import React, { useState, useRef } from 'react';
import { useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export  function SendTransaction() {
  const [transactionStatus, setTransactionStatus] = useState(null);
  const { data: hash, sendTransaction, isLoading, isSuccess, isError } = useSendTransaction();
  
  const toRef = useRef();
  const valueRef = useRef();

  async function handleSendTransaction(e) {
    e.preventDefault();
    const to = toRef.current.value;
    const value = valueRef.current.value;
    
    try {
      await sendTransaction({ to, value: parseEther(value) });
    } catch (error) {
      console.error('Failed to send transaction:', error);
      setTransactionStatus('error');
    }
  }

  React.useEffect(() => {
    if (isSuccess) setTransactionStatus('success');
    if (isError) setTransactionStatus('error');
  }, [isSuccess, isError]);

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Send Transaction</h2>
      <form onSubmit={handleSendTransaction} className="space-y-4">
        <div>
          <label htmlFor="to" className="block text-sm font-medium text-gray-400 mb-1">Recipient Address</label>
          <input
            id="to"
            ref={toRef}
            placeholder="0xA0Cf…251e"
            required
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="value" className="block text-sm font-medium text-gray-400 mb-1">Amount (ETH)</label>
          <input
            id="value"
            ref={valueRef}
            type="number"
            step="0.000000000000000001"
            placeholder="0.05"
            required
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center justify-center"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Send Transaction
            </>
          )}
        </button>
      </form>
      {transactionStatus && (
        <div className={`mt-4 p-3 rounded-md ${transactionStatus === 'success' ? 'bg-green-800' : 'bg-red-800'}`}>
          {transactionStatus === 'success' ? (
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
              <span>Transaction sent successfully!</span>
            </div>
          ) : (
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
              <span>Transaction failed. Please try again.</span>
            </div>
          )}
        </div>
      )}
      {hash && (
        <div className="mt-4 p-3 bg-gray-700 rounded-md break-all">
          <span className="font-medium">Transaction Hash:</span> {hash}
        </div>
      )}
    </div>
  );
}