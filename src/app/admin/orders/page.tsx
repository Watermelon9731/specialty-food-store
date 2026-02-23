"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddOrderDialog } from "@/components/admin/AddOrderDialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";

type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone?: string;
  customerAddress?: string;
  status: string;
  date: string;
  amount: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([
    "paid",
    "processing",
    "unfulfilled",
  ]);
  const [debouncedFilters, setDebouncedFilters] =
    useState<string[]>(activeFilters);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(activeFilters);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [activeFilters]);

  const toggleFilter = (status: string) => {
    setActiveFilters((prev) => {
      if (prev.includes(status)) {
        // Don't allow deselecting the last filter (optional ux choice, but let's allow empty)
        return prev.filter((item) => item !== status);
      } else {
        return [...prev, status];
      }
    });
  };

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            statuses: debouncedFilters,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [debouncedFilters]);

  return (
    <div className="grid flex-1 items-start gap-4 p-2 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">
          Đơn hàng
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Lọc
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Lọc theo</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={activeFilters.includes("paid")}
                onCheckedChange={() => toggleFilter("paid")}
              >
                Đã thanh toán
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={activeFilters.includes("processing")}
                onCheckedChange={() => toggleFilter("processing")}
              >
                Đang xử lý
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={activeFilters.includes("unfulfilled")}
                onCheckedChange={() => toggleFilter("unfulfilled")}
              >
                Chưa giao
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            size="sm"
            variant="outline"
            className="h-10 gap-2 hidden sm:flex"
          >
            <File className="h-4 w-4" />
            <span className="whitespace-nowrap text-base">Xuất</span>
          </Button>
        </div>
      </div>
      <div>
        <AddOrderDialog>
          <Button
            size="default"
            className="h-11 gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md rounded-full px-5 transition-transform hover:scale-105 active:scale-95"
          >
            <PlusCircle className="h-5 w-5" />
            <span className="whitespace-nowrap font-medium text-base">
              Thêm đơn hàng
            </span>
          </Button>
        </AddOrderDialog>
      </div>
      {/* Desktop Table View */}
      <Card className="hidden md:block">
        <CardContent>
          {loading ? (
            <div className="text-center py-10">Đang tải đơn hàng...</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-10">Không tìm thấy đơn hàng.</div>
          ) : (
            <>
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Đơn hàng</TableHead>
                      <TableHead>Khách hàng</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Ngày</TableHead>
                      <TableHead className="text-right">Số tiền</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {order.orderNumber}
                        </TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>
                          {order.status === "paid" && (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100/80 border-green-200">
                              Đã thanh toán
                            </Badge>
                          )}
                          {order.status === "processing" && (
                            <Badge variant="secondary">Đang xử lý</Badge>
                          )}
                          {order.status === "unfulfilled" && (
                            <Badge variant="outline">Chưa giao</Badge>
                          )}
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell className="text-right">
                          {order.amount}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                              <DropdownMenuItem>Xem đơn hàng</DropdownMenuItem>
                              <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Mobile Accordion View */}
      {loading ? (
        <div className="text-center py-10">Đang tải đơn hàng...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-10">Không tìm thấy đơn hàng.</div>
      ) : (
        <div className="md:hidden">
          <Accordion type="single" collapsible className="w-full">
            {orders.map((order) => (
              <AccordionItem
                key={order.id}
                value={order.id}
                className="border-b-0 mb-3 bg-slate-50 dark:bg-slate-900 rounded-xl shadow-sm border px-4"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex flex-col items-start gap-3 w-full text-left pr-2">
                    <p className="font-semibold text-md">
                      {order.customerName}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {order.date}
                    </span>
                    <span className="text-xs font-semibold tracking-widest text-slate-600 dark:text-slate-400">
                      {order.customerPhone || "N/A"}
                    </span>
                    <span className="mr-1">
                      {order.status === "paid" && (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100/80 border-green-200 text-xs py-0 h-5 leading-none flex items-center">
                          Đã thanh toán
                        </Badge>
                      )}
                      {order.status === "processing" && (
                        <Badge
                          variant="secondary"
                          className="text-xs py-0 h-5 leading-none flex items-center text-gray-100"
                        >
                          Đang xử lý
                        </Badge>
                      )}
                      {order.status === "unfulfilled" && (
                        <Badge
                          variant="outline"
                          className="text-xs py-0 h-5 leading-none flex items-center"
                        >
                          Chưa giao
                        </Badge>
                      )}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="flex flex-col gap-3 pt-3 mt-1 border-t text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-xs">
                        Mã ĐH:
                      </span>
                      <span className="font-medium bg-slate-100 dark:bg-slate-800 px-2 flex items-center h-6 rounded border text-xs">
                        {order.orderNumber}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-xs">
                        Tổng tiền:
                      </span>
                      <span className="font-bold text-blue-600 dark:text-blue-400 text-base">
                        {order.amount}
                      </span>
                    </div>
                    <div className="flex flex-col mt-0.5">
                      <span className="text-muted-foreground mb-1.5 text-xs">
                        Địa chỉ:
                      </span>
                      <span className="font-medium bg-white dark:bg-slate-950 p-2.5 rounded-lg border text-md leading-relaxed">
                        {order.customerAddress || "Chưa cung cấp địa chỉ"}
                      </span>
                    </div>
                    <div className="flex gap-2 justify-end mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 w-full shadow-xs"
                      >
                        Liên hệ
                      </Button>
                      <Button
                        size="sm"
                        className="h-9 w-full shadow-xs bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Chi tiết
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}
