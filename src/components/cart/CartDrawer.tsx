"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Plus, Minus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQuantity } = useCart();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-1 text-left">
          <SheetTitle>Shopping Cart ({items.length})</SheetTitle>
          <SheetDescription>
            Review your items before checkout.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 -mx-6 px-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-2 p-16">
              <span className="text-xl font-medium text-muted-foreground">
                Your cart is empty
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-4 py-4">
              {items.map((item) => (
                <div key={item.id} className="flex space-x-4">
                  <div className="relative aspect-square h-16 w-16 min-w-16 overflow-hidden rounded bg-secondary/20 flex items-center justify-center text-xs text-muted-foreground">
                    Img
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between space-x-2">
                      <span className="line-clamp-2 font-medium text-sm">
                        {item.name}
                      </span>
                      <span className="font-bold shrink-0 text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">
                      {item.unitType}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center border rounded-md h-8">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none p-0"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-xs">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none p-0"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        {items.length > 0 && (
          <div className="space-y-4 pr-6 pt-4 pb-4">
            <Separator />
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button className="w-full h-12 text-lg">Checkout</Button>
              </SheetClose>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
