"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QUERY_KEY } from "@/constants/query-key/query-key";
import { getDashboardStats } from "@/services/admin.service";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getOrders } from "@/services/admin.service";

export default function AdminPage() {
  const { data: stats } = useQuery({
    queryKey: QUERY_KEY.ADMIN.STATS,
    queryFn: getDashboardStats,
  });

  const totalRevenue =
    stats?.monthlyRevenue.reduce((acc, month) => acc + month.revenue, 0) || 0;

  const totalOrders =
    stats?.monthlyRevenue.reduce((acc, month) => acc + month.count, 0) || 0;

  const { data: ordersData } = useQuery({
    queryKey: [...QUERY_KEY.ADMIN.ORDERS, { page: 1, pageSize: 10 }],
    queryFn: () => getOrders({ page: 1, pageSize: 10 }),
  });

  const recentOrders = ordersData?.orders || [];

  const renderIncreaseTrend = (
    currentValue: number,
    prevValue: number | undefined,
  ) => {
    if (!currentValue || !prevValue) return null;
    const increase = currentValue - prevValue;
    const percentage = (increase / prevValue) * 100;
    return (
      <p className="text-xs text-muted-foreground">
        +{percentage.toFixed(2)}% so với tháng trước
      </p>
    );
  };

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-xl md:text-3xl font-bold tracking-tight">
          Tổng quan
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalRevenue?.toLocaleString("vi-VN")} VNĐ
            </div>
            {renderIncreaseTrend(
              totalRevenue,
              stats?.monthlyRevenue[0].revenue,
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đơn hàng</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            {renderIncreaseTrend(totalOrders, stats?.monthlyRevenue[0].count)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sản phẩm</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% so với tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Khách hàng</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 so với giờ trước
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4 overflow-hidden">
          <CardHeader>
            <CardTitle>Tổng quan</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={stats?.monthlyRevenue}>
                <XAxis
                  dataKey="month"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleString("vi-VN", {
                      month: "short",
                      year: "numeric",
                    })
                  }
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={60}
                  tickFormatter={(value) =>
                    value >= 1000000
                      ? `${(value / 1000000).toLocaleString("vi-VN")}M ₫`
                      : `${new Intl.NumberFormat("vi-VN").format(value)} ₫`
                  }
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  cursor={{ fill: "transparent" }}
                  labelFormatter={(value) =>
                    new Date(value).toLocaleString("vi-VN", {
                      month: "short",
                      year: "numeric",
                    })
                  }
                  formatter={(value) => {
                    if (typeof value !== "number") return value;
                    if (value >= 1000000) {
                      return `${(value / 1000000).toLocaleString("vi-VN")}M ₫`;
                    }
                    return `${new Intl.NumberFormat("vi-VN").format(value)} ₫`;
                  }}
                />
                <Bar
                  dataKey="revenue"
                  fill="currentColor"
                  radius={[4, 4, 0, 0]}
                  className="fill-primary"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Đơn hàng gần đây</CardTitle>
            <div className="text-sm text-muted-foreground">
              Tổng đơn tháng này.
            </div>
          </CardHeader>
          <CardContent className="pl-2 md:pl-6">
            <div className="space-y-8">
              {recentOrders.length === 0 ? (
                <div className="text-sm text-center text-muted-foreground py-4">
                  Chưa có đơn hàng nào
                </div>
              ) : (
                recentOrders.map((order) => {
                  const initials =
                    order.customerName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)
                      .toUpperCase() || "NN";

                  return (
                    <div
                      key={order.id}
                      className="flex flex-col sm:flex-row gap-2 sm:items-center"
                    >
                      <div className="flex items-center flex-1 min-w-0">
                        <div className="hidden md:flex h-9 w-9 shrink-0 rounded-full bg-secondary items-center justify-center font-bold text-xs text-secondary-foreground">
                          {initials}
                        </div>
                        <div className="ml-0 md:ml-4 space-y-1 overflow-hidden">
                          <p className="text-sm font-medium leading-none truncate">
                            {order.customerName || "Khách hàng"}
                            <span className="ml-2 text-xs text-muted-foreground">
                              #{order.orderNumber}
                            </span>
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground truncate flex items-center gap-2">
                            {order.customerPhone && (
                              <span>{order.customerPhone}</span>
                            )}
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                order.paymentStatus === "paid"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {order.paymentStatus === "paid"
                                ? "Đã TT"
                                : "Chưa TT"}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="sm:ml-auto font-medium text-sm whitespace-nowrap text-right">
                        +{order.amount}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
