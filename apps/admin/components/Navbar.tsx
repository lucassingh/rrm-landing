"use client";

import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu as MenuIcon } from "lucide-react";
import Image from "next/image";
import { useClerk, useUser } from "@clerk/nextjs";
import { themePalette } from "@/lib/theme";

export const NAVBAR_HEIGHT = 64;

export function Navbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const { user } = useUser();
  const { signOut } = useClerk();

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.primaryEmailAddress?.emailAddress;
  const role = (user?.publicMetadata?.role as string | undefined) ?? "user";
  const initials = `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase() || "?";

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{ height: NAVBAR_HEIGHT, justifyContent: "center", bgcolor: themePalette.CHROME, zIndex: (t) => t.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <IconButton onClick={onToggleSidebar} sx={{ color: "#fff" }} aria-label="Alternar menú">
            <MenuIcon size={22} />
          </IconButton>
          {/* next/image doesn't auto-apply basePath to a plain string src */}
          <Image src="/admin/logo.png" alt="RMM" width={34} height={34} />
          <Typography sx={{ fontFamily: themePalette.FONT_HEADERS, fontSize: 18, color: "#fff" }}>
            RMM Dashboard
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar sx={{ bgcolor: themePalette.EXTRA2, width: 36, height: 36, fontSize: 14 }}>
            {initials}
          </Avatar>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography sx={{ color: "#fff", fontSize: 14, lineHeight: 1.2 }}>{fullName}</Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: 12, textTransform: "capitalize" }}>
              {role === "admin" ? "Editor" : "Redactor"}
            </Typography>
          </Box>
          <Button
            onClick={() => signOut({ redirectUrl: "/admin/sign-in" })}
            variant="outlined"
            size="small"
            sx={{
              color: "#fff",
              borderColor: "rgba(255,255,255,0.4)",
              borderRadius: "50px",
              textTransform: "none",
              "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.08)" },
            }}
          >
            Cerrar Sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
