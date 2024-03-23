import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  Transaction,
  SystemProgram,
  TransactionSignature,
  VersionedTransaction,
} from "@solana/web3.js";
import {
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction, // Make sure this is imported correctly
} from "@solana/spl-token";
import { FC, useCallback } from "react";
import { notify } from "../utils/notifications";

export const SendTransaction: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

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
        "5RZYzXc9WnRBypqEF3EJTbUAKBja1QGAv3gtg2nq88D"
      );
      const amount = 1_000_000_000_000_000; // Amount in smallest unit

      // Get or create the token account for the sender
      const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        publicKey,
        mintAddress,
        publicKey
      );

      // Get or create the token account for the recipient
      const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        publicKey,
        mintAddress,
        recipientAddress
      );

      // Create the SPL Token transfer instruction
      const instructions = createTransferInstruction(
        senderTokenAccount.address, // source account
        recipientTokenAccount.address, // destination account
        publicKey, // owner of the source account
        amount, // amount to transfer
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
    } catch (error) {
      notify({
        type: "error",
        message: `Transaction failed!`,
        description: error.message,
      });
      console.error("Transaction failed!", error, signature);
    }
    const amount = 1_000_000_000_000_000; // Amount in smallest unit
    if (signature) {
      try {
        const response = await fetch("/api/transaction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            publicKey: publicKey.toString(),
            amount: amount,
          }),
        });

        if (response.ok) {
          console.log("Transaction data saved successfully");
        } else {
          console.error("Failed to save transaction data");
        }
      } catch (error) {
        console.error("Error sending transaction data to the server", error);
      }
    }
  }, [publicKey, sendTransaction, connection]);

  return (
    <div className="flex flex-row justify-center">
      <button
        className="btn bg-blue-500 hover:bg-blue-700 text-white"
        onClick={onClick}
        disabled={!publicKey}
      >
        Send SPL Token
      </button>
    </div>
  );
};
