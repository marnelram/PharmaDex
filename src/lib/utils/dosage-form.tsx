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
} from "lucide-react";
import { DosageForm } from "@prisma/client";

interface DosageFormConfig {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
}

export const dosageFormConfig: Record<DosageForm, DosageFormConfig> = {
  PILL: {
    icon: Pill,
    label: "Pill",
    description: "Tablets, capsules, lozenges, granules, effervescent tablets",
  },
  POWDER: {
    icon: Cloud,
    label: "Powder",
    description: "Powder form medication",
  },
  LIQUID: {
    icon: Droplet,
    label: "Liquid",
    description: "Solutions, syrups, elixirs, suspensions, emulsions",
  },
  DROP: {
    icon: Eye,
    label: "Drops",
    description: "Drops for eyes, ears, and nasal use",
  },
  CREAM: {
    icon: Cylinder,
    label: "Cream",
    description: "Creams, ointments, gels, pastes",
  },
  INHALER: {
    icon: Wind,
    label: "Inhaler",
    description: "Inhalers, nebulizer solutions, anesthetic gases",
  },
  INSERT: {
    icon: PenTool,
    label: "Insert",
    description: "Suppositories, vaginal pessaries, rings",
  },
  PATCH: {
    icon: Square,
    label: "Patch",
    description: "Transdermal patches",
  },
  SPRAY: {
    icon: SprayCan,
    label: "Spray",
    description: "Nasal, oral, topical sprays",
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

// Helper function to get the description
export function getDosageFormDescription(form: DosageForm): string {
  return dosageFormConfig[form].description;
}
