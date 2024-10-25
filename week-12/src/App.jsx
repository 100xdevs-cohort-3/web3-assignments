import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import { TokenLaunchpad } from './components/CreateToken';
import { useMemo, useState } from 'react';
import { MintToken } from './components/MintToken';
import { CreateCpPool } from './components/CreateCpPool';

function App() {
    const [token, setToken] = useState(null);
    const [mintDone, setMintDone] = useState(false);
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Mainnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    return (
        <ConnectionProvider endpoint={"https://api.devnet.solana.com/"}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                    <TokenLaunchpad onTokenCreate={(tokenMint) => {
                      setToken(tokenMint);
                    }} />
                    {token && token.toBase58()}
                    {token && <MintToken onDone={() => setMintDone(true)} mintAddress={token} />}
                    {mintDone && <CreateCpPool />}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default App
