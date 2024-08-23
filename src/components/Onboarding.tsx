"use client";

import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, MoveRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { generateMnemonic, validateMnemonic } from "bip39";
import MnemonicViewer from "./MnemonicViewer";

export default function Onboarding({
  onboarding,
}: {
  onboarding: (data: string) => void;
}) {
  const [view, setView] = useState<"default" | "create" | "import">("default");
  const [importedMnemonic, setImportedMnemonic] = useState("");
  const [importMsg, setImportMsg] = useState("");

  const mnemonic = generateMnemonic();

  function saveMnemonic(mnemonic: string) {
    localStorage.setItem("mnemonic", mnemonic);
  }

  const renderContent = () => {
    switch (view) {
      // default view
      default:
        return (
          <motion.div
            key="default"
            initial={{ opacity: 0, transform: "scale(0.9)" }}
            animate={{ opacity: 1, transform: "scale(1)" }}
            exit={{ opacity: 0, transform: "scale(0.9)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mx-auto my-12 flex max-w-lg flex-col items-center rounded-3xl border border-gray-300 p-12 shadow-md"
          >
            <Image src="/logo.webp" width={100} height={100} alt="logo" />
            <h1 className="mt-12 text-center text-3xl font-black">
              Welcome to ProtoWallet
            </h1>
            <h2 className="mt-2 text-center text-lg text-slate-600">
              Let&apos;s Begin.
            </h2>

            <Alert variant="destructive" className="mt-8">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                This wallet is for devnet/testnet only. It is not secure for
                real assets. Do not use for actual cryptocurrency transfers.
              </AlertDescription>
            </Alert>

            <div className="mt-16 grid w-full gap-2">
              <Button onClick={() => setView("create")}>
                Create A New Wallet
              </Button>
              <Button variant={"secondary"} onClick={() => setView("import")}>
                Import Wallet
              </Button>
            </div>
          </motion.div>
        );

      // create new mnemonic
      case "create":
        return (
          <motion.div
            key="create"
            initial={{ opacity: 0, transform: "scale(0.9)" }}
            animate={{ opacity: 1, transform: "scale(1)" }}
            exit={{ opacity: 0, transform: "scale(0.9)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mx-auto my-12 flex max-w-3xl flex-col items-center rounded-3xl border border-gray-300 p-12 shadow-md"
          >
            <h1 className="text-center text-3xl font-black">
              Secret Recovery Phrase
            </h1>
            <h2 className="mb-6 mt-2 text-center text-lg text-slate-600">
              Write down your 12-word secret recovery phrase.
            </h2>
            <MnemonicViewer
              mnemonic={mnemonic}
              className="w-full border-gray-200 shadow-sm"
            />

            <Button
              className="mt-8"
              onClick={() => {
                saveMnemonic(mnemonic);
                onboarding(mnemonic);
              }}
            >
              Start Creating Wallets <MoveRight className="ml-2 size-4" />
            </Button>
          </motion.div>
        );

      // import mnemonic
      case "import":
        return (
          <motion.div
            key="create"
            initial={{ opacity: 0, transform: "scale(0.9)" }}
            animate={{ opacity: 1, transform: "scale(1)" }}
            exit={{ opacity: 0, transform: "scale(0.9)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mx-auto my-12 flex max-w-3xl flex-col items-center rounded-3xl border border-gray-300 p-12 shadow-md"
          >
            <h1 className="text-center text-3xl font-black">
              Paste Your Mnemonic Phrase
            </h1>
            <h2 className="mb-6 mt-2 text-center text-lg text-slate-600">
              Import existing wallets with your 12-word secret recovery phrase.
            </h2>

            <div className="mb-2 h-6 w-full font-semibold">
              <p className="text-destructive">{importMsg}</p>
            </div>
            <Textarea
              placeholder="Paste your 12-word secret recovery phrase"
              className="w-full"
              value={importedMnemonic}
              onChange={(e) => setImportedMnemonic(e.target.value)}
            />

            {/* <Button className="mt-8" onClick={() => onboarding(mnemonic)}> */}
            <Button
              className="mt-8"
              onClick={() => {
                if (validateMnemonic(importedMnemonic)) {
                  saveMnemonic(importedMnemonic);
                  onboarding(importedMnemonic);
                } else {
                  setImportMsg("Invalid Mnemonic. Please try again.");
                }
              }}
            >
              Continue <MoveRight className="ml-2 size-4" />
            </Button>
          </motion.div>
        );
    }
  };

  return <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>;
}
