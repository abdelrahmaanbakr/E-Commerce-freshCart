const DEFAULT_API_BASE_URL = "https://ecommerce.routemisr.com/api/v1";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL;

export const APP_BASE_URL =
  import.meta.env.VITE_APP_BASE_URL?.trim() ||
  (typeof window !== "undefined" ? window.location.origin : "");
