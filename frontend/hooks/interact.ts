import { useEffect, useCallback, useState } from "react"
import { useContractFunction } from "@usedapp/core"
import { ethers, utils } from "ethers"
import Prethnup from '../../prethnup-sol/out/Prethnup.sol/Prethnup.json';

export const interact = (toAddr) => {
  const { abi } = Prethnup

  const [provider, setProvider] = useState({});
  let signer = null;

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(`provider: ${provider}`)
      setProvider(provider);
      signer = provider.getSigner();
    }
    else {
      console.log(`ethereum is undefined`)
    }
  }, []);

  const prethnupAddress = "0x101dda533984c0ed196e8643cdc889d4d58a7cd6"
  const prethnupInterface = new utils.Interface(abi)
  const prethnupContract = new ethers.Contract(prethnupAddress, prethnupInterface, signer)

  console.log(`signer: ${signer}`)
  console.log(`contract: ${prethnupContract}`)

  // stake
  const { send: stakeSend, state: stakeState } =
    useContractFunction(prethnupContract, "stake", {
      transactionName: "Stake Tokens",
    })

  const [amountToStake, setAmountToStake] = useState("0")

  useEffect(() => {
    stakeSend(amountToStake, toAddr)
  }, [amountToStake, toAddr])

  const [state, setState] = useState({})

  useEffect(() => {
    setState(stakeState)
  }, [stakeState])

  return { stakeSend }
}