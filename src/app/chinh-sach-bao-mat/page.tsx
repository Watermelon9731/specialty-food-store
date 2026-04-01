import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính Sách Bảo Mật Thông Tin Cá Nhân",
  description:
    "Chính sách bảo mật của Tré Bà Liên về thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân khi khách hàng đặt hàng hoặc liên hệ.",
  alternates: {
    canonical: "/chinh-sach-bao-mat",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f8f7f4] py-12 md:py-16 border-t border-slate-100">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <article className="rounded-[2rem] bg-white border border-slate-100 shadow-sm p-6 md:p-10 space-y-8">
          <header className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
              Tré Bà Liên
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              Chính sách bảo mật
            </h1>
            <p className="text-sm text-slate-500">
              Cập nhật lần cuối: 01/04/2026
            </p>
          </header>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              1. Thông tin được thu thập
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Chúng tôi có thể thu thập các thông tin cần thiết để xử lý đơn
              hàng và hỗ trợ khách hàng như: họ tên, số điện thoại, email, địa
              chỉ giao nhận và nội dung trao đổi liên quan đến đơn hàng.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              2. Mục đích sử dụng thông tin
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Dữ liệu được dùng để xác nhận đơn, giao hàng, chăm sóc sau bán và
              cải thiện chất lượng dịch vụ. Chúng tôi không bán hoặc chia sẻ dữ
              liệu cá nhân cho bên thứ ba vì mục đích thương mại trái phép.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              3. Thời gian lưu trữ
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Thông tin được lưu trong thời gian cần thiết để phục vụ giao dịch,
              hậu mãi và tuân thủ yêu cầu pháp lý liên quan, hoặc cho đến khi có
              yêu cầu xóa hợp lệ từ chủ thể dữ liệu.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              4. Bảo mật thông tin cá nhân
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Chúng tôi áp dụng các biện pháp quản lý và kỹ thuật phù hợp để bảo
              vệ thông tin cá nhân khỏi truy cập trái phép, mất mát, thay đổi
              hoặc rò rỉ không mong muốn.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              5. Quyền của khách hàng
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Khách hàng có quyền yêu cầu xem, cập nhật, điều chỉnh hoặc xóa dữ
              liệu cá nhân của mình. Mọi yêu cầu có thể gửi qua email hoặc kênh
              liên hệ chính thức được công bố trên website.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              6. Chia sẻ với bên thứ ba
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Trong phạm vi cần thiết, chúng tôi chỉ chia sẻ thông tin tối thiểu
              với đơn vị vận chuyển hoặc đối tác kỹ thuật để hoàn tất dịch vụ,
              và yêu cầu các bên này tuân thủ nghĩa vụ bảo mật tương ứng.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              7. Cập nhật chính sách
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Chính sách có thể được điều chỉnh theo thay đổi pháp lý hoặc hoạt
              động vận hành. Phiên bản mới nhất luôn được đăng công khai tại
              trang này.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
