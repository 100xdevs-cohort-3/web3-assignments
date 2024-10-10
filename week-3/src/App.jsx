import './App.css'
import { SolanaWallet } from './SolanaWallet'
import { EthWallet } from './EthWallet'

function App() {
  return (
    <div className="app-container">
      <div className="wallet-row">
        <span className="wallet-label">Solana:</span>
        <SolanaWallet />
      </div>
      <div className="wallet-row">
        <span className="wallet-label">Ethereum:</span>
        <EthWallet />
      </div>
    </div>
  )
}

export default App