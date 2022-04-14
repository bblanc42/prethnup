import { parseEther, PrethnupRPC } from "@utils/ethers"; // RPC

// Types
import type { PrethnupInterface } from "@utils/types";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}

// /**
//  * Collects data about a single pledge
//  * @param {number} pledgeId to collect data
//  * @returns {Promise<PrethnupInterface>}
//  */
// export async function collectSinglePledge(
//   pledgeId: number
// ): Promise<PrethnupInterface> {

//   console.log(PrethnupRPC);

//   const pledge: any[] = await PrethnupRPC.pledges(pledgeId);

//   return {
//     pledgeId,
//     owner: pledge[0],
//     other: pledge[1],
//     ownerClaimed: pledge[2],
//     otherClaimed: pledge[3],
//     ownerSigned: pledge[4],
//     otherSigned: pledge[5],
//     // parseEther(pledge[6])
//     amount: 0
//   };
// }

// // Return pledge data
// const pledges = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { id } = req.query;

//   res.send(await collectSinglePledge(Number(id)));
// };

// export default pledges;