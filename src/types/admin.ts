// Shared types for the admin domain

export type DeliveryStatus =
  | "processing"
  | "delivering"
  | "delivered"
  | "returned"
  | "cancelled";
export type PaymentStatus = "unpaid" | "paid" | "refunded";

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone?: string;
  customerAddress?: string;
  orderDescription?: string;
  deliveryStatus: DeliveryStatus;
  paymentStatus: PaymentStatus;
  date: string;
  amount: string; // formatted string e.g. "85.000 VNĐ"
  rawAmount?: number; // raw number for edit form
};

export type UpdateOrderPayload = {
  id: string;
  customerName?: string;
  customerPhone?: string;
  customerAddress?: string;
  orderDescription?: string;
  amount?: number;
  deliveryStatus?: DeliveryStatus;
  paymentStatus?: PaymentStatus;
};

export type CreateOrderPayload = {
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  orderDescription?: string;
  amount: number;
  deliveryStatus?: DeliveryStatus;
  paymentStatus?: PaymentStatus;
};

export type GetOrdersParams = {
  deliveryStatuses?: DeliveryStatus[];
  paymentStatuses?: PaymentStatus[];
  page?: number;
  pageSize?: number;
  /** ISO date string, defaults to 6 months ago */
  dateFrom?: string;
  /** ISO date string, defaults to now */
  dateTo?: string;
  /** Filter orders by a specific customer's phone number */
  customerPhone?: string;
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
  slug: string;
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
  isFeatured: boolean;
  img: string | null;
  images: string[] | null;
  note: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateProductPayload = {
  sku: string;
  slug: string;
  name: string;
  description?: string;
  pricePerUnit: number;
  unitType: string;
  stockQuantity?: number;
  origin?: string;
  shelfLifeDays?: number;
  categoryId: string;
  isFeatured?: boolean;
  img?: string | null;
  images?: string[] | null;
  note?: string | null;
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

// ─── Customers ──────────────────────────────────────────────────────────────

export type Customer = {
  customerName: string;
  customerPhone: string;
  orderCount: number;
  totalSpent: number;
  totalSpentFormatted: string;
};

export type GetCustomersParams = {
  search?: string;
  page?: number;
  pageSize?: number;
};

export type CustomersResponse = {
  customers: Customer[];
  pagination: Pagination;
};
