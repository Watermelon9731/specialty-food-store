"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Facebook, Mail } from "lucide-react";
import { CONTACT_INFO } from "@/constants/path";
import ZaloIcon from "../icons/ZaloIcon";

const CONTACT_CHANNELS = [
  {
    id: "zalo",
    label: "Zalo",
    href: CONTACT_INFO.ZALO,
    icon: <ZaloIcon />,
    bg: "bg-[#0068FF]",
    hoverBg: "hover:bg-[#0055d4]",
    shadow: "shadow-[#0068FF]/30",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: CONTACT_INFO.FACEBOOK,
    icon: <Facebook className="w-5 h-5" />,
    bg: "bg-[#1877F2]",
    hoverBg: "hover:bg-[#1466d8]",
    shadow: "shadow-[#1877F2]/30",
  },
  {
    id: "email",
    label: "Email",
    href: `mailto:${CONTACT_INFO.EMAIL}`,
    icon: <Mail className="w-5 h-5" />,
    bg: "bg-[#1a3d2b]",
    hoverBg: "hover:bg-[#3a7851]",
    shadow: "shadow-[#1a3d2b]/30",
  },
];

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      {/* Backdrop overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-998"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* FAB container */}
      <div
        ref={containerRef}
        className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 z-999 flex flex-col-reverse items-end gap-3"
      >
        {/* Main toggle button */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`relative h-14 w-14 sm:h-[60px] sm:w-[60px] rounded-full flex items-center justify-center text-white shadow-2xl transition-colors duration-300 ${
            isOpen
              ? "bg-slate-500 hover:bg-slate-700 shadow-slate-900/30"
              : "bg-[#3a7851] hover:bg-[#0055d4] shadow-[#0068FF]/40"
          }`}
          aria-label={isOpen ? "Đóng menu liên hệ" : "Mở menu liên hệ"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.span>
            )}
          </AnimatePresence>

          {/* Pulse ring when closed */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-[#0068FF] animate-ping opacity-20 pointer-events-none" />
          )}
        </motion.button>

        {/* Expandable contact buttons */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-end gap-2.5"
            >
              {CONTACT_CHANNELS.map((channel, idx) => (
                <motion.a
                  key={channel.id}
                  href={channel.href}
                  target={
                    channel.href.startsWith("mailto:") ? undefined : "_blank"
                  }
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8 }}
                  transition={{
                    delay: idx * 0.06,
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`flex items-center gap-3 group`}
                  onClick={() => setIsOpen(false)}
                >
                  {/* Label tooltip */}
                  <span className="bg-[#3a7851] text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap sm:block hidden">
                    {channel.label}
                  </span>
                  {/* Mobile label — always visible */}
                  <span className="bg-[#3a7851] text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-lg whitespace-nowrap sm:hidden block">
                    {channel.label}
                  </span>
                  {/* Icon button */}
                  <div
                    className={`h-12 w-12 sm:h-13 sm:w-13 rounded-full ${channel.bg} ${channel.hoverBg} text-white flex items-center justify-center shadow-xl ${channel.shadow} transition-all duration-200 hover:scale-110`}
                  >
                    {channel.icon}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
