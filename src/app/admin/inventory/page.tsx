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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import {
  createProduct,
  deleteProduct,
  getCategories,
  getProducts,
  updateProduct,
} from "@/services/admin.service";
import type {
  CreateProductPayload,
  Product,
  ProductCategory,
} from "@/types/admin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const LOW_STOCK_THRESHOLD = 10;
const PAGE_SIZE = 20;

// ─── Blank form ───
const BLANK: CreateProductPayload = {
  sku: "",
  slug: "",
  name: "",
  description: "",
  pricePerUnit: 0,
  unitType: "g",
  stockQuantity: 0,
  origin: "Việt Nam",
  shelfLifeDays: 365,
  categoryId: "",
  isFeatured: false,
  img: "",
  note: "",
};

export default function InventoryPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<CreateProductPayload>(BLANK);
  const [formError, setFormError] = useState<string | null>(null);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading } = useQuery({
    queryKey: [...QUERY_KEY.ADMIN.INVENTORY, page, debouncedSearch],
    queryFn: () =>
      getProducts({ page, pageSize: PAGE_SIZE, search: debouncedSearch }),
    placeholderData: (prev) => prev,
  });

  const { data: categoriesData } = useQuery({
    queryKey: QUERY_KEY.ADMIN.CATEGORIES,
    queryFn: getCategories,
    staleTime: Infinity,
  });

  const categories: ProductCategory[] = categoriesData ?? [];
  const products = data?.products ?? [];
  const pagination = data?.pagination;

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: QUERY_KEY.ADMIN.INVENTORY });

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      invalidate();
      closeDialog();
    },
    onError: (e: Error) => setFormError(e.message),
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      invalidate();
      closeDialog();
    },
    onError: (e: Error) => setFormError(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => invalidate(),
  });

  const openCreate = () => {
    setEditProduct(null);
    setForm(BLANK);
    setFormError(null);
    setDialogOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditProduct(product);
    setForm({
      sku: product.sku,
      slug: product.slug,
      name: product.name,
      description: product.description ?? "",
      pricePerUnit: product.pricePerUnit,
      unitType: product.unitType,
      stockQuantity: product.stockQuantity,
      origin: product.origin,
      shelfLifeDays: product.shelfLifeDays,
      categoryId: product.categoryId,
      isFeatured: !!product.isFeatured,
      img: product.img ?? "",
      note: product.note ?? "",
    });
    setFormError(null);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setTimeout(() => {
      setEditProduct(null);
      setForm(BLANK);
      setFormError(null);
    }, 200);
  };

  const handleField =
    (field: keyof CreateProductPayload) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const numberFields = ["pricePerUnit", "stockQuantity", "shelfLifeDays"];
      const isCheckbox = e.target.type === "checkbox";
      setForm((prev) => ({
        ...prev,
        [field]: isCheckbox
          ? (e.target as HTMLInputElement).checked
          : numberFields.includes(field)
            ? Number(e.target.value)
            : e.target.value,
      }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (editProduct) {
      updateMutation.mutate({ id: editProduct.id, ...form });
    } else {
      createMutation.mutate(form);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Xóa sản phẩm "${name}"? Hành động này không thể hoàn tác.`))
      return;
    deleteMutation.mutate(id);
  };

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      {/* ── Header ── */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight">Kho hàng</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              id="add-product-btn"
              size="sm"
              className="ml-auto h-9 gap-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
              onClick={openCreate}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Thêm sản phẩm</span>
            </Button>
          </DialogTrigger>

          {/* ── Product Form Dialog ── */}
          <DialogContent className="sm:max-w-[540px] w-[95vw] p-0 rounded-2xl overflow-hidden gap-0">
            <DialogHeader className="px-6 pt-6 pb-4 border-b bg-linear-to-r from-blue-600 to-blue-500">
              <DialogTitle className="text-xl font-bold text-white">
                {editProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
              </DialogTitle>
              <p className="text-sm text-blue-100 mt-0.5">
                {editProduct
                  ? `Đang chỉnh sửa: ${editProduct.name}`
                  : "Điền thông tin để thêm sản phẩm vào kho."}
              </p>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="px-6 py-5 flex flex-col gap-4 max-h-[65vh] overflow-y-auto">
                {/* Row: SKU + Name */}
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="SKU" required>
                    <Input
                      id="sku"
                      value={form.sku}
                      onChange={handleField("sku")}
                      placeholder="MANGO-100"
                      className="h-10 rounded-xl"
                      required
                    />
                  </FormField>
                  <FormField label="Đường dẫn (Slug)" required>
                    <Input
                      id="slug"
                      value={form.slug}
                      onChange={handleField("slug")}
                      placeholder="mit-say-kho"
                      className="h-10 rounded-xl"
                      required
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Tên sản phẩm" required>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={handleField("name")}
                      placeholder="Mít sấy khô"
                      className="h-10 rounded-xl"
                      required
                    />
                  </FormField>
                  <FormField label="Đơn vị" required>
                    <div className="flex gap-2">
                      {["g", "chiếc", "cây"].map((unit) => (
                        <button
                          key={unit}
                          type="button"
                          data-selected={form.unitType === unit}
                          onClick={() =>
                            setForm((prev) => ({ ...prev, unitType: unit }))
                          }
                          className="flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition-all cursor-pointer
                            border-slate-300 bg-slate-50 text-slate-700
                            data-[selected=true]:border-blue-600 data-[selected=true]:bg-blue-600 data-[selected=true]:text-white data-[selected=true]:ring-2 data-[selected=true]:ring-blue-300"
                        >
                          {unit}
                        </button>
                      ))}
                    </div>
                  </FormField>
                </div>

                <FormField label="Mô tả">
                  <textarea
                    id="description"
                    value={form.description}
                    onChange={handleField("description")}
                    placeholder="Mô tả ngắn về sản phẩm..."
                    rows={2}
                    className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm shadow-xs resize-none focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </FormField>

                <FormField label="Ghi chú thẻ sản phẩm (Ví dụ: Best Seller)">
                  <Input
                    id="note"
                    value={form.note || ""}
                    onChange={handleField("note")}
                    placeholder="Món bán chạy nhất..."
                    className="h-10 rounded-xl"
                  />
                </FormField>

                <FormField label="URL Hình ảnh">
                  <Input
                    id="img"
                    value={form.img || ""}
                    onChange={handleField("img")}
                    placeholder="https://example.com/image.png"
                    className="h-10 rounded-xl"
                  />
                </FormField>

                {/* Row: Price + Stock */}
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Giá (VNĐ)" required>
                    <Input
                      id="pricePerUnit"
                      type="number"
                      min={0}
                      step={1000}
                      value={form.pricePerUnit || ""}
                      onChange={handleField("pricePerUnit")}
                      placeholder="85000"
                      className="h-10 rounded-xl"
                      required
                    />
                  </FormField>
                  <FormField label="Tồn kho">
                    <Input
                      id="stockQuantity"
                      type="number"
                      min={0}
                      value={form.stockQuantity || ""}
                      onChange={handleField("stockQuantity")}
                      placeholder="50"
                      className="h-10 rounded-xl"
                    />
                  </FormField>
                </div>

                {/* Row: Origin + Shelf life */}
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Xuất xứ">
                    <Input
                      id="origin"
                      value={form.origin}
                      onChange={handleField("origin")}
                      placeholder="Việt Nam"
                      className="h-10 rounded-xl"
                    />
                  </FormField>
                  <FormField label="Hạn sử dụng (ngày)">
                    <Input
                      id="shelfLifeDays"
                      type="number"
                      min={1}
                      value={form.shelfLifeDays || ""}
                      onChange={handleField("shelfLifeDays")}
                      placeholder="365"
                      className="h-10 rounded-xl"
                    />
                  </FormField>
                </div>

                {/* Category */}
                <FormField label="Danh mục" required>
                  <select
                    id="categoryId"
                    value={form.categoryId}
                    onChange={handleField("categoryId")}
                    required
                    className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="">Chọn danh mục...</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </FormField>

                {/* isFeatured toggle */}
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={form.isFeatured || false}
                    onChange={handleField("isFeatured")}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                  <Label
                    htmlFor="isFeatured"
                    className="text-sm cursor-pointer"
                  >
                    Sản phẩm nổi bật (Hiển thị trang chủ)
                  </Label>
                </div>

                {formError && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                    {formError}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-muted/30">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeDialog}
                  disabled={isSubmitting}
                  className="rounded-xl h-10 px-5"
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl h-10 px-5 bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Spinner className="size-4" /> Đang lưu...
                    </span>
                  ) : editProduct ? (
                    "Lưu thay đổi"
                  ) : (
                    "Thêm sản phẩm"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* ── Search ── */}
      <div className="relative w-full md:w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          id="inventory-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo tên hoặc SKU..."
          className="pl-9 h-10 rounded-xl"
        />
      </div>

      {/* ── Table ── */}
      <Card>
        <CardHeader>
          <CardTitle>Sản phẩm</CardTitle>
          <CardDescription>
            {pagination ? `${pagination.total} sản phẩm` : "Đang tải..."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Spinner className="size-5" />
              <span className="ml-2 text-muted-foreground">
                Đang tải sản phẩm...
              </span>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Không tìm thấy sản phẩm nào.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Tên sản phẩm</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Danh mục
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Tồn kho
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Giá</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Xuất xứ
                  </TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="w-[50px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {product.sku}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>{product.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {product.unitType}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm">
                      {product.category.name}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {product.stockQuantity}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm">
                      {new Intl.NumberFormat("vi-VN").format(
                        Number(product.pricePerUnit),
                      )}{" "}
                      VNĐ
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                      {product.origin}
                    </TableCell>
                    <TableCell>
                      {product.stockQuantity <= 0 ? (
                        <Badge variant="destructive" className="text-xs">
                          Hết hàng
                        </Badge>
                      ) : product.stockQuantity <= LOW_STOCK_THRESHOLD ? (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-orange-100 text-orange-700 border-orange-200"
                        >
                          Sắp hết
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-xs bg-green-50 text-green-700 border-green-200"
                        >
                          Còn hàng
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            id={`product-menu-${product.id}`}
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
                          <DropdownMenuItem
                            onClick={() => openEdit(product)}
                            className="gap-2 cursor-pointer"
                          >
                            <Pencil className="h-3.5 w-3.5" /> Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleDelete(product.id, product.name)
                            }
                            className="gap-2 cursor-pointer text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Xóa
                          </DropdownMenuItem>
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

      {/* ── Pagination ── */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between gap-4 py-2">
          <p className="text-sm text-muted-foreground">
            {(pagination.page - 1) * pagination.pageSize + 1}–
            {Math.min(pagination.page * pagination.pageSize, pagination.total)}{" "}
            / {pagination.total} sản phẩm
          </p>
          <div className="flex items-center gap-1">
            <Button
              id="inv-prev"
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
                    id={`inv-page-${p}`}
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
              id="inv-next"
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

// ─── Helper ───────────────────────────────────────────────────────────────────
function FormField({
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
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
    </div>
  );
}
