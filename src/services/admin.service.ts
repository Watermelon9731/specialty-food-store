import { API_ROUTES } from "@/constants/api/api";
import type {
  CreateOrderPayload,
  CreateProductPayload,
  DashboardStats,
  GetOrdersParams,
  GetProductsParams,
  Order,
  OrdersResponse,
  Product,
  ProductCategory,
  ProductsResponse,
  UpdateProductPayload,
} from "@/types/admin";

// ─── Dashboard ────────────────────────────────────────────────────────────────

export async function getDashboardStats(): Promise<DashboardStats> {
  const res = await fetch(API_ROUTES.ADMIN.DASHBOARD);
  const data = await res.json();
  if (!data.success)
    throw new Error(data.message ?? "Failed to fetch dashboard stats");
  return data.stats as DashboardStats;
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export async function getOrders(
  params: GetOrdersParams = {},
): Promise<OrdersResponse> {
  const res = await fetch(API_ROUTES.ADMIN.ORDERS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message ?? "Failed to fetch orders");
  return { orders: data.orders as Order[], pagination: data.pagination };
}

export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  const res = await fetch(API_ROUTES.ADMIN.ORDERS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "create", ...payload }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message ?? "Failed to create order");
  return data.order as Order;
}

// ─── Inventory / Products ──────────────────────────────────────────────────────

export async function getProducts(
  params: GetProductsParams = {},
): Promise<ProductsResponse> {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.categoryId) query.set("categoryId", params.categoryId);
  if (params.page) query.set("page", String(params.page));
  if (params.pageSize) query.set("pageSize", String(params.pageSize));

  const res = await fetch(`${API_ROUTES.ADMIN.INVENTORY}?${query.toString()}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error ?? "Failed to fetch products");
  return { products: data.products as Product[], pagination: data.pagination };
}

export async function createProduct(
  payload: CreateProductPayload,
): Promise<Product> {
  const res = await fetch(API_ROUTES.ADMIN.INVENTORY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error ?? "Failed to create product");
  return data.product as Product;
}

export async function updateProduct(
  payload: UpdateProductPayload,
): Promise<Product> {
  const res = await fetch(API_ROUTES.ADMIN.INVENTORY, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error ?? "Failed to update product");
  return data.product as Product;
}

export async function deleteProduct(id: string): Promise<void> {
  const res = await fetch(`${API_ROUTES.ADMIN.INVENTORY}?id=${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.error ?? "Failed to delete product");
}

// ─── Categories ───────────────────────────────────────────────────────────────

export async function getCategories(): Promise<ProductCategory[]> {
  const res = await fetch(
    API_ROUTES.ADMIN.INVENTORY.replace("inventory", "categories"),
  );
  const data = await res.json();
  if (!data.success)
    throw new Error(data.error ?? "Failed to fetch categories");
  return data.categories as ProductCategory[];
}
