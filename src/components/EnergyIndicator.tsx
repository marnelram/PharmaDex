import React, { useState } from "react";
import EnergyIcon from "./EnergyIcon";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";

export default function EnergyIndicator() {
  const [showInfoDialog, setShowInfoDialog] = useState(false);

  return (
    <div className="relative group">
      {/* Coming Soon badge */}
      <Badge className="absolute -top-3 right-0 z-20 bg-yellow-500 text-white">
        Coming Soon
      </Badge>

      {/* Energy indicator */}
      <div
        className="flex items-center space-x-1 px-3 py-1.5 bg-white/90 rounded-full shadow-sm cursor-pointer border border-gray-200"
        onClick={() => setShowInfoDialog(true)}
      >
        <EnergyIcon size={24} current={5} max={5} />
        <span className="text-sm font-medium">5/5</span>
      </div>

      {/* Info popup */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Energy System Coming Soon</DialogTitle>
            <DialogDescription>
              The energy system is currently in development and will be
              available soon.
            </DialogDescription>
          </DialogHeader>

          <div className="p-4 space-y-4">
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-md">
              <EnergyIcon size={40} current={5} max={5} />
              <div>
                <h3 className="font-medium">Energy Points</h3>
                <p className="text-sm text-gray-600">
                  Each quiz will require energy points to play.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">How will it work?</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    You&apos;ll get 5 energy points daily with the free plan.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    Premium plans will give you more energy and faster
                    regeneration.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <span>
                    You can also purchase energy packs for one-time boosts.
                  </span>
                </li>
              </ul>
            </div>

            <div className="text-center pt-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setShowInfoDialog(false);
                  // For future implementation: Navigate to pricing page
                  window.location.href = "/pricing";
                }}
              >
                View Pricing Options
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
