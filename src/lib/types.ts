export type OnboardingData = { network: "sol" | "eth" } | null;

export type WalletType = {
  name: string;
  publicKey: string;
  privateKey: string;
  path: string;
  accoutNo: number;
};
