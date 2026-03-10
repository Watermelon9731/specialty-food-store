"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart, type CartItem } from "@/hooks/use-cart";
import { CONTACT_INFO, PATH } from "@/constants/path";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ChefHat,
  X,
  Tag,
  MessageCircle,
  Facebook,
  Mail,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function formatVND(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

/**
 * Build the order message text used across all channels.
 */
function buildOrderMessage(items: CartItem[], subtotal: number): string {
  const lines = [
    "🛒 ĐƠN HÀNG MỚI — Tré Bà Liên",
    "━━━━━━━━━━━━━━━━━",
    "",
    ...items.map(
      (item, idx) =>
        `${idx + 1}. ${item.name}\n   Số lượng: ${item.quantity} ${item.unitType}\n   Đơn giá: ${formatVND(item.price)}\n   Thành tiền: ${formatVND(item.price * item.quantity)}`,
    ),
    "",
    "━━━━━━━━━━━━━━━━━",
    `💰 Tổng cộng: ${formatVND(subtotal)}`,
    "",
    "📦 Thông tin giao hàng:",
    "Họ tên: ",
    "SĐT: ",
    "Địa chỉ: ",
    "",
    "Cảm ơn bạn đã đặt hàng tại Tré Bà Liên! 🙏",
  ];
  return lines.join("\n");
}

/** Zalo deep-link with pre-filled message */
function buildZaloOrderUrl(items: CartItem[], subtotal: number): string {
  const message = encodeURIComponent(buildOrderMessage(items, subtotal));
  return `${CONTACT_INFO.ZALO}?text=${message}`;
}

/** Facebook Messenger deep-link */
function buildFacebookOrderUrl(): string {
  return CONTACT_INFO.FACEBOOK_MESSENGER;
}

/** mailto: link with pre-filled subject and body */
function buildEmailOrderUrl(items: CartItem[], subtotal: number): string {
  const subject = encodeURIComponent("Đơn hàng mới — Tré Bà Liên");
  const body = encodeURIComponent(buildOrderMessage(items, subtotal));
  return `mailto:${CONTACT_INFO.EMAIL}?subject=${subject}&body=${body}`;
}

export function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQuantity, clearCart } =
    useCart();

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleOrderViaZalo = () => {
    const url = buildZaloOrderUrl(items, subtotal);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleOrderViaFacebook = () => {
    const url = buildFacebookOrderUrl();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleOrderViaEmail = () => {
    const url = buildEmailOrderUrl(items, subtotal);
    window.location.href = url;
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col p-0 sm:max-w-[420px] border-l-0 bg-[#f8f7f4] gap-0"
      >
        {/* ── Header ── */}
        <SheetHeader className="flex-none px-6 py-5 bg-[#1a3d2b] text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/15 p-2 rounded-xl">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <div>
                <SheetTitle className="text-white font-bold text-lg leading-none">
                  Giỏ hàng
                </SheetTitle>
                <p className="text-emerald-300 text-xs mt-0.5 font-medium">
                  {totalItems > 0
                    ? `${totalItems} sản phẩm trong giỏ`
                    : "Giỏ hàng trống"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Đóng giỏ hàng"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>
        </SheetHeader>

        {/* ── Items ── */}
        <ScrollArea className="flex-1 px-4">
          {items.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
              <div className="h-20 w-20 bg-white border border-slate-100 rounded-3xl flex items-center justify-center shadow-sm">
                <ChefHat className="h-9 w-9 text-slate-300" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-700 mb-1">
                  Giỏ hàng đang trống
                </p>
                <p className="text-slate-400 text-sm max-w-[200px] mx-auto leading-relaxed">
                  Thêm đặc sản Bình Định vào giỏ để bắt đầu đặt hàng.
                </p>
              </div>
              <Button
                onClick={() => setOpen(false)}
                asChild
                className="rounded-full bg-[#1a3d2b] hover:bg-[#3a7851] text-white px-7 h-11 font-semibold"
              >
                <Link href={PATH.PRODUCTS.ALL}>Khám phá sản phẩm →</Link>
              </Button>
            </div>
          ) : (
            <div className="py-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-100 rounded-2xl p-4 flex gap-4 group hover:border-emerald-100 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="relative h-18 w-18 min-w-[72px] rounded-xl bg-[#f5f3ef] border border-slate-100 overflow-hidden flex items-center justify-center shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="72px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-2xl select-none">🥩</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
                        {item.name}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="shrink-0 h-6 w-6 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center text-slate-400 transition-colors"
                        aria-label="Xoá sản phẩm"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-400 mb-3 font-medium">
                      / {item.unitType}
                    </p>

                    <div className="flex items-center justify-between">
                      {/* Qty stepper */}
                      <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl h-9 overflow-hidden">
                        <button
                          className="h-9 w-9 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-[#1a3d2b] transition-colors disabled:opacity-40"
                          onClick={() =>
                            item.quantity > 1
                              ? updateQuantity(item.id, item.quantity - 1)
                              : removeItem(item.id)
                          }
                          aria-label="Giảm"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-9 text-center text-sm font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          className="h-9 w-9 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-[#1a3d2b] transition-colors disabled:opacity-40"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= item.stock}
                          aria-label="Tăng"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Line total */}
                      <p className="text-sm font-bold text-[#1a3d2b]">
                        {formatVND(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear cart */}
              <button
                onClick={clearCart}
                className="w-full flex items-center justify-center gap-2 text-xs text-slate-400 hover:text-red-500 transition-colors py-2 font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Xoá tất cả sản phẩm
              </button>
            </div>
          )}
        </ScrollArea>

        {/* ── Footer — only when cart has items ── */}
        {items.length > 0 && (
          <div className="flex-none border-t border-slate-200 bg-white p-5 space-y-4">
            {/* Promo hint */}
            <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2.5">
              <Tag className="w-4 h-4 text-emerald-600 shrink-0" />
              <p className="text-xs text-emerald-700 font-medium">
                Miễn phí vận chuyển cho đơn từ{" "}
                <span className="font-bold">300.000₫</span>
              </p>
            </div>

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Tạm tính ({totalItems} món)</span>
                <span>{formatVND(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Phí vận chuyển</span>
                <span className="text-emerald-600 font-medium">
                  {subtotal >= 300000 ? "Miễn phí" : "Tính khi đặt hàng"}
                </span>
              </div>
              <div className="flex justify-between font-bold text-base text-slate-900 pt-2 border-t border-slate-100">
                <span>Tổng cộng</span>
                <span className="text-[#1a3d2b] text-lg">
                  {formatVND(subtotal)}
                </span>
              </div>
            </div>

            {/* CTA buttons — 3 checkout channels */}
            <div className="space-y-2">
              <Button
                className="w-full h-12 rounded-full bg-[#0068FF] hover:bg-[#0055d4] text-white font-bold text-sm shadow-lg shadow-[#0068FF]/20 transition-all hover:scale-[1.02] gap-2"
                onClick={handleOrderViaZalo}
              >
                <MessageCircle className="h-4 w-4" />
                Đặt hàng qua Zalo
              </Button>
              <Button
                className="w-full h-12 rounded-full bg-[#1877F2] hover:bg-[#1466d8] text-white font-bold text-sm shadow-lg shadow-[#1877F2]/20 transition-all hover:scale-[1.02] gap-2"
                onClick={handleOrderViaFacebook}
              >
                <Facebook className="h-4 w-4" />
                Nhắn tin qua Facebook
              </Button>
              <Button
                className="w-full h-12 rounded-full bg-[#1a3d2b] hover:bg-[#3a7851] text-white font-bold text-sm shadow-lg shadow-[#1a3d2b]/20 transition-all hover:scale-[1.02] gap-2"
                onClick={handleOrderViaEmail}
              >
                <Mail className="h-4 w-4" />
                Gửi đơn qua Email
              </Button>
              <Button
                variant="ghost"
                className="w-full h-10 rounded-full text-slate-500 hover:text-[#1a3d2b] hover:bg-slate-100 font-medium text-sm"
                onClick={() => setOpen(false)}
              >
                Tiếp tục mua sắm
              </Button>
            </div>

            <p className="text-[10px] text-slate-400 text-center leading-relaxed">
              Zalo · Facebook · Email · Đổi trả 7 ngày · Giao toàn quốc
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
