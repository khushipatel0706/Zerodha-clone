const isProd = process.env.NODE_ENV === "production";

export const API_URL = isProd ? "" : "http://localhost:3002";
export const FRONTEND_URL = isProd ? "" : "http://localhost:3000";
export const DASHBOARD_URL = isProd ? "/dashboard" : "http://localhost:3001";