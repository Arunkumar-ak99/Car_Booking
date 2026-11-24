export const API_URL = "http://localhost:3500";

export async function getCars() {
  const response = await fetch(`${API_URL}/cars`);
  if (!response.ok) throw new Error("Could not load cars.");
  return response.json();
}

export async function getBookings() {
  const response = await fetch(`${API_URL}/bookings`);
  if (!response.ok) throw new Error("Could not load bookings.");
  return response.json();
}

export async function createBooking(booking) {
  const response = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking)
  });
  if (!response.ok) throw new Error("Booking could not be saved.");
  return response.json();
}

export async function cancelBooking(id) {
  const response = await fetch(`${API_URL}/bookings/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "Cancelled" })
  });
  if (!response.ok) throw new Error("Could not cancel booking.");
  return response.json();
}
