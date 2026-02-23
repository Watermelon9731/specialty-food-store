"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { useRouter } from "next/navigation";

export function AddOrderDialog({
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const router = useRouter();
  const [internalOpen, setInternalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [productName, setProductName] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("processing");

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? controlledOnOpenChange : setInternalOpen;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          customerName,
          productName,
          amount,
          status,
        }),
      });
      if (res.ok) {
        if (setOpen) setOpen(false);
        // Reset form
        setCustomerName("");
        setProductName("");
        setAmount("");
        setStatus("processing");
        // Reload page data
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to create order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[500px] p-6 rounded-2xl w-[95vw] mx-auto z-50">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-left">
            Create New Order
          </DialogTitle>
          <DialogDescription className="text-base text-left mt-1">
            Enter the necessary details to manually create an order.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="customer-name"
              className="text-base font-semibold text-gray-800 dark:text-gray-200"
            >
              Customer Name
            </Label>
            <Input
              id="customer-name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. John Doe"
              className="h-12 text-base px-4 rounded-xl border-gray-300 shadow-sm focus-visible:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="product"
              className="text-base font-semibold text-gray-800 dark:text-gray-200"
            >
              Product
            </Label>
            <Input
              id="product"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. 500g Premium Dried Mango"
              className="h-12 text-base px-4 rounded-xl border-gray-300 shadow-sm focus-visible:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="amount"
              className="text-base font-semibold text-gray-800 dark:text-gray-200"
            >
              Total Amount (VNĐ)
            </Label>
            <Input
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              type="number"
              step="0.01"
              className="h-12 text-base px-4 rounded-xl border-gray-300 shadow-sm focus-visible:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="status"
              className="text-base font-semibold text-gray-800 dark:text-gray-200"
            >
              Order Status
            </Label>
            <div className="relative">
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-12 w-full appearance-none rounded-xl border border-gray-300 bg-background px-4 py-2 text-base shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="processing">Processing</option>
                <option value="paid">Paid</option>
                <option value="unfulfilled">Unfulfilled</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (setOpen) setOpen(false);
              }}
              className="h-12 text-base w-full sm:w-auto rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 text-base w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-md rounded-xl"
            >
              {isSubmitting ? "Saving..." : "Save Order"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
