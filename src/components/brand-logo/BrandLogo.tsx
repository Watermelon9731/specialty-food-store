import { ChefHat } from "lucide-react";

export default function BrandLogo() {
  return (
    <div className="flex items-center gap-2.5 max-[375px]:gap-2 group shrink-0">
      <div className="bg-[#1a3d2b] group-hover:bg-[#3a7851] p-2 max-[375px]:p-1.5 rounded-xl text-white shadow-md transition-all duration-200 group-hover:scale-110">
        <ChefHat className="h-5 w-5 max-[375px]:h-4 max-[375px]:w-4" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-bold text-[17px] max-[375px]:text-[15px] tracking-tight text-slate-900 pb-1 max-[375px]:pb-0.5">
          Tré Bà Liên
        </span>
        <span className="text-[10px] text-[#3a7851] font-semibold tracking-[0.12em] uppercase hidden sm:block">
          Tré & Chả Nem Bình Định
        </span>
      </div>
    </div>
  );
}
