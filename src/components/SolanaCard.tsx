import axios from "axios";

export default async function SolanaCard({ publicKey }: { publicKey: string }) {
  const getSolanaBalance = async (publicKey: string) => {
    const url =
      "https://solana-devnet.g.alchemy.com/v2/gV4-M2_jxFito3NFMB7pKuvq5uil2uG7";
    const body = {
      jsonrpc: "2.0",
      id: 1,
      method: "getBalance",
      params: [publicKey],
    };

    try {
      const response = await axios.post(url, body);
      return response.data.result.value;
    } catch (error) {
      console.error("Error fetching balance:", error);
      throw error;
    }
  };

  const result = await getSolanaBalance(publicKey);
  return <div>{result}</div>;
}
