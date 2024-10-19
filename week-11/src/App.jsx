import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './config/WalletConfig'
import { WalletConnector } from './components/WalletConnector'
import { UserBalance } from './components/UserBalance'
import { SendTransaction } from './components/SendTransaction'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}> 
        <div className='flex justify-center items-center w-[100%] h-screen'>
        <WalletConnector/>
        <UserBalance/>
        <SendTransaction/>
        </div>
      </QueryClientProvider> 
    </WagmiProvider>
  )
}

export default App;
