import { DAppProvider, Mainnet, Rinkeby, useEtherBalance, useEthers } from "@usedapp/core";
import { formatEther } from '@ethersproject/units'
import ResponsiveAppBar from './navbar'

const INFURA_PROJECT_KEY = process.env.NEXT_PUBLIC_INFURA_PROJECT_KEY;

const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: `https://mainnet.infura.io/v3/${INFURA_PROJECT_KEY}`,
    [Rinkeby.chainId]: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_KEY}`,
  },
  multicallVersion: 2,
};

function App() {
  const { activateBrowserWallet, account } = useEthers()
  console.log(account)
  const etherBalance = useEtherBalance(account)
  console.log(etherBalance)
  return (
    <div>
      {!account && <button onClick={() => activateBrowserWallet()}>Connect</button>}
      {account && <p>Account: {account}</p>}
      {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
    </div>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <DAppProvider config={config}>
      <ResponsiveAppBar />
      <App />
      <Component {...pageProps} />
    </DAppProvider>
  );
}

export default MyApp;
