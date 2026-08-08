"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { NAV_ITEMS } from "@/lib/navigation";
import { NAVBAR_HEIGHT } from "./Navbar";

export const DRAWER_WIDTH = 260;
export const COLLAPSED_WIDTH = 64;

const SB = {
  bg: "#243b6e",
  activeBg: "#b63e81",
  hover: "rgba(255,255,255,0.08)",
  text: "#fff",
  subtext: "rgba(255,255,255,0.55)",
};

export function Sidebar({
  open,
  mobileOpen,
  onClose,
}: {
  open: boolean;
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const isAdmin = (user?.publicMetadata?.role as string | undefined) === "admin";
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const width = open ? DRAWER_WIDTH : COLLAPSED_WIDTH;
  const items = NAV_ITEMS.filter((i) => !i.adminOnly || isAdmin);

  const navigate = (path: string) => {
    router.push(path);
    if (isMobile) onClose();
  };

  const content = (
    <Box sx={{ bgcolor: SB.bg, height: "100%", display: "flex", flexDirection: "column" }}>
      <List sx={{ flex: 1, py: 1 }}>
        {items.map((item) => {
          const children = item.children?.filter((c) => !c.adminOnly || isAdmin);
          const hasChildren = !!children && children.length > 0;
          const Icon = item.icon;

          if (hasChildren) {
            const groupOpen = openGroups[item.label] ?? true;
            return (
              <Box key={item.label}>
                <Tooltip title={!open ? item.label : ""} placement="right">
                  <ListItemButton
                    onClick={() => setOpenGroups((s) => ({ ...s, [item.label]: !groupOpen }))}
                    sx={{ color: SB.text, "&:hover": { bgcolor: SB.hover } }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, color: SB.text }}>
                      <Icon size={20} />
                    </ListItemIcon>
                    {open && <ListItemText primary={item.label} />}
                    {open ? (groupOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />) : null}
                  </ListItemButton>
                </Tooltip>
                <Collapse in={open && groupOpen} timeout="auto" unmountOnExit>
                  {children!.map((child) => {
                    const childActive =
                      pathname === child.path || pathname.startsWith(`${child.path}/`);
                    const ChildIcon = child.icon;
                    return (
                      <ListItemButton
                        key={child.path}
                        onClick={() => navigate(child.path!)}
                        sx={{
                          pl: 5,
                          color: SB.text,
                          bgcolor: childActive ? SB.activeBg : "transparent",
                          borderLeft: childActive ? `3px solid ${SB.text}` : "3px solid transparent",
                          "&:hover": { bgcolor: childActive ? SB.activeBg : SB.hover },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 32, color: SB.text }}>
                          <ChildIcon size={16} />
                        </ListItemIcon>
                        <ListItemText primary={child.label} slotProps={{ primary: { fontSize: 14 } }} />
                      </ListItemButton>
                    );
                  })}
                </Collapse>
              </Box>
            );
          }

          const isActive = item.path
            ? pathname === item.path || pathname.startsWith(`${item.path}/`)
            : false;

          return (
            <Tooltip key={item.label} title={!open ? item.label : ""} placement="right">
              <ListItemButton
                onClick={() => navigate(item.path!)}
                sx={{
                  color: SB.text,
                  bgcolor: isActive ? SB.activeBg : "transparent",
                  borderLeft: isActive ? `3px solid ${SB.text}` : "3px solid transparent",
                  "&:hover": { bgcolor: isActive ? SB.activeBg : SB.hover },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: SB.text }}>
                  <Icon size={20} />
                </ListItemIcon>
                {open && <ListItemText primary={item.label} />}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>
      {open && (
        <Typography sx={{ color: SB.subtext, fontSize: 11, textAlign: "center", py: 1.5 }}>
          RMM Backoffice v1.0
        </Typography>
      )}
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{ "& .MuiDrawer-paper": { width: DRAWER_WIDTH, boxSizing: "border-box" } }}
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width,
          boxSizing: "border-box",
          top: NAVBAR_HEIGHT,
          height: `calc(100% - ${NAVBAR_HEIGHT}px)`,
          transition: "width 0.2s",
          overflowX: "hidden",
          borderRight: "none",
        },
      }}
    >
      {content}
    </Drawer>
  );
}
