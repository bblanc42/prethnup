/* eslint-disable spaced-comment */
/// <reference types="react-scripts" />
import {
    Mainnet,
    DAppProvider,
    useEtherBalance,
    useEthers,
    Config,
} from '@usedapp/core'
// import helperConfig from "../helper-config.json"
// import networkMapping from "../chain-info/deployments/map.json"
import { constants } from "ethers"
// import brownieConfig from "../brownie-config.json"
import { Wallet } from "./wallet"

export type Token = {
    address: string
    name: string
}

export const Main = () => {
    // Show token values from the wallet
    // Get the address of different tokens
    // Get the balance of the users wallet

    // // send the brownie-config to our `src` folder
    // const { chainId, error } = useEthers()
    // console.log(chainId)
    // // const networkName = chainId ? helperConfig[chainId] : "dev"
    // // let stringChainId = String(chainId)
    // // const wethTokenAddress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero // brownie config

    // const wethTokenAddress = "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e"
    // const supportedTokens: Array<Token> = [
    //     {
    //         address: wethTokenAddress,
    //         name: "WETH"
    //     },
    // ]

    // return (
    //     <>
    //         <h2>Dapp Token App</h2>
    //         <Wallet supportedTokens={supportedTokens} />
    //     </>
    // )
    const { activateBrowserWallet, account } = useEthers()
    const etherBalance = useEtherBalance(account)
    return (
        <div>
            {!account && <button onClick={() => activateBrowserWallet()}>Connect</button>}
            {account && <p>Account: {account}</p>}
            {etherBalance && <p>Balance: {etherBalance}</p>}
        </div>
    )
}