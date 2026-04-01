"use client";

import dynamic from "next/dynamic";

const CartDrawer = dynamic(
  () => import("@/components/cart/CartDrawer").then((mod) => mod.CartDrawer),
  { ssr: false },
);

const FloatingContact = dynamic(
  () =>
    import("@/components/layout/FloatingContact").then(
      (mod) => mod.FloatingContact,
    ),
  { ssr: false },
);

export function ClientOverlays() {
  return (
    <>
      <CartDrawer />
      <FloatingContact />
    </>
  );
}
