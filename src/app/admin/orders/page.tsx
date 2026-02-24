"use client";

import { AddOrderDialog } from "@/components/admin/AddOrderDialog";
import StatusBadge from "@/components/status-badge/StatusBadge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { deleteOrder, getOrders, updateOrder } from "@/services/admin.service";
import type { Order, OrderStatus, UpdateOrderPayload } from "@/types/admin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  File,
  ListFilter,
  MoreHorizontal,
  Pencil,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { useState } from "react";

const PAGE_SIZE = 10;

function defaultDateFrom() {
  const d = new Date();
  d.setMonth(d.getMonth() - 6);
  return d.toISOString().split("T")[0];
}
function todayString() {
  return new Date().toISOString().split("T")[0];
}

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "processing", label: "Đang xử lý" },
  { value: "paid", label: "Đã thanh toán" },
  { value: "unfulfilled", label: "Chưa giao" },
];

export default function OrdersPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<OrderStatus[]>([
    "paid",
    "processing",
    "unfulfilled",
  ]);
  const [dateFrom, setDateFrom] = useState(defaultDateFrom());
  const [dateTo, setDateTo] = useState(todayString());

  // Edit dialog state
  const [editOrder, setEditOrder] = useState<Order | null>(null);
  const [editForm, setEditForm] = useState<Omit<UpdateOrderPayload, "id">>({});
  const [editError, setEditError] = useState<string | null>(null);

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

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: QUERY_KEY.ADMIN.ORDERS });

  const updateMutation = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      invalidate();
      setEditOrder(null);
    },
    onError: (e: Error) => setEditError(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => invalidate(),
  });

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

  const openEdit = (order: Order) => {
    setEditOrder(order);
    setEditForm({
      customerName: order.customerName,
      customerPhone: order.customerPhone ?? "",
      customerAddress: order.customerAddress ?? "",
      productName: order.productName ?? "",
      amount: order.rawAmount ?? 0,
      status: order.status,
    });
    setEditError(null);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editOrder) return;
    setEditError(null);
    updateMutation.mutate({ id: editOrder.id, ...editForm });
  };

  const handleDelete = (order: Order) => {
    if (
      !confirm(
        `Xóa đơn hàng ${order.orderNumber} của "${order.customerName}"? Hành động này không thể hoàn tác.`,
      )
    )
      return;
    deleteMutation.mutate(order.id);
  };

  const field =
    (key: keyof Omit<UpdateOrderPayload, "id">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setEditForm((prev) => ({
        ...prev,
        [key]: key === "amount" ? Number(e.target.value) : e.target.value,
      }));

  return (
    <div className="grid flex-1 items-start gap-4 p-2 sm:px-6 sm:py-0 md:gap-8">
      {/* ── Header ── */}
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
              {STATUS_OPTIONS.map(({ value, label }) => (
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
            <span>Xuất</span>
          </Button>
        </div>
      </div>

      {/* ── Add order ── */}
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

      {/* ── Edit Order Dialog ── */}
      <Dialog open={!!editOrder} onOpenChange={(o) => !o && setEditOrder(null)}>
        <DialogContent className="sm:max-w-[480px] w-[95vw] p-0 rounded-2xl overflow-hidden gap-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b bg-linear-to-r from-blue-600 to-blue-500">
            <DialogTitle className="text-xl font-bold text-white">
              Chỉnh sửa đơn hàng
            </DialogTitle>
            <p className="text-sm text-blue-100 mt-0.5">
              {editOrder?.orderNumber}
            </p>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="flex flex-col">
            <div className="px-6 py-5 flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
              <EField label="Tên khách hàng" required>
                <Input
                  value={editForm.customerName ?? ""}
                  onChange={field("customerName")}
                  placeholder="Nguyễn Văn A"
                  className="h-10 rounded-xl"
                  required
                />
              </EField>
              <EField label="Số điện thoại">
                <Input
                  value={editForm.customerPhone ?? ""}
                  onChange={field("customerPhone")}
                  placeholder="0901 234 567"
                  className="h-10 rounded-xl"
                />
              </EField>
              <EField label="Địa chỉ">
                <Input
                  value={editForm.customerAddress ?? ""}
                  onChange={field("customerAddress")}
                  placeholder="123 Lê Lợi, Q.1"
                  className="h-10 rounded-xl"
                />
              </EField>
              <EField label="Sản phẩm">
                <Input
                  value={editForm.productName ?? ""}
                  onChange={field("productName")}
                  placeholder="Mít sấy 500g"
                  className="h-10 rounded-xl"
                />
              </EField>
              <EField label="Tổng tiền (VNĐ)">
                <div className="relative">
                  <Input
                    type="number"
                    min={0}
                    step={1000}
                    value={editForm.amount ?? ""}
                    onChange={field("amount")}
                    placeholder="150000"
                    className="h-10 rounded-xl pr-14"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                    VNĐ
                  </span>
                </div>
              </EField>
              <EField label="Trạng thái">
                <select
                  value={editForm.status ?? "processing"}
                  onChange={field("status")}
                  className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  {STATUS_OPTIONS.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </EField>
              {editError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                  {editError}
                </p>
              )}
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-muted/30">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditOrder(null)}
                disabled={updateMutation.isPending}
                className="rounded-xl h-10 px-5"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={updateMutation.isPending}
                className="rounded-xl h-10 px-5 bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
              >
                {updateMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <Spinner className="size-4" />
                    Đang lưu...
                  </span>
                ) : (
                  "Lưu thay đổi"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

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
                  <TableHead className="w-[130px]">Đơn hàng</TableHead>
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
                    <TableCell>
                      <div className="font-medium">{order.customerName}</div>
                      {order.customerPhone && (
                        <div className="text-xs text-muted-foreground">
                          {order.customerPhone}
                        </div>
                      )}
                    </TableCell>
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
                            <span className="sr-only">Menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuCheckboxItem
                            checked={false}
                            onClick={() => openEdit(order)}
                            className="gap-2 cursor-pointer"
                          >
                            <Pencil className="h-3.5 w-3.5 mr-1" />
                            Chỉnh sửa
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            checked={false}
                            onClick={() => handleDelete(order)}
                            className="gap-2 cursor-pointer text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            Xóa
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
                  <div className="flex flex-col items-start gap-2 w-full text-left pr-2">
                    <p className="font-semibold">{order.customerName}</p>
                    <span className="text-xs text-muted-foreground">
                      {order.date}
                    </span>
                    <span className="text-xs font-semibold tracking-widest text-slate-600 dark:text-slate-400">
                      {order.customerPhone}
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
                      <span className="font-bold text-blue-600 dark:text-blue-400">
                        {order.amount}
                      </span>
                    </div>
                    <div className="flex flex-col mt-0.5">
                      <span className="text-muted-foreground mb-1.5 text-xs">
                        Địa chỉ:
                      </span>
                      <span className="font-medium bg-white dark:bg-slate-950 p-2.5 rounded-lg border leading-relaxed">
                        {order.customerAddress || "Chưa cung cấp địa chỉ"}
                      </span>
                    </div>
                    <div className="flex gap-2 justify-end mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 w-full"
                        onClick={() => openEdit(order)}
                      >
                        <Pencil className="h-3.5 w-3.5 mr-1.5" />
                        Chỉnh sửa
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-9 w-full"
                        onClick={() => handleDelete(order)}
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                        Xóa
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
            {(pagination.page - 1) * pagination.pageSize + 1}–
            {Math.min(pagination.page * pagination.pageSize, pagination.total)}{" "}
            / {pagination.total} đơn hàng
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
              .reduce<(number | "...")[]>((acc, p, i, arr) => {
                if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "..." ? (
                  <span
                    key={`e-${i}`}
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

function EField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      {children}
    </div>
  );
}
