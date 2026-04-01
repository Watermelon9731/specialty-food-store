export const PATH = {
  HOME: "/",
  PRODUCTS: {
    ALL: "/san-pham",
    DETAIL: (slug: string) => `/san-pham/${slug}`,
    CATEGORY: (category: string) => `/san-pham?category=${category}`,
  },
  CATEGORIES: "/danh-muc",
  ABOUT: "/gioi-thieu",
  CONTACT: "/lien-he",
  TERMS: "/dieu-khoan",
  PRIVACY: "/chinh-sach-bao-mat",
  PRODUCTS_SEAFOOD: "/san-pham?category=muc-kho-muc-mot-nang",
  PRODUCTS_MEAT: "/san-pham?category=nem-cha-binh-dinh",
  PRODUCTS_NEM_CHA: "/san-pham?category=cha-ram-binh-dinh",
  PRODUCTS_SPICES: "/san-pham?category=tre-binh-dinh",
  TRE: "/tre-binh-dinh",
  BLOG: {
    ALL: "/tin-tuc",
    DETAIL: (slug: string) => `/tin-tuc/${slug}`,
  },
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
  ADDRESS: "TP. Quy Nhơn, Bình Định",
  FACEBOOK: "https://www.facebook.com/profile.php?id=61587786952919",
  FACEBOOK_MESSENGER: "https://m.me/61587786952919",
  ZALO: process.env.NEXT_PUBLIC_ZALO_URL || "https://zalo.me/0939062018",
};
