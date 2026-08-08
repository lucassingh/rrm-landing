"use client";

import { NavBarComponent } from "./NavBarComponent";
import { FooterComponent } from "./FooterComponent";
import { AsideSocialBarComponent } from "./AsideSocialBarComponent";
import { ScrollToTopComponent } from "./ScrollToTopComponent";
import { ScrollToTopButtonComponent } from "./ScrollToTopButtonComponent";
import { RouteTransitionLoader } from "./RouteTransitionLoader";

// Ported from rrm-landing/src/App.tsx (rendered on every route via Router.tsx).
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RouteTransitionLoader />
      <NavBarComponent />
      <AsideSocialBarComponent />
      <ScrollToTopComponent />
      {children}
      <FooterComponent />
      <ScrollToTopButtonComponent />
    </>
  );
}
