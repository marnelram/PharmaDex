"use client";

import React from "react";
import { useSettings } from "@/context/SettingsContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Settings() {
  const { settings, updateSettings } = useSettings();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-muted flex flex-col items-center justify-center p-8">
      <Card className="w-full max-w-2xl rounded-lg shadow-lg">
        <CardHeader className="relative p-4 border-b w-full">
          <Link href="/">
            <ChevronLeft className="hover:translate-x-[-5px] transition-transform absolute size-6 sm:size-8 left-3 sm:left-12 top-1/2 translate-y-[-50%] cursor-pointer" />
          </Link>
          <h1 className="text-center font-bold">Settings</h1>
        </CardHeader>
        <CardContent className="p-8">
          <h2 className="font-bold text-center mb-8">Coming Soon!</h2>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-8">
      <Card className="w-full max-w-2xl rounded-[15px] shadow-lg">
        <CardContent className="p-8">
          <h1 className="text-[44px] font-bold text-center mb-8 font-['Poppins']">
            Settings
          </h1>

          {/* Theme & Display */}
          <section className="mb-8">
            <h2 className="text-[32px] font-bold mb-4 font-['Poppins']">
              Theme & Display
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={settings.theme}
                  onValueChange={(value: "light" | "dark" | "system") =>
                    updateSettings({ theme: value })
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="highContrast">High Contrast Mode</Label>
                <Switch
                  id="highContrast"
                  checked={settings.highContrastMode}
                  onCheckedChange={(checked) =>
                    updateSettings({ highContrastMode: checked })
                  }
                />
              </div>
            </div>
          </section>

          {/* Accessibility */}
          <section className="mb-8">
            <h2 className="text-[32px] font-bold mb-4 font-['Poppins']">
              Accessibility
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="reduceMotion">Reduce Motion</Label>
                <Switch
                  id="reduceMotion"
                  checked={settings.reduceMotion}
                  onCheckedChange={(checked) =>
                    updateSettings({ reduceMotion: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="fontSize">Font Size</Label>
                <Select
                  value={settings.fontSize}
                  onValueChange={(value: "small" | "medium" | "large") =>
                    updateSettings({ fontSize: value })
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          {/* Audio */}
          <section className="mb-8">
            <h2 className="text-[32px] font-bold mb-4 font-['Poppins']">
              Audio
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="sfx">Sound Effects</Label>
                <Switch
                  id="sfx"
                  checked={settings.sfxEnabled}
                  onCheckedChange={(checked) =>
                    updateSettings({ sfxEnabled: checked })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="volume">Volume</Label>
                <Slider
                  id="volume"
                  min={0}
                  max={100}
                  step={1}
                  value={[settings.masterVolume]}
                  onValueChange={([value]) =>
                    updateSettings({ masterVolume: value })
                  }
                />
              </div>
            </div>
          </section>

          {/* Gameplay */}
          <section className="mb-8">
            <h2 className="text-[32px] font-bold mb-4 font-['Poppins']">
              Gameplay
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="timer">Question Timer</Label>
                <Switch
                  id="timer"
                  checked={settings.questionTimer}
                  onCheckedChange={(checked) =>
                    updateSettings({ questionTimer: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="hints">Show Hints</Label>
                <Switch
                  id="hints"
                  checked={settings.showHints}
                  onCheckedChange={(checked) =>
                    updateSettings({ showHints: checked })
                  }
                />
              </div>
            </div>
          </section>

          {/* Privacy */}
          <section className="mb-8">
            <h2 className="text-[32px] font-bold mb-4 font-['Poppins']">
              Privacy
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="leaderboard">Show on Leaderboard</Label>
                <Switch
                  id="leaderboard"
                  checked={settings.showOnLeaderboard}
                  onCheckedChange={(checked) =>
                    updateSettings({ showOnLeaderboard: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="analytics">Share Analytics</Label>
                <Switch
                  id="analytics"
                  checked={settings.shareAnalytics}
                  onCheckedChange={(checked) =>
                    updateSettings({ shareAnalytics: checked })
                  }
                />
              </div>
            </div>
          </section>

          <div className="flex justify-center">
            <Button
              onClick={() => router.push("/")}
              className="h-12 px-8 rounded-[25px] bg-[#E63946] hover:bg-[#c4303b] transition-all duration-300 font-['Raleway'] text-[14px] font-medium"
            >
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
