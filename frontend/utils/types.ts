export interface PrethnupInterface {
  pledgeId: number;
  owner: string;
  other: string;
  ownerClaimed: boolean;
  otherClaimed: boolean;
  ownerSigned: boolean;
  otherSigned: boolean;
  amount: number;
}
