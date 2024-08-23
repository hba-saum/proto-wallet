import { getSolanaBalance } from "@/lib/data";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default async function SolBalance({ publicKey }: { publicKey: string }) {
  const balance = await getSolanaBalance(publicKey);
  const sol = balance / LAMPORTS_PER_SOL;
  return <div className="h-12 text-center text-4xl font-bold">{sol} SOL</div>;
}
