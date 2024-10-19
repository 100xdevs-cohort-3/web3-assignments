import { useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { Send, CheckCircle } from 'lucide-react';

export function SendTransaction() {
  const { data: hash, sendTransaction, isLoading } = useSendTransaction();

  async function sendTx() {
    // Todo: use refs here
    const to = document.getElementById("to").value;
    const value = document.getElementById("value").value;
    sendTransaction({ to, value: parseEther(value) });
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Send Transaction</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="to" className="block text-sm font-medium text-gray-300 mb-1">Recipient Address</label>
          <input
            id="to"
            placeholder="0xA0Cf…251e"
            required
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="value" className="block text-sm font-medium text-gray-300 mb-1">Amount (ETH)</label>
          <input
            id="value"
            type="number"
            step="0.000000000000000001"
            placeholder="0.05"
            required
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={sendTx}
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center justify-center"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Send
            </>
          )}
        </button>
      </div>
      {hash && (
        <div className="mt-4 p-3 bg-green-800 rounded-md flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
          <div>
            <p className="font-medium">Transaction Sent!</p>
            <p className="text-sm text-gray-300 break-all">Hash: {hash}</p>
          </div>
        </div>
      )}
    </div>
  );
}