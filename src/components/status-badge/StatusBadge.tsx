import { Badge } from "@/components/ui/badge";

export default function StatusBadge({
  status,
  small,
}: {
  status: string;
  small?: boolean;
}) {
  const cls = small
    ? "text-xs px-1.5 py-0 h-5 leading-none flex items-center whitespace-nowrap"
    : "whitespace-nowrap";
  switch (status) {
    case "paid":
      return (
        <Badge
          className={`bg-emerald-100 text-emerald-700 hover:bg-emerald-100/80 border-emerald-200 ${cls}`}
        >
          Đã thanh toán
        </Badge>
      );
    case "refunded":
      return (
        <Badge
          className={`bg-orange-100 text-orange-700 hover:bg-orange-100/80 border-orange-200 ${cls}`}
        >
          Hoàn tiền
        </Badge>
      );
    case "unpaid":
      return (
        <Badge
          className={`bg-slate-100 text-slate-700 hover:bg-slate-100/80 border-slate-200 ${cls}`}
        >
          Chưa thanh toán
        </Badge>
      );
    case "processing":
      return (
        <Badge
          className={`bg-slate-100 text-slate-700 hover:bg-slate-100/80 border-slate-200 ${cls}`}
        >
          Đang xử lý
        </Badge>
      );
    case "delivering":
      return (
        <Badge
          className={`bg-blue-100 text-blue-700 hover:bg-blue-100/80 border-blue-200 ${cls}`}
        >
          Đang giao
        </Badge>
      );
    case "delivered":
      return (
        <Badge
          className={`bg-green-100 text-green-700 hover:bg-green-100/80 border-green-200 ${cls}`}
        >
          Đã giao
        </Badge>
      );
    case "returned":
      return (
        <Badge
          className={`bg-orange-100 text-orange-700 hover:bg-orange-100/80 border-orange-200 ${cls}`}
        >
          Hoàn trả
        </Badge>
      );
    case "cancelled":
      return (
        <Badge
          className={`bg-red-100 text-red-700 hover:bg-red-100/80 border-red-200 ${cls}`}
        >
          Đã hủy
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className={cls}>
          {status}
        </Badge>
      );
  }
}
