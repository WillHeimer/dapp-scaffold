import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction, TransactionSignature } from "@solana/web3.js";
import {
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction,
} from "@solana/spl-token";
import { FC, useCallback, useState } from "react";
import { notify } from "../utils/notifications";

export const SendTransaction: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amountInTokens, setAmountInTokens] = useState<number>(0);

  const onClick = useCallback(async () => {
    let signature: TransactionSignature = "";

    try {
      if (!publicKey) {
        notify({ type: "error", message: `Wallet not connected!` });
        return;
      }

      const mintAddress = new PublicKey(
        "C7xd4kHZQvfbMMEWF9sh47bgyV73sG3JiSMbQJNQYPGr"
      );
      const recipientAddress = new PublicKey(
        "Goq6nbt5dgk5bAXDmXLkXNG1gUUmAqJyoVsL6vPuabd9"
      );

      // Convert the amount from tokens to the smallest unit
      const amount = amountInTokens * 1_000_000_000; // 1 token = 1_000_000_000 smallest unit

      // Get or create the token account for the sender
      const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        publicKey as any,
        mintAddress,
        publicKey
      );

      // Get or create the token account for the recipient
      const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        publicKey as any,
        mintAddress,
        recipientAddress
      );

      // Create the SPL Token transfer instruction using the converted amount
      const instructions = createTransferInstruction(
        senderTokenAccount.address, // source account
        recipientTokenAccount.address, // destination account
        publicKey, // owner of the source account
        amount, // amount to transfer in the smallest unit
        [] // multiSigners, if any
      );

      const transaction = new Transaction().add(instructions);
      signature = await sendTransaction(transaction, connection);

      await connection.confirmTransaction(signature, "confirmed");

      notify({
        type: "success",
        message: "Transaction successful!",
        txid: signature,
      });

      // Assuming this is where you want to save transaction data to the server
      const response = await fetch("/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publicKey: publicKey.toString(),
          amount: amountInTokens, // Send the amount in tokens
        }),
      });

      if (response.ok) {
        console.log("Transaction data saved successfully");
      } else {
        console.error("Failed to save transaction data");
      }
    } catch (error) {
      notify({
        type: "error",
        message: `Transaction failed!`,
        description: error.message,
      });
      console.error("Transaction failed!", error, signature);
    }
  }, [publicKey, sendTransaction, connection, amountInTokens]);

  return (
    <div className="flex flex-row justify-center" style={{ color: "black" }}>
      <input
        type="number"
        value={amountInTokens}
        onChange={(e) => setAmountInTokens(parseInt(e.target.value))}
      />
      <button
        className="btn bg-blue-500 hover:bg-blue-700 text-white"
        onClick={onClick}
        disabled={!publicKey}
      >
        $LOCK DIC
      </button>
    </div>
  );
};
