"use client";

import { Suspense, useEffect, useState, memo } from "react";
import { Check, ChevronsUpDown, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { WalletType } from "@/lib/types";
import SolBalance from "../SolBalance";
import { toast } from "sonner";
import WalletBalSkeleton from "../WalletBalSkeleton";

export default function SolWallet({ wallets }: { wallets: WalletType[] }) {
  const [open, setOpen] = useState(false);
  const [currWallet, setCurrWallet] = useState<WalletType | null>(null);
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  useEffect(() => {
    setCurrWallet(wallets[wallets.length - 1]);
  }, [wallets]);

  function copy(privateKey: string, name: string) {
    navigator.clipboard.writeText(privateKey);
    toast.success(`${name} copied to clipboard`);
  }
  return (
    <div className="w-full rounded-lg border border-gray-300 p-12 shadow-sm">
      <div className="flex w-full justify-center">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between rounded-full p-6"
            >
              {currWallet ? currWallet.name : "Select Wallet..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Wallet..." />
              <CommandList>
                <CommandEmpty>No Wallet found.</CommandEmpty>
                <CommandGroup>
                  {wallets.map((wallet) => (
                    <CommandItem
                      key={wallet.publicKey}
                      value={wallet.name}
                      onSelect={() => {
                        setCurrWallet(wallet);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          currWallet?.name === wallet.name
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {wallet.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* wallet */}
      <div>
        {currWallet && (
          <div className="mt-8">
            <Suspense fallback={<WalletBalSkeleton />}>
              <MemoizedWallet publicKey={currWallet.publicKey} />
            </Suspense>

            <div className="mt-8">
              <h2 className="text-lg font-semibold">Public key</h2>
              <div
                className="mt-3 flex cursor-pointer items-center justify-between rounded-md bg-slate-100 p-4"
                onClick={() => copy(currWallet.publicKey, "Public key")}
              >
                {currWallet.publicKey}
                <Copy className="size-4" />
              </div>
            </div>

            <div className="mt-8">
              <div className="flex gap-4">
                <h2 className="text-lg font-semibold">Private key</h2>
                <button
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    showPrivateKey
                      ? "border-red-300 bg-red-200 text-red-800"
                      : "border-green-300 bg-green-200 text-green-800"
                  }`}
                  onClick={() => setShowPrivateKey(!showPrivateKey)}
                >
                  {showPrivateKey ? "Hide" : "Show"}
                </button>
              </div>
              <div
                className="mt-3 flex cursor-pointer items-center justify-between rounded-md bg-slate-100 p-4"
                onClick={() => copy(currWallet.privateKey, "Private key")}
              >
                {showPrivateKey
                  ? currWallet.privateKey
                  : Array(currWallet.privateKey.length).fill("*").join("")}
                <Copy className="size-4" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
const MemoizedWallet = memo(function solWallet({
  publicKey,
}: {
  publicKey: string;
}) {
  return <SolBalance publicKey={publicKey} />;
});
