import { useEffect, useState } from "react"
import { useContractFunction } from "@usedapp/core"
import { utils } from "ethers"
import { Contract } from "@ethersproject/contracts"
import Prethnup from '../../prethnup-sol/out/Prethnup.sol/Prethnup.json';

export const interact = () => {
  const { abi } = Prethnup
  const prethnupAddress = "0x101dda533984c0ed196e8643cdc889d4d58a7cd6"
  const prethnupInterface = new utils.Interface(abi)
  const prethnupContract = new Contract(prethnupAddress, prethnupInterface)

  console.log(prethnupContract)

  // stake
  const { send: stakeSend, state: stakeState } =
    useContractFunction(prethnupContract, "stake", {
      transactionName: "Stake Tokens",
    })
  const [amountToStake, setAmountToStake] = useState("0")
  const [addrToSend, setAddrToSend] = useState("")

  useEffect(() => {
    stakeSend(amountToStake, addrToSend)
  }, [amountToStake, addrToSend])

  return { stakeSend }
}