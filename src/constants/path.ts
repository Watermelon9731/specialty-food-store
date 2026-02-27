export const PATH = {
  HOME: "/",
  PRODUCTS: {
    ALL: "/san-pham",
    DETAIL: (slug: string) => `/san-pham/${slug}`,
  },
  CATEGORIES: "/danh-muc",
  ABOUT: "/gioi-thieu",
  CONTACT: "/lien-he",
  TERMS: "/dieu-khoan",
  PRIVACY: "/chinh-sach-bao-mat",
  PRODUCTS_SEAFOOD: "/san-pham?category=hai-san-kho",
  PRODUCTS_MEAT: "/san-pham?category=thit-gac-bep",
  PRODUCTS_NEM_CHA: "/san-pham?category=nem-cha-dac-san",
  PRODUCTS_SPICES: "/san-pham?category=gia-vi-truyen-thong",
  TRE: "/tre-binh-dinh",
  ADMIN: {
    LOGIN: "/admin/login",
    DASHBOARD: "/admin",
    ORDERS: "/admin/orders",
    INVENTORY: "/admin/inventory",
    CUSTOMERS: "/admin/customers",
    ANALYTICS: "/admin/analytics",
    SETTINGS: "/admin/settings",
  },
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
  },
};

export const CONTACT_INFO = {
  PHONE_CODE: "+84",
  PHONE: process.env.NEXT_PUBLIC_PHONE_NUMBER || "939062018",
  EMAIL: process.env.NEXT_PUBLIC_EMAIL || "lienhe@trebinhdinh.com",
  ADDRESS: "Thành phố Quy Nhơn, Tỉnh Bình Định | Phường Quy Nhơn, Tỉnh Gia Lai",
  FACEBOOK: "https://www.facebook.com/profile.php?id=61587786952919",
  FACEBOOK_MESSENGER: "https://m.me/61587786952919",
  ZALO: process.env.NEXT_PUBLIC_ZALO_URL || "https://zalo.me/0939062018",
};
