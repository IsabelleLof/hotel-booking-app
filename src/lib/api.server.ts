import "server-only";
import { headers } from "next/headers";

async function getBaseUrl() {
  const h = await headers(); // ✅ Next 16.1
  const host = h.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  return `${protocol}://${host}`;
}

export async function getHotelByIdServer(id: string) {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/hotels/${id}?adults=2`, { cache: "no-store" });
  if (!res.ok) return undefined;
  return res.json();
}
