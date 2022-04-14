import { eth } from "@state/eth"; // ETH state
import { toast } from "react-toastify"; // Toast notifications
import { ethers } from "ethers"; // Ethers
import { createContainer } from "unstated-next"; // State
import { prethnupABI, PRETHNUP_BANK_ADDRESS } from "@utils/ethers"; // Utils

// https://github.com/Anish-Agnihotri/pawnft/blob/master/frontend/state/loan.ts
function usePrethnup() {
  const { provider } = eth.useContainer();

  async function collectPrethnupContract(): Promise<ethers.Contract | undefined> {
    console.log(provider)
    if (provider) {
      return new ethers.Contract(
        PRETHNUP_BANK_ADDRESS,
        prethnupABI,
        await provider.getSigner()
      );
    }
  }

  async function stake(otherAddr: string, amount: number): Promise<void> {
    const Prethnup = await collectPrethnupContract();

    if (Prethnup) {
      try {
        const tx = await Prethnup.stake(otherAddr, amount, {
          value: amount,
          gasLimit: 150000,
        });
        await tx.wait(1);
        toast.success(`Successfully staked`);
      } catch (e) {
        console.error(e);
        toast.error(`Error trying to stake`);
      }
    }
  }

  async function signBreak(): Promise<void> {
    const Prethnup = await collectPrethnupContract();

    if (Prethnup) {
      try {
        const tx = await Prethnup.signBreak({
          gasLimit: 75000,
        });
        await tx.wait(1);
        toast.success(`Successfully signed`);
      } catch (e) {
        console.error(e);
        toast.error(`Error trying to signBreak`);
      }
    }
  }

  async function withdraw(): Promise<void> {
    const Prethnup = await collectPrethnupContract();

    if (Prethnup) {
      try {
        const tx = await Prethnup.withdraw({
          gasLimit: 75000,
        });
        await tx.wait(1);
        toast.success(`Successfully withdrew`);
      } catch (e) {
        console.error(e);
        toast.error(`Error trying to withdraw`);
      }
    }
  }

  return {
    stake,
    signBreak,
    withdraw
  };
}

export const prethnup = createContainer(usePrethnup);
