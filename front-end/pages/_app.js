import { Provider, chain, defaultChains } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WalletLinkConnector } from 'wagmi/connectors/walletLink'
import ResponsiveAppBar from './navbar'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>PrETHnup</title>
      </Head>
      <ResponsiveAppBar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
