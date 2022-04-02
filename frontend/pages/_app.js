import "../styles/globals.css";
import { DAppProvider, Mainnet, Rinkeby } from "@usedapp/core";
import { Main } from "./components/Main";

const INFURA_PROJECT_KEY = process.env.NEXT_PUBLIC_INFURA_PROJECT_KEY;

const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: `https://mainnet.infura.io/v3/${INFURA_PROJECT_KEY}`,
    [Rinkeby.chainId]: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_KEY}`,
  },
  multicallVersion: 2,
};

function MyApp({ Component, pageProps }) {
  return (
    <DAppProvider config={config}>
      <Main />
      {/* <Component {...pageProps} /> */}
    </DAppProvider>
  );
}

export default MyApp;
