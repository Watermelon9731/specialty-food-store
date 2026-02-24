"use client";

import { AddOrderDialog } from "@/components/admin/AddOrderDialog";
import StatusBadge from "@/components/status-badge/StatusBadge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QUERY_KEY } from "@/constants/query-key/query-key";
import { getOrders } from "@/services/admin.service";
import type { OrderStatus } from "@/types/admin";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";
import { useState } from "react";

const PAGE_SIZE = 10;

// Default: last 6 months
function defaultDateFrom() {
  const d = new Date();
  d.setMonth(d.getMonth() - 6);
  return d.toISOString().split("T")[0]; // YYYY-MM-DD
}

function todayString() {
  return new Date().toISOString().split("T")[0];
}

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<OrderStatus[]>([
    "paid",
    "processing",
    "unfulfilled",
  ]);
  const [dateFrom, setDateFrom] = useState(defaultDateFrom());
  const [dateTo, setDateTo] = useState(todayString());

  const { data, isLoading } = useQuery({
    queryKey: [
      ...QUERY_KEY.ADMIN.ORDERS,
      page,
      activeFilters,
      dateFrom,
      dateTo,
    ],
    queryFn: () =>
      getOrders({
        page,
        pageSize: PAGE_SIZE,
        statuses: activeFilters,
        dateFrom,
        dateTo,
      }),
    placeholderData: (prev) => prev,
  });

  const orders = data?.orders ?? [];
  const pagination = data?.pagination;

  const toggleFilter = (status: OrderStatus) => {
    setPage(1);
    setActiveFilters((prev) =>
      prev.includes(status)
        ? (prev.filter((s) => s !== status) as OrderStatus[])
        : [...prev, status],
    );
  };

  const handleDateChange = (field: "dateFrom" | "dateTo", value: string) => {
    setPage(1);
    if (field === "dateFrom") setDateFrom(value);
    else setDateTo(value);
  };

  return (
    <div className="grid flex-1 items-start gap-4 p-2 sm:px-6 sm:py-0 md:gap-8">
      {/* Header */}
      <div className="flex items-center flex-wrap gap-3">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">
          Đơn hàng
        </h1>
        <div className="ml-auto flex items-center gap-2 flex-wrap">
          {/* Date range */}
          <div className="flex items-center gap-1 text-sm">
            <Input
              id="date-from"
              type="date"
              value={dateFrom}
              max={dateTo}
              onChange={(e) => handleDateChange("dateFrom", e.target.value)}
              className="h-8 w-36 text-xs"
            />
            <span className="text-muted-foreground">→</span>
            <Input
              id="date-to"
              type="date"
              value={dateTo}
              min={dateFrom}
              max={todayString()}
              onChange={(e) => handleDateChange("dateTo", e.target.value)}
              className="h-8 w-36 text-xs"
            />
          </div>

          {/* Status filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Lọc
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Lọc trạng thái</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(
                [
                  { value: "paid", label: "Đã thanh toán" },
                  { value: "processing", label: "Đang xử lý" },
                  { value: "unfulfilled", label: "Chưa giao" },
                ] as { value: OrderStatus; label: string }[]
              ).map(({ value, label }) => (
                <DropdownMenuCheckboxItem
                  key={value}
                  checked={activeFilters.includes(value)}
                  onCheckedChange={() => toggleFilter(value)}
                >
                  {label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            size="sm"
            variant="outline"
            className="h-8 gap-2 hidden sm:flex"
          >
            <File className="h-4 w-4" />
            <span className="whitespace-nowrap">Xuất</span>
          </Button>
        </div>
      </div>

      {/* Add order */}
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

      {/* ── Desktop Table ── */}
      <Card className="hidden md:block">
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Spinner />
              <span className="ml-2 text-muted-foreground">
                Đang tải đơn hàng...
              </span>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              Không tìm thấy đơn hàng.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Đơn hàng</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày</TableHead>
                  <TableHead className="text-right">Số tiền</TableHead>
                  <TableHead className="w-[50px]" />
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
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell className="text-right">{order.amount}</TableCell>
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
                          <DropdownMenuSeparator />
                          <DropdownMenuCheckboxItem checked={false}>
                            Xem đơn hàng
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem checked={false}>
                            Chỉnh sửa
                          </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* ── Mobile Accordion ── */}
      {isLoading ? (
        <div className="md:hidden flex items-center justify-center py-10">
          <Spinner />
          <span className="ml-2 text-muted-foreground">
            Đang tải đơn hàng...
          </span>
        </div>
      ) : orders.length === 0 ? (
        <div className="md:hidden text-center py-10 text-muted-foreground">
          Không tìm thấy đơn hàng.
        </div>
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
                    <StatusBadge status={order.status} small />
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

      {/* ── Pagination ── */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between gap-4 py-2">
          <p className="text-sm text-muted-foreground">
            Hiển thị{" "}
            <span className="font-medium">
              {(pagination.page - 1) * pagination.pageSize + 1}
            </span>
            {" – "}
            <span className="font-medium">
              {Math.min(
                pagination.page * pagination.pageSize,
                pagination.total,
              )}
            </span>{" "}
            / <span className="font-medium">{pagination.total}</span> đơn hàng
          </p>
          <div className="flex items-center gap-1">
            <Button
              id="pagination-prev"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={page <= 1 || isLoading}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 ||
                  p === pagination.totalPages ||
                  Math.abs(p - page) <= 1,
              )
              .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                if (idx > 0 && p - (arr[idx - 1] as number) > 1)
                  acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "..." ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="px-1 text-muted-foreground text-sm"
                  >
                    …
                  </span>
                ) : (
                  <Button
                    key={p}
                    id={`pagination-page-${p}`}
                    variant={p === page ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8 text-xs"
                    disabled={isLoading}
                    onClick={() => setPage(p as number)}
                  >
                    {p}
                  </Button>
                ),
              )}
            <Button
              id="pagination-next"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={page >= pagination.totalPages || isLoading}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
