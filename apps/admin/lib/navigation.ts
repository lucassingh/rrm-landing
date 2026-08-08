import type { LucideIcon } from "lucide-react";
import { Newspaper, Building2, FolderTree, Users } from "lucide-react";

export type NavItem = {
  label: string;
  path?: string;
  icon: LucideIcon;
  adminOnly?: boolean;
  children?: NavItem[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Noticias", path: "/news", icon: Newspaper },
  {
    label: "Entidades",
    icon: Building2,
    adminOnly: true,
    children: [
      { label: "Administrar", path: "/entities", icon: Building2, adminOnly: true },
      { label: "Categorías", path: "/entity-categories", icon: FolderTree, adminOnly: true },
    ],
  },
  { label: "Usuarios", path: "/users", icon: Users, adminOnly: true },
];
