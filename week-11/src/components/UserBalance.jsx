import { useAccount, useBalance, useDisconnect } from 'wagmi';
import { Wallet, LogOut, CopyIcon } from 'lucide-react';

export function UserBalance() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You might want to add a toast notification here
  };

  if (!address) return null;

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Wallet</h2>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400">Address</span>
          <button 
            onClick={() => copyToClipboard(address)}
            className="text-blue-400 hover:text-blue-300 transition-colors"
            title="Copy to clipboard"
          >
            <CopyIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="bg-gray-700 p-2 rounded break-all">
          {address}
        </div>
      </div>
      <div className="mb-6">
        <span className="text-gray-400">Balance</span>
        <div className="bg-gray-700 p-2 rounded mt-1 flex items-center">
          <Wallet className="w-5 h-5 mr-2" />
          {balance ? (
            <span>{balance.formatted} {balance.symbol}</span>
          ) : (
            <span>Loading...</span>
          )}
        </div>
      </div>
      <button
        onClick={() => disconnect()}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center justify-center"
      >
        <LogOut className="w-5 h-5 mr-2" />
        Disconnect
      </button>
    </div>
  );
}