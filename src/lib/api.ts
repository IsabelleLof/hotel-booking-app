export async function searchHotels(q: string, checkIn?: string, checkOut?: string) {
  const params = new URLSearchParams({ q });
  if (checkIn) params.set("checkIn", checkIn);
  if (checkOut) params.set("checkOut", checkOut);
  params.set("adults", "2");

  const res = await fetch(`/api/hotels/search?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch hotels");
  return res.json();
}

// Behåll gärna denna om du någon gång vill hämta hotell från en CLIENT component.
// (Server-sidan använder api.server.ts)
export async function getHotelById(id: string) {
  const res = await fetch(`/api/hotels/${id}?adults=2`);
  if (!res.ok) throw new Error("Failed to fetch hotel");
  return res.json();
}

