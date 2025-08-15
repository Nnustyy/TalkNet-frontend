import type { NavigateOptions } from "react-router-dom";

import { HeroUIProvider } from "@heroui/system";
import { useHref, useNavigate } from "react-router-dom";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      {children}
    </HeroUIProvider>
  );
}
// import { useNavigate, useHref } from "react-router-dom";
// import { HeroUIProvider } from "@heroui/system";

// export function Provider({ children }: { children: React.ReactNode }) {
//   const navigate = useNavigate();
//   const href = useHref;
  
//   return (
//     <HeroUIProvider navigate={navigate} useHref={href}>
//       {children}
//     </HeroUIProvider>
//   )}