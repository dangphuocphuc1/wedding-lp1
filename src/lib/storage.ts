export type Rsvp = {
  name: string;
  attendance: string;
  guests: number;
  event: string;
  note: string;
  createdAt: string;
};
export type Wish = { id: string; name: string; message: string };

// Xóa dữ liệu thử cũ một lần; giữ lại các phản hồi được nhập sau lần reset này.
export function clearTestDataOnce() {
  const resetKey = "garden-wedding:test-data-cleared-v1";
  try {
    if (localStorage.getItem(resetKey)) return;
    localStorage.removeItem("garden-wedding:rsvps");
    localStorage.removeItem("garden-wedding:wishes");
    localStorage.setItem(resetKey, "true");
  } catch {
    // Trang vẫn hoạt động khi trình duyệt không cho phép truy cập localStorage.
  }
}

export function readLocal<T>(key: string, fallback: T): T {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) ?? "null");
    if (value === null || (Array.isArray(fallback) && !Array.isArray(value)))
      return fallback;
    return value as T;
  } catch {
    return fallback;
  }
}

// Điểm tích hợp API sau này. Bản khung chỉ lưu tại trình duyệt hiện tại.
export function saveRsvp(value: Rsvp) {
  const entries = readLocal<Rsvp[]>("garden-wedding:rsvps", []);
  localStorage.setItem(
    "garden-wedding:rsvps",
    JSON.stringify([...entries, value]),
  );
}

export function saveWish(value: Wish) {
  const entries = readLocal<Wish[]>("garden-wedding:wishes", []);
  localStorage.setItem(
    "garden-wedding:wishes",
    JSON.stringify([...entries, value]),
  );
}
