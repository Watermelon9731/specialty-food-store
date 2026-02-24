"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Fish, Phone, Mail, MapPin, CheckCircle2, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Simulate network
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      {/* ── Hero ── */}
      <div className="bg-[#1a3d2b] text-white py-16 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Fish className="w-4 h-4" />
            Liên hệ
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hỏi — đáp tận tâm
          </h1>
          <p className="text-emerald-200/80 text-lg max-w-xl">
            Chúng tôi luôn sẵn sàng tư vấn, giải đáp mọi thắc mắc về sản phẩm và
            đơn hàng của bạn.
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-16 grid lg:grid-cols-2 gap-16 items-start">
        {/* Left — info */}
        <div className="space-y-10">
          <div>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 rounded-full px-4 py-1.5 mb-4">
              Thông tin liên hệ
            </Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
              Chúng tôi ở đây
              <br />
              để giúp bạn.
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Đừng ngại liên hệ nếu bạn cần tư vấn chọn sản phẩm, muốn đặt số
              lượng lớn, hoặc chỉ đơn giản là muốn hỏi thêm về nguồn gốc từng
              thứ chúng tôi làm.
            </p>
          </div>

          {/* Contact cards */}
          <div className="space-y-4">
            {[
              {
                icon: <Phone className="w-5 h-5" />,
                label: "Điện thoại / Zalo",
                value: "0901 234 567",
                href: "tel:+84901234567",
              },
              {
                icon: <Mail className="w-5 h-5" />,
                label: "Email",
                value: "tiemdokho@gmail.com",
                href: "mailto:tiemdokho@gmail.com",
              },
              {
                icon: <MapPin className="w-5 h-5" />,
                label: "Địa chỉ",
                value: "Chợ Huyện, Phù Cát, Bình Định, Việt Nam",
                href: "https://maps.google.com",
              },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-2xl hover:border-emerald-200 hover:shadow-md transition-all duration-200 group"
              >
                <div className="h-11 w-11 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-[#3a7851] shrink-0 group-hover:bg-[#1a3d2b] group-hover:text-white group-hover:border-transparent transition-all duration-200">
                  {c.icon}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                    {c.label}
                  </p>
                  <p className="text-slate-800 font-semibold">{c.value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Hours */}
          <div className="bg-[#1a3d2b] text-white rounded-2xl p-6 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">
              Giờ nhận đơn
            </p>
            {[
              { day: "Thứ 2 — Thứ 6", time: "7:00 — 21:00" },
              { day: "Thứ 7 — Chủ nhật", time: "8:00 — 18:00" },
              { day: "Ngày lễ Tết", time: "Liên hệ trước" },
            ].map((h) => (
              <div
                key={h.day}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-emerald-100/80">{h.day}</span>
                <span className="font-semibold text-white">{h.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
          {sent ? (
            <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
              <CheckCircle2 className="w-16 h-16 text-[#3a7851]" />
              <h3 className="text-2xl font-bold text-slate-900">
                Đã nhận được!
              </h3>
              <p className="text-slate-500 max-w-xs leading-relaxed">
                Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 24 giờ.
              </p>
              <Button
                onClick={() => setSent(false)}
                variant="outline"
                className="mt-4 rounded-full border-[#3a7851] text-[#3a7851] hover:bg-[#3a7851] hover:text-white"
              >
                Gửi tin nhắn khác
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">
                  Gửi tin nhắn
                </h3>
                <p className="text-slate-500 text-sm">
                  Điền vào form bên dưới, chúng tôi sẽ liên hệ sớm nhất có thể.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Họ và tên</Label>
                  <Input
                    id="name"
                    required
                    placeholder="Nguyễn Văn A"
                    className="rounded-xl border-slate-200 focus-visible:ring-[#3a7851]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="0901 234 567"
                    className="rounded-xl border-slate-200 focus-visible:ring-[#3a7851]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="ban@gmail.com"
                  className="rounded-xl border-slate-200 focus-visible:ring-[#3a7851]"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="subject">Chủ đề</Label>
                <Input
                  id="subject"
                  placeholder="Hỏi về sản phẩm / Đặt số lượng lớn..."
                  className="rounded-xl border-slate-200 focus-visible:ring-[#3a7851]"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">Nội dung</Label>
                <Textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Mình muốn hỏi về..."
                  className="rounded-xl border-slate-200 focus-visible:ring-[#3a7851] resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-full bg-[#1a3d2b] hover:bg-[#3a7851] text-white font-semibold text-base transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  "Gửi tin nhắn →"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
