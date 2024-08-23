import { Skeleton } from "@/components/ui/skeleton";

export default function WalletBalSkeleton() {
  return (
    <div className="flex w-full justify-center">
      <Skeleton className="h-12 w-64" />
    </div>
  );
}
