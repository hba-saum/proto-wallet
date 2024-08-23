"use client";

import Onboarding from "@/components/Onboarding";
import Wallets from "@/components/Wallets";
import Navbar from "@/components/ui/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
  const [mnemonic, setMnemonic] = useState<string>("");

  useEffect(() => {
    setMnemonic(localStorage.getItem("mnemonic") ?? "");
  }, [mnemonic]);
  function handleOnboardingData(data: string) {
    setMnemonic(data);
  }

  return (
    <main>
      <Navbar />
      {mnemonic === "" ? (
        <Onboarding onboarding={handleOnboardingData} />
      ) : (
        <Wallets mnemonic={mnemonic} />
      )}
    </main>
  );
}
