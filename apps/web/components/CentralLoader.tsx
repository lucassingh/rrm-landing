"use client";

import { Backdrop, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const OverlayBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.modal + 1,
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(4px)",
}));

const PulseContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

const PulseAnimation = styled(Box)({
  width: 100,
  height: 100,
  borderRadius: "50%",
  backgroundColor: "rgba(25, 118, 210, 0.2)",
  animation: "pulse 2s ease-in-out infinite",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
});

const InnerPulse = styled(Box)({
  width: 70,
  height: 70,
  borderRadius: "50%",
  backgroundColor: "rgba(25, 118, 210, 0.4)",
  animation: "pulse 2s ease-in-out infinite 0.5s",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Logo = styled(Box)({
  width: 50,
  height: 50,
  backgroundColor: "white",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  "& img": {
    width: 30,
    height: 30,
    objectFit: "contain",
  },
});

export function CentralLoader({ open }: { open: boolean }) {
  return (
    <OverlayBackdrop open={open}>
      <PulseContainer>
        <PulseAnimation>
          <InnerPulse>
            <Logo>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/rmm-logo.svg" alt="Loading" />
            </Logo>
          </InnerPulse>
        </PulseAnimation>
      </PulseContainer>
    </OverlayBackdrop>
  );
}
