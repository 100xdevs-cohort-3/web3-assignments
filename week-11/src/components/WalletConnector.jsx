import { useConnect } from 'wagmi';
import { Wallet } from 'lucide-react';

const connectorIcons = {
  injected: '💉',
  walletConnect: '🔗',
  metaMask: '🦊',
  safe: '🔒',
  phantom: '👻',
  backpack: '🎒',
};

export  function WalletConnector() {
  const { connectors, connect } = useConnect();

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Connect Your Wallet</h2>
      <div className="grid grid-cols-2 gap-4">
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            className="flex items-center justify-center p-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <span className="mr-2 text-xl">
              {connectorIcons[connector.name.toLowerCase()] || <Wallet className="w-6 h-6" />}
            </span>
            <span className="font-medium">{connector.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}