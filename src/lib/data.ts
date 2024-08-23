import axios, { AxiosResponse } from "axios";

interface JsonRpcResponse {
  jsonrpc: string;
  id: number;
  result: {
    context: {
      apiVersion: string;
      slot: number;
    };
    value: number;
  };
}

export async function getSolanaBalance(publicKey: string): Promise<number> {
  const url =
    "https://solana-devnet.g.alchemy.com/v2/gV4-M2_jxFito3NFMB7pKuvq5uil2uG7";

  const body = {
    jsonrpc: "2.0",
    id: 1,
    method: "getBalance",
    params: [publicKey],
  };

  try {
    const response: AxiosResponse<JsonRpcResponse> = await axios.post(
      url,
      body,
    );
    return response.data.result.value;
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
}
