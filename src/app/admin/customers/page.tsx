"use client";

import StatusBadge from "@/components/status-badge/StatusBadge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { getCustomers, getOrders } from "@/services/admin.service";
import type { Customer } from "@/types/admin";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  Package,
  Phone,
  Search,
  ShoppingBag,
  User,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const PAGE_SIZE = 20;

export default function CustomersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);
  const [expandedPhone, setExpandedPhone] = useState<string | null>(null);

  // Reset to page 1 on search change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading } = useQuery({
    queryKey: [...QUERY_KEY.ADMIN.CUSTOMERS, page, debouncedSearch],
    queryFn: () =>
      getCustomers({ page, pageSize: PAGE_SIZE, search: debouncedSearch }),
    placeholderData: (prev) => prev,
  });

  const customers = data?.customers ?? [];
  const pagination = data?.pagination;

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      {/* ── Header ── */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight">Khách hàng</h1>
        {pagination && (
          <span className="text-sm text-muted-foreground">
            ({pagination.total} khách hàng)
          </span>
        )}
      </div>

      {/* ── Search ── */}
      <div className="relative w-full md:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          id="customers-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo tên hoặc số điện thoại..."
          className="pl-9 h-10 rounded-xl"
        />
      </div>

      {/* ── Table ── */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Spinner className="size-5" />
              <span className="ml-2 text-muted-foreground">
                Đang tải khách hàng...
              </span>
            </div>
          ) : customers.length === 0 ? (
            <div className="text-center py-14 text-muted-foreground">
              Không tìm thấy khách hàng nào.
            </div>
          ) : (
            <Accordion
              type="single"
              collapsible
              value={expandedPhone ?? ""}
              onValueChange={(v) => setExpandedPhone(v || null)}
            >
              {customers.map((customer, idx) => (
                <CustomerRow
                  key={customer.customerPhone + idx}
                  customer={customer}
                  isExpanded={expandedPhone === customer.customerPhone}
                />
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>

      {/* ── Pagination ── */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between gap-4 py-2">
          <p className="text-sm text-muted-foreground">
            {(pagination.page - 1) * pagination.pageSize + 1}–
            {Math.min(pagination.page * pagination.pageSize, pagination.total)}{" "}
            / {pagination.total}
          </p>
          <div className="flex items-center gap-1">
            <Button
              id="customers-prev"
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
                    id={`customers-page-${p}`}
                    variant={p === page ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8 text-xs"
                    onClick={() => setPage(p as number)}
                  >
                    {p}
                  </Button>
                ),
              )}
            <Button
              id="customers-next"
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

// ─── Customer accordion row ────────────────────────────────────────────────────
function CustomerRow({
  customer,
  isExpanded,
}: {
  customer: Customer;
  isExpanded: boolean;
}) {
  const { data, isLoading } = useQuery({
    queryKey: [
      ...QUERY_KEY.ADMIN.ORDERS,
      "by-customer",
      customer.customerPhone,
    ],
    queryFn: () =>
      getOrders({
        customerPhone: customer.customerPhone,
        pageSize: 100, // load all their orders
        // override date range to all time
        dateFrom: "2000-01-01",
        dateTo: new Date().toISOString().split("T")[0],
      }),
    enabled: isExpanded, // only fetch when the row is open
    staleTime: 30_000,
  });

  const orders = data?.orders ?? [];

  return (
    <AccordionItem
      value={customer.customerPhone}
      className="border-b last:border-b-0 px-0"
    >
      <AccordionTrigger className="hover:no-underline px-4 py-4 hover:bg-muted/40 transition-colors data-[state=open]:bg-muted/50">
        <div className="flex items-center gap-4 w-full text-left pr-4">
          {/* Avatar */}
          <div className="shrink-0 h-10 w-10 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
            {customer.customerName.charAt(0).toUpperCase()}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">
              {customer.customerName}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
              <Phone className="h-3 w-3" /> {customer.customerPhone}
            </p>
          </div>

          {/* Stats */}
          <div className="hidden sm:flex items-center gap-6 mr-2">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Đơn hàng</p>
              <p className="font-bold text-sm">{customer.orderCount}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Tổng chi</p>
              <p className="font-bold text-sm text-blue-600">
                {customer.totalSpentFormatted}
              </p>
            </div>
          </div>

          {/* Mobile: just order count badge */}
          <div className="sm:hidden flex items-center gap-1 text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded-full mr-2">
            <ShoppingBag className="h-3 w-3" />
            {customer.orderCount}
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-4 pb-4 pt-0">
        {/* Mobile stats */}
        <div className="sm:hidden grid grid-cols-2 gap-3 mb-4 mt-2">
          <StatCard
            icon={<ShoppingBag className="h-4 w-4 text-blue-500" />}
            label="Đơn hàng"
            value={String(customer.orderCount)}
          />
          <StatCard
            icon={<Wallet className="h-4 w-4 text-green-500" />}
            label="Tổng chi"
            value={customer.totalSpentFormatted}
          />
        </div>

        {isLoading ? (
          <div className="flex items-center gap-2 py-4 text-muted-foreground text-sm">
            <Spinner className="size-4" /> Đang tải đơn hàng...
          </div>
        ) : orders.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">
            Không có đơn hàng nào.
          </p>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block rounded-xl border overflow-hidden mt-2">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="text-xs">Mã ĐH</TableHead>
                    <TableHead className="text-xs">Sản phẩm</TableHead>
                    <TableHead className="text-xs">Trạng thái</TableHead>
                    <TableHead className="text-xs">Ngày</TableHead>
                    <TableHead className="text-xs text-right">
                      Số tiền
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="text-sm">
                      <TableCell className="font-mono font-medium text-xs">
                        {order.orderNumber}
                      </TableCell>
                      <TableCell className="max-w-[180px] truncate">
                        {order.productName || "—"}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} small />
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {order.date}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {order.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden flex flex-col gap-2 mt-2">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl border bg-background p-3 flex items-start justify-between gap-3"
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-muted-foreground">
                        {order.orderNumber}
                      </span>
                      <StatusBadge status={order.status} small />
                    </div>
                    {order.productName && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                        <Package className="h-3 w-3 shrink-0" />{" "}
                        {order.productName}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {order.date}
                    </p>
                  </div>
                  <span className="font-bold text-sm text-blue-600 shrink-0">
                    {order.amount}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

// ─── Tiny stat card (mobile) ──────────────────────────────────────────────────
function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5 bg-muted/40 rounded-xl p-3 border">
      {icon}
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-bold text-sm">{value}</p>
      </div>
    </div>
  );
}
