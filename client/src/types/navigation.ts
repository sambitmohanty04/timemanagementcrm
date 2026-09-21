import type { LucideIcon } from "lucide-react";

export interface SubNavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  filter: string;
  count: number;
  highlight?: boolean;
  danger?: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
  badge?: string | number;
  badgeColor?: string;
  spark?: boolean;
  subItems?: SubNavItem[];
}
