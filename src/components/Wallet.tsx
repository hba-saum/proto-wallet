"use client";

// import { OnboardingData } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import MnemonicViewer from "./MnemonicViewer";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "./ui/separator";

export default function Wallet({ mnemonic }: { mnemonic: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, transform: "scale(0.9)" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="container"
    >
      {/* wallets */}
      <div className="mt-8">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Wallets</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Secret Recovery Phrase</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl p-12">
              <DialogHeader>
                <DialogTitle>Secret Recovery Phrase</DialogTitle>
                <DialogDescription>Do not this with anyone.</DialogDescription>
                <MnemonicViewer mnemonic={mnemonic} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <Separator className="my-2" />
        <Tabs defaultValue="solanaTab" className="mt-4">
          <TabsList>
            <TabsTrigger value="solanaTab">
              <img
                src="/solana-logo.png"
                className="mr-2 h-auto"
                width={18}
                alt="solana logo"
              />
              Solana
            </TabsTrigger>
            <TabsTrigger value="ethereumTab">
              <img
                src="/ethereum-logo.png"
                className="mr-2"
                alt="ethereum logo"
                width={14}
                style={{ height: "auto" }}
              />
              Ethereum
            </TabsTrigger>
          </TabsList>
          <TabsContent value="solanaTab">
            <Button variant="link">+ Add new Solana Wallet</Button>
            <div></div>
          </TabsContent>
          <TabsContent value="ethereumTab">
            <Button variant="link">+ Add new Ethereum Wallet</Button>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}
