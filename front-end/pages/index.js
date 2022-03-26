import Head from 'next/head'
import React from "react"
import Image from 'next/image'
import { ethers } from "ethers";
import styles from '../styles/Home.module.css'

export default function Home() {
  const [currentAccount, setCurrentAccount] = React.useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      /*
      * Check if we're authorized to access the user's wallet
      */
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <>
      <h1>PrETHnup</h1>
      {!currentAccount &&
        <button className="connectButton"
          onClick={connectWallet}>
          Connect wallet
        </button>}
    </>
  )
}
