import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-100 bg-gray-50">
      <div className="container flex justify-between p-4">
        <div className="flex items-center gap-2">
          <span>
            <Image src="/logo.webp" width={40} height={40} alt="logo" />
          </span>
          <span className="text-xl font-bold">ProtoWallet</span>
        </div>
        <Button variant="outline">How to use?</Button>
      </div>
    </nav>
  );
}
