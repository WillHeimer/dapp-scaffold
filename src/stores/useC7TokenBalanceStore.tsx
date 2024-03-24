import create, { State } from 'zustand';
import { Connection, PublicKey } from '@solana/web3.js';
import { getAccount, getAssociatedTokenAddress } from '@solana/spl-token';

interface UserC7TokenBalanceStore extends State {
  balance: number;
  getC7TokenBalance: (publicKey: PublicKey, connection: Connection) => void;
}

// Your C7 token's mint address. Replace it with your actual token's mint address.
const C7_TOKEN_MINT_ADDRESS = "C7xd4kHZQvfbMMEWF9sh47bgyV73sG3JiSMbQJNQYPGr";

const useC7TokenBalanceStore = create<UserC7TokenBalanceStore>((set, _get) => ({
  balance: 0,
  
  getC7TokenBalance: async (publicKey, connection) => {
    let balance = 0;
    try {
      const c7TokenMintAddress = new PublicKey(C7_TOKEN_MINT_ADDRESS);
      const c7TokenAddress = await getAssociatedTokenAddress(c7TokenMintAddress, publicKey);
      const accountInfo = await getAccount(connection, c7TokenAddress);
      // Adjusting the balance to account for the token's decimal places (9 decimals)
      balance = Number(accountInfo.amount) / Math.pow(10, 9);
    } catch (e) {
      console.log(`Error getting C7 token balance: `, e);
    }
    set(() => ({
      balance,
    }));
    console.log(`C7 token balance updated: `, balance);
  },
}));

export default useC7TokenBalanceStore;
