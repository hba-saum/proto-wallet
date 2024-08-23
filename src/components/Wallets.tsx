"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import { WalletType } from "@/lib/types";
import MnemonicViewer from "./MnemonicViewer";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { Wallet, HDNodeWallet, ethers } from "ethers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "./ui/separator";
import { Trash2, Plus } from "lucide-react";
import SolWallet from "./ui/SolWallet";
export default function Wallets({ mnemonic }: { mnemonic: string }) {
  const [solWallets, setSolWallets] = useState<WalletType[]>([]);
  const [solAccountNo, setSolAccountNo] = useState<number>(0);

  const [ethWallets, setEthWallets] = useState<WalletType[]>([]);
  const [ethAccountNo, setEthAccountNo] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem("solWallets", JSON.stringify(solWallets));
  }, [solWallets]);

  // deletes the local storage data
  function deleteEverything() {
    localStorage.clear();
    window.location.reload();
  }

  function generateSolWallet() {
    const seed = mnemonicToSeedSync(mnemonic);
    const accountNo = solAccountNo;
    const path = `m/44'/501'/${solAccountNo}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    setSolAccountNo(solAccountNo + 1);
    setSolWallets([
      ...solWallets,
      {
        name: `Wallet ${accountNo + 1}`,
        publicKey: keypair.publicKey.toBase58(),
        privateKey: bs58.encode(keypair.secretKey),
        path: path,
        accoutNo: accountNo,
      },
    ]);
  }

  // function generateEthWallet() {
  //   const seed = mnemonicToSeedSync(mnemonic);
  //   const path = `m/44'/60'/${ethAccountNo}'/0'`;
  //   const hdNode = HDNodeWallet.fromSeed(seed);
  //   const child = hdNode.derivePath(path);
  //   const privateKey = child.privateKey;
  //   const wallet = new ethers.Wallet(privateKey);
  //   setEthAccountNo(ethAccountNo + 1);
  //   console.log(wallet);
  // }

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
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Wallets</h1>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Secret Recovery Phrase</Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl p-12">
                <DialogHeader>
                  <DialogTitle>Secret Recovery Phrase</DialogTitle>
                  <DialogDescription>
                    Do not this with anyone.
                  </DialogDescription>
                  <MnemonicViewer mnemonic={mnemonic} />
                </DialogHeader>
              </DialogContent>
            </Dialog>
            {/* delete local storage */}
            <AlertDialog>
              <AlertDialogTrigger>
                <Trash2 className="text-destructive" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete everything?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will delete your secret recovery phrase and all
                    wallets.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={deleteEverything}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <Separator className="my-2" />

        {/* wallets section */}
        <Tabs defaultValue="solanaTab" className="mt-8">
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

          {/* solana wallets */}
          <TabsContent value="solanaTab">
            <div className="flex justify-end">
              <Button variant="link" onClick={generateSolWallet}>
                <Plus className="mr-2 size-4" />
                Add new Solana Wallet
              </Button>
            </div>

            <SolWallet wallets={solWallets} />
          </TabsContent>

          {/* ethereum wallets */}
          <TabsContent value="ethereumTab">
            <Button variant="link">
              <Plus className="mr-2 size-4" />
              Add new Ethereum Wallet
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}
