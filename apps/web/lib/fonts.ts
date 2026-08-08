import { IBM_Plex_Sans, Lexend } from "next/font/google";

// Same two families the old app pulled from the Google Fonts CDN link in
// index.html — next/font/google self-hosts them instead, same visual result
// without the CDN round-trip / FOUC risk.
export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

export const lexend = Lexend({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-lexend",
  display: "swap",
});
