"use client";

import Onboarding from "@/components/Onboarding";
import Wallet from "@/components/Wallet";
import Navbar from "@/components/ui/Navbar";
import { useState } from "react";
import { OnboardingData } from "@/lib/types";

export default function Home() {
  const [mnemonic, setMnemonic] = useState<string | null>(null);

  function handleOnboardingData(data: string) {
    setMnemonic(data);
  }

  return (
    <main>
      <Navbar />
      {mnemonic === null ? (
        <Onboarding onboarding={handleOnboardingData} />
      ) : (
        <Wallet mnemonic={mnemonic} />
      )}
    </main>
  );
}
