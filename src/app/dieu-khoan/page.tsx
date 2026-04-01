import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Điều Khoản Sử Dụng Đặc Sản Bình Định",
  description:
    "Điều khoản sử dụng dịch vụ của Tré Bà Liên: phạm vi áp dụng, quy trình đặt hàng, thanh toán, đổi trả và trách nhiệm của các bên.",
  alternates: {
    canonical: "/dieu-khoan",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f8f7f4] py-12 md:py-16 border-t border-slate-100">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <article className="rounded-[2rem] bg-white border border-slate-100 shadow-sm p-6 md:p-10 space-y-8">
          <header className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
              Tré Bà Liên
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              Điều khoản sử dụng
            </h1>
            <p className="text-sm text-slate-500">
              Cập nhật lần cuối: 01/04/2026
            </p>
          </header>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              1. Phạm vi áp dụng
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Điều khoản này áp dụng cho mọi giao dịch mua sản phẩm, tư vấn và
              liên hệ trên website trebinhdinh.com và các kênh chính thức của
              Tré Bà Liên.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              2. Quyền và nghĩa vụ của khách hàng
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Khách hàng cung cấp thông tin chính xác khi đặt hàng, kiểm tra
              tình trạng sản phẩm ngay khi nhận và phản hồi sớm nếu phát sinh
              vấn đề. Khách hàng có trách nhiệm bảo quản sản phẩm theo hướng dẫn
              để đảm bảo chất lượng tốt nhất.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              3. Quyền và nghĩa vụ của Tré Bà Liên
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Chúng tôi cam kết cung cấp thông tin sản phẩm rõ ràng, chuẩn bị
              đơn hàng đúng xác nhận, hỗ trợ xử lý khiếu nại hợp lý và bảo mật
              dữ liệu cá nhân theo Chính sách bảo mật.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              4. Đặt hàng, giá bán và thanh toán
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Giá sản phẩm hiển thị theo từng thời điểm. Với sản phẩm ghi “Liên
              hệ để có giá tốt nhất”, giá được xác nhận tại thời điểm chốt đơn.
              Các phương thức thanh toán bao gồm chuyển khoản ngân hàng và các
              hình thức được thông báo tại thời điểm đặt hàng.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              5. Chính sách đổi trả
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Khách hàng vui lòng phản hồi trong vòng 24 giờ kể từ khi nhận
              hàng nếu sản phẩm giao sai, hư hỏng do vận chuyển hoặc có lỗi
              chất lượng rõ ràng. Chúng tôi sẽ phối hợp xác minh và đổi/trả phù
              hợp theo từng trường hợp.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              6. Giới hạn trách nhiệm
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Tré Bà Liên không chịu trách nhiệm với thiệt hại phát sinh do bảo
              quản sai hướng dẫn, sử dụng không đúng mục đích hoặc thông tin do
              khách hàng cung cấp không chính xác.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">
              7. Điều chỉnh điều khoản
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Nội dung điều khoản có thể được cập nhật để phù hợp với hoạt động
              thực tế và quy định pháp luật. Phiên bản mới nhất luôn được công
              bố tại trang này.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
