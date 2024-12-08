import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-[80dvh] bg-[#F5F5F5] flex items-center justify-center">
      <div className="text-center font-['Raleway'] flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-[#E63946]" />
        <p className="text-[16px] font-medium">Loading...</p>
      </div>
    </div>
  );
}
