// Shared types for the admin domain

export type OrderStatus = "paid" | "processing" | "unfulfilled";

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone?: string;
  customerAddress?: string;
  productName?: string;
  status: OrderStatus;
  date: string;
  amount: string;
};

export type CreateOrderPayload = {
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  productName?: string;
  amount: number;
  status?: OrderStatus;
};

export type GetOrdersParams = {
  statuses?: OrderStatus[];
  page?: number;
  pageSize?: number;
  /** ISO date string, defaults to 6 months ago */
  dateFrom?: string;
  /** ISO date string, defaults to now */
  dateTo?: string;
};

export type Pagination = {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type OrdersResponse = {
  orders: Order[];
  pagination: Pagination;
};

export type MonthlyRevenue = {
  month: string; // ISO date string from DATE_TRUNC
  revenue: number;
  count: number;
};

export type DashboardStats = {
  monthlyRevenue: MonthlyRevenue[];
};

// ─── Products / Inventory ─────────────────────────────────────────────────────

export type ProductCategory = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  description?: string | null;
  pricePerUnit: number;
  unitType: string;
  stockQuantity: number;
  origin: string;
  shelfLifeDays: number;
  isDeleted: boolean;
  categoryId: string;
  category: ProductCategory;
  createdAt: string;
  updatedAt: string;
};

export type CreateProductPayload = {
  sku: string;
  name: string;
  description?: string;
  pricePerUnit: number;
  unitType: string;
  stockQuantity?: number;
  origin?: string;
  shelfLifeDays?: number;
  categoryId: string;
};

export type UpdateProductPayload = Partial<CreateProductPayload> & {
  id: string;
};

export type GetProductsParams = {
  search?: string;
  categoryId?: string;
  page?: number;
  pageSize?: number;
};

export type ProductsResponse = {
  products: Product[];
  pagination: Pagination;
};
