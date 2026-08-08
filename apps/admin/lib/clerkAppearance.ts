import type { Appearance } from "@clerk/types";
import { themePalette } from "./theme";

// Reskins Clerk's default hosted UI to match the FormContainer it's embedded in
// (see app/_components/AuthSplitLayout.tsx) — pill buttons, brand blue, no
// duplicate card chrome (the wrapper already draws the border/shadow).
export const clerkAppearance: Appearance = {
  variables: {
    colorPrimary: themePalette.PRIMARY,
    colorText: themePalette.DARK,
    colorTextSecondary: "#6b7280",
    borderRadius: "8px",
    fontFamily: themePalette.FONT_GLOBAL,
  },
  elements: {
    rootBox: { width: "100%" },
    cardBox: { width: "100%", boxShadow: "none" },
    card: { boxShadow: "none", border: "none", padding: 0, width: "100%" },
    header: { display: "none" },
    footer: { background: "none" },
    formButtonPrimary: {
      borderRadius: "50px",
      textTransform: "none",
      fontSize: "1rem",
      paddingTop: 10,
      paddingBottom: 10,
      boxShadow: "none",
      "&:hover": { transform: "scale(1.02)" },
    },
    socialButtonsBlockButton: { borderRadius: 8, borderColor: themePalette.LIGHT },
    formFieldInput: { borderRadius: 8, borderColor: themePalette.LIGHT },
    footerActionLink: { color: themePalette.PRIMARY },
  },
};
