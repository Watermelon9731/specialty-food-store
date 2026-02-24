"use client";

import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QUERY_KEY } from "@/constants/query-key/query-key";
import { createOrder } from "@/services/admin.service";
import type { CreateOrderPayload, OrderStatus } from "@/types/admin";
import { useQueryClient } from "@tanstack/react-query";
import { MapPin, Package, Phone, User, Wallet } from "lucide-react";
import { useState } from "react";

const STATUS_OPTIONS: { value: OrderStatus; label: string; color: string }[] = [
  {
    value: "processing",
    label: "Đang xử lý",
    color:
      "border-slate-300 bg-slate-50 text-slate-700 data-[selected=true]:border-slate-600 data-[selected=true]:bg-slate-100 data-[selected=true]:ring-2 data-[selected=true]:ring-slate-400",
  },
  {
    value: "paid",
    label: "Đã thanh toán",
    color:
      "border-green-300 bg-green-50 text-green-700 data-[selected=true]:border-green-600 data-[selected=true]:bg-green-100 data-[selected=true]:ring-2 data-[selected=true]:ring-green-400",
  },
  {
    value: "unfulfilled",
    label: "Chưa giao",
    color:
      "border-orange-300 bg-orange-50 text-orange-700 data-[selected=true]:border-orange-500 data-[selected=true]:bg-orange-100 data-[selected=true]:ring-2 data-[selected=true]:ring-orange-400",
  },
];

const INITIAL_FORM: CreateOrderPayload = {
  customerName: "",
  customerPhone: "",
  customerAddress: "",
  productName: "",
  amount: 0,
  status: "processing",
};

export function AddOrderDialog({
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const [internalOpen, setInternalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<CreateOrderPayload>(INITIAL_FORM);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? controlledOnOpenChange! : setInternalOpen;

  const handleChange =
    (field: keyof CreateOrderPayload) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: field === "amount" ? Number(e.target.value) : e.target.value,
      }));
    };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setForm(INITIAL_FORM);
      setError(null);
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await createOrder(form);
      // Invalidate orders query so the list refreshes automatically
      await queryClient.invalidateQueries({ queryKey: QUERY_KEY.ADMIN.ORDERS });
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[520px] w-[95vw] p-0 rounded-2xl overflow-hidden gap-0">
        {/* ── Header ── */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-linear-to-r from-blue-600 to-blue-500">
          <DialogTitle className="text-xl font-bold text-white tracking-tight">
            Tạo đơn hàng mới
          </DialogTitle>
          <p className="text-sm text-blue-100 mt-0.5">
            Điền thông tin bên dưới để tạo đơn hàng.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="px-6 py-5 flex flex-col gap-5 max-h-[65vh] overflow-y-auto">
            {/* ── Section: Khách hàng ── */}
            <fieldset className="flex flex-col gap-4">
              <legend className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                Thông tin khách hàng
              </legend>

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="customer-name"
                  className="text-sm font-medium flex items-center gap-1.5"
                >
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                  Tên khách hàng <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="customer-name"
                  value={form.customerName}
                  onChange={handleChange("customerName")}
                  placeholder="Nguyễn Văn A"
                  className="h-11 rounded-xl"
                  required
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="customer-phone"
                  className="text-sm font-medium flex items-center gap-1.5"
                >
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                  Số điện thoại <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="customer-phone"
                  value={form.customerPhone}
                  onChange={handleChange("customerPhone")}
                  placeholder="0901 234 567"
                  className="h-11 rounded-xl"
                  required
                />
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="customer-address"
                  className="text-sm font-medium flex items-center gap-1.5"
                >
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  Địa chỉ giao hàng
                </Label>
                <Input
                  id="customer-address"
                  value={form.customerAddress}
                  onChange={handleChange("customerAddress")}
                  placeholder="123 Lê Lợi, Q.1, TP.HCM"
                  className="h-11 rounded-xl"
                />
              </div>
            </fieldset>

            {/* ── Divider ── */}
            <div className="border-t" />

            {/* ── Section: Đơn hàng ── */}
            <fieldset className="flex flex-col gap-4">
              <legend className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                Chi tiết đơn hàng
              </legend>

              {/* Product */}
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="product-name"
                  className="text-sm font-medium flex items-center gap-1.5"
                >
                  <Package className="h-3.5 w-3.5 text-muted-foreground" />
                  Sản phẩm <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="product-name"
                  value={form.productName}
                  onChange={handleChange("productName")}
                  placeholder="Mít sấy khô 500g"
                  className="h-11 rounded-xl"
                  required
                />
              </div>

              {/* Amount */}
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="amount"
                  className="text-sm font-medium flex items-center gap-1.5"
                >
                  <Wallet className="h-3.5 w-3.5 text-muted-foreground" />
                  Tổng tiền (VNĐ) <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="amount"
                    value={form.amount || ""}
                    onChange={handleChange("amount")}
                    placeholder="150000"
                    type="number"
                    min={0}
                    step={1000}
                    className="h-11 rounded-xl pr-14"
                    required
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium pointer-events-none">
                    VNĐ
                  </span>
                </div>
                {form.amount > 0 && (
                  <p className="text-xs text-muted-foreground pl-1">
                    ≈{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(form.amount)}
                  </p>
                )}
              </div>

              {/* Status pill selector */}
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium">Trạng thái</Label>
                <div className="flex gap-2 flex-wrap">
                  {STATUS_OPTIONS.map(({ value, label, color }) => (
                    <button
                      key={value}
                      type="button"
                      data-selected={form.status === value}
                      onClick={() =>
                        setForm((prev) => ({ ...prev, status: value }))
                      }
                      className={`flex-1 min-w-[90px] rounded-xl border px-3 py-2 text-sm font-medium transition-all cursor-pointer ${color}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </fieldset>

            {/* ── Error message ── */}
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                {error}
              </p>
            )}
          </div>

          {/* ── Footer ── */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-muted/30">
            <Button
              id="cancel-order-dialog"
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="rounded-xl h-11 px-6"
            >
              Hủy
            </Button>
            <Button
              id="submit-order-dialog"
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-sm min-w-[130px]"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Spinner className="size-4" />
                  Đang lưu...
                </span>
              ) : (
                "Lưu đơn hàng"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
