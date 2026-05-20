// Cho phép page bên trong (vd CustomPage) ẩn header/footer của MainLayout.
// Default = true (hiển thị). CustomPage gọi setHideChrome(true) khi root.hideChrome bật.
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LayoutChromeCtx {
  hideChrome: boolean;
  setHideChrome: (v: boolean) => void;
}

const Ctx = createContext<LayoutChromeCtx>({ hideChrome: false, setHideChrome: () => {} });

export function LayoutChromeProvider({ children }: { children: ReactNode }) {
  const [hideChrome, setHideChrome] = useState(false);
  return <Ctx.Provider value={{ hideChrome, setHideChrome }}>{children}</Ctx.Provider>;
}

export function useLayoutChrome() {
  return useContext(Ctx);
}

/** Gọi từ page con — tự bật khi mount, reset khi unmount. */
export function useHideChromeIf(hide: boolean) {
  const { setHideChrome } = useLayoutChrome();
  useEffect(() => {
    setHideChrome(hide);
    return () => setHideChrome(false);
  }, [hide, setHideChrome]);
}
