import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-[80dvh] bg-muted/80 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-accent-red" />
        <p className="font-medium">Loading...</p>
      </div>
    </div>
  );
}
