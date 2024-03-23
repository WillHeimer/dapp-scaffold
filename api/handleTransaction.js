// api/handleTransaction.js
import { Keypair } from "@solana/web3.js";
import base58 from "base58";

export default async function handleTransaction(req, res) {
  if (req.method === "POST") {
    // Convert your stored base58 string secret key to a byte array
    const secretKey = base58.decode(process.env.KEY);
    const signer = Keypair.fromSecretKey(secretKey);

    // Now, `signer` is a `Signer` object that can be used with getOrCreateAssociatedTokenAccount
    // You can perform the necessary Solana operations here using `signer`

    res.status(200).json({ success: true });
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
