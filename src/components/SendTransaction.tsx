import { useState, FC, useEffect, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  PublicKey,
  Transaction,
  TransactionSignature,
} from '@solana/web3.js';
import {
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction,
} from '@solana/spl-token';
import { notify } from '../utils/notifications';
import useC7TokenBalanceStore from '../stores/useC7TokenBalanceStore'; // Update this path accordingly

export const SendTransaction: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { balance, getC7TokenBalance } = useC7TokenBalanceStore();
  const [amount, setAmount] = useState<number>(0); // Default amount set to 0

  // Effect to get the user's C7 token balance
  useEffect(() => {
    if (publicKey && connection) {
      getC7TokenBalance(publicKey, connection);
    }
  }, [publicKey, connection, getC7TokenBalance]);

  const onClick = useCallback(async () => {
    let signature: TransactionSignature = "";

    try {
      if (!publicKey) {
        notify({ type: 'error', message: `Wallet not connected!` });
        return;
      }

      const mintAddress = new PublicKey("C7xd4kHZQvfbMMEWF9sh47bgyV73sG3JiSMbQJNQYPGr");
      const recipientAddress = new PublicKey("Goq6nbt5dgk5bAXDmXLkXNG1gUUmAqJyoVsL6vPuabd9");

      const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        publicKey as any,
        mintAddress,
        publicKey
      );

      const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        publicKey as any,
        mintAddress,
        recipientAddress
      );

      const instructions = createTransferInstruction(
        senderTokenAccount.address,
        recipientTokenAccount.address,
        publicKey,
        amount * Math.pow(10, 9), // Adjusting amount to token's decimal places
        []
      );

      const transaction = new Transaction().add(instructions);
      signature = await sendTransaction(transaction, connection);

      await connection.confirmTransaction(signature, "confirmed");

      notify({
        type: "success",
        message: "Transaction successful!",
        txid: signature,
      });
    } catch (error) {
      notify({
        type: "error",
        message: `Transaction failed!`,
        description: error.message,
      });
      console.error("Transaction failed!", error, signature);
    }
  }, [amount, publicKey, sendTransaction, connection]);

  return (
<div className="flex flex-col items-center">
<div style={{ fontFamily: "Courier New, Courier, monospace" }} className="text-lg font-semibold mb-2">

Amount: {amount.toLocaleString(undefined, {maximumFractionDigits: 0})} $DIC

</div>
  <input
    type="range"
    min="0"
    max={balance}
    value={amount}
    step="0.01"
    onChange={(e) => setAmount(parseFloat(e.target.value))}
    className="slider"
    style={{
      cursor: 'pointer',
      background: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,154,0,1) 50%, rgba(208,222,33,1) 100%)',
      border: '2px solid black',
      boxShadow: 'inset 0 0 5px #000',
    }}
  />
  <button
    className="btn mt-4"
    onClick={onClick}
    disabled={!publicKey}
    style={{
      background: 'linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,154,0,1) 50%, rgba(208,222,33,1) 100%)',
      boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.75)',
      color: 'white',
      fontFamily: '"Courier New", Courier, monospace',
      fontSize: '16px',
      padding: '10px 20px',
      border: '2px solid black',
      cursor: publicKey ? 'pointer' : 'default',
    }}
  >
    LOCK COCK
  </button>
</div>

  );
};
