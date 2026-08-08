"use client";

import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Navbar, NAVBAR_HEIGHT } from "./Navbar";
import { Sidebar } from "./Sidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = () => {
    if (isMobile) setMobileOpen((o) => !o);
    else setDesktopOpen((o) => !o);
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#f4f6fb", minHeight: "100vh" }}>
      <Navbar onToggleSidebar={handleToggle} />
      <Sidebar open={desktopOpen} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: `${NAVBAR_HEIGHT}px`,
          p: { xs: 2, sm: 3 },
          minWidth: 0,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
