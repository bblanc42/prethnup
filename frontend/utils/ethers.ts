import { ethers } from "ethers"
import Prethnup from '../../prethnup-sol/out/Prethnup.sol/Prethnup.json';

export const PRETHNUP_BANK_ADDRESS: string = "0x101dda533984c0ed196e8643cdc889d4d58a7cd6";

export const prethnupABI = Prethnup.abi

// Export Prethnup contract w/ RPC
export const PrethnupRPC = new ethers.Contract(
  PRETHNUP_BANK_ADDRESS,
  prethnupABI,
  new ethers.providers.JsonRpcProvider(
    `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_RPC}`,
    4
  )
);

/**
 * Converts BigNumber Ether value to number
 * @param {ethers.BigNumber} num bignumber ether value
 * @returns {number} formatted ether as number
 */
export function parseEther(num: ethers.BigNumber): number {
  return Number(ethers.utils.formatEther(num.toString()));
}