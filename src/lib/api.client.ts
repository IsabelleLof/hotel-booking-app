// src/lib/api.client.ts
// Måste testa om detta funkar?

import type { Hotel } from "@/types/hotels";

type SearchHotelsArgs = {
  q: string;
  checkIn?: string;   // ISO eller YYYY-MM-DD (din API route normaliserar)
  checkOut?: string;  // ISO eller YYYY-MM-DD
  adults?: number;    // default 2
};

export async function searchHotelsClient({
  q,
  checkIn,
  checkOut,
  adults = 2,
}: SearchHotelsArgs): Promise<Hotel[]> {
  const params = new URLSearchParams();
  params.set("q", q);
  params.set("adults", String(adults));

  // ✅ matcha din API route: checkIn/checkOut (inte checkInDate/checkOutDate)
  if (checkIn) params.set("checkIn", checkIn);
  if (checkOut) params.set("checkOut", checkOut);

  const res = await fetch(`/api/hotels/search?${params.toString()}`, {
    method: "GET",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Failed to fetch hotels");
  }

  return res.json();
}

type GetHotelByIdArgs = {
  id: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
};

export async function getHotelByIdClient({
  id,
  checkIn,
  checkOut,
  adults = 2,
}: GetHotelByIdArgs): Promise<Hotel | undefined> {
  const params = new URLSearchParams();
  params.set("adults", String(adults));
  if (checkIn) params.set("checkIn", checkIn);
  if (checkOut) params.set("checkOut", checkOut);

  const qs = params.toString();
  const url = `/api/hotels/${encodeURIComponent(id)}${qs ? `?${qs}` : ""}`;

  const res = await fetch(url, { method: "GET" });

  if (!res.ok) {
    if (res.status === 404) return undefined;
    const text = await res.text().catch(() => "");
    throw new Error(text || "Failed to fetch hotel");
  }

  return res.json();
}
