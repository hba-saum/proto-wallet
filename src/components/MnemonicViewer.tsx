"use client";
import { Separator } from "@/components/ui/separator";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function MnemonicViewer({
  mnemonic,
  className,
}: {
  mnemonic: string;
  className?: string;
}) {
  function handleCopyMnemonic() {
    navigator.clipboard.writeText(mnemonic);
    toast.success("Copied to clipboard", {
      description: "Use this mnemonic phrase to restore your wallet",
    });
  }

  return (
    <div onClick={handleCopyMnemonic}>
      <div
        className={cn(className, "mt-4 cursor-pointer rounded-2xl border p-4")}
      >
        <div className="grid grid-cols-2 md:grid-cols-4">
          {mnemonic.split(" ").map((word, i) => {
            return (
              <div key={word} className="p-4">
                <span className="inline-block w-8 text-slate-600">{i + 1}</span>
                <span className="font-semibold text-slate-700">{word}</span>
              </div>
            );
          })}
        </div>
        <Separator />
        <div className="mt-4 flex w-full items-center justify-center gap-2 text-slate-600">
          <Copy className="size-4" />
          <p>Click anywhere on this card to copy</p>
        </div>
      </div>
    </div>
  );
}
