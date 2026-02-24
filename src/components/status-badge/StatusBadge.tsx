import { Badge } from "@/components/ui/badge";

export default function StatusBadge({
  status,
  small,
}: {
  status: string;
  small?: boolean;
}) {
  const cls = small ? "text-xs py-0 h-5 leading-none flex items-center" : "";
  if (status === "paid")
    return (
      <Badge
        className={`bg-green-100 text-green-700 hover:bg-green-100/80 border-green-200 ${cls}`}
      >
        Đã thanh toán
      </Badge>
    );
  if (status === "processing")
    return (
      <Badge variant="secondary" className={cls}>
        Đang xử lý
      </Badge>
    );
  return (
    <Badge variant="outline" className={cls}>
      Chưa giao
    </Badge>
  );
}
