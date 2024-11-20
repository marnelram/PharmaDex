import {
  Pill,
  Cloud,
  Droplet,
  Eye,
  Cylinder,
  Wind,
  PenTool,
  Square,
  SprayCan,
  Syringe,
} from "lucide-react";
import { DosageForm } from "@prisma/client";

interface DosageFormConfig {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export const dosageFormConfig: Record<DosageForm, DosageFormConfig> = {
  PILL: {
    icon: Pill,
    label: "Pill",
  },
  POWDER: {
    icon: Cloud,
    label: "Powder",
  },
  INJECTION: {
    icon: Syringe,
    label: "Injection",
  },
  LIQUID: {
    icon: Droplet,
    label: "Liquid",
  },
  DROP: {
    icon: Eye,
    label: "Drops",
  },
  CREAM: {
    icon: Cylinder,
    label: "Cream",
  },
  INHALER: {
    icon: Wind,
    label: "Inhaler",
  },
  INSERT: {
    icon: PenTool,
    label: "Insert",
  },
  PATCH: {
    icon: Square,
    label: "Patch",
  },
  SPRAY: {
    icon: SprayCan,
    label: "Spray",
  },
};

interface DosageFormIconProps {
  form: DosageForm;
  className?: string;
}

export function DosageFormIcon({ form, className }: DosageFormIconProps) {
  const config = dosageFormConfig[form];
  const IconComponent = config.icon;

  return <IconComponent className={className} />;
}

// Helper function to get the label
export function getDosageFormLabel(form: DosageForm): string {
  return dosageFormConfig[form].label;
}
