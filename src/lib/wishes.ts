import { readLocal, saveWish, type Wish } from "./storage";

const projectUrl = (import.meta.env.VITE_SUPABASE_URL ?? "").trim().replace(/\/$/, "");
const publicKey = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "").trim();
export const sharedWishesEnabled = Boolean(projectUrl && publicKey);

async function request(path: string, options: RequestInit = {}) {
  if (publicKey.startsWith("sb_secret_")) {
    throw new Error("Cấu hình cần publishable key, không phải secret key.");
  }
  const headers: Record<string, string> = {
    apikey: publicKey,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };
  // Anon JWT cũ cần Authorization; publishable key mới chỉ dùng header apikey.
  if (publicKey.startsWith("eyJ")) headers.Authorization = `Bearer ${publicKey}`;
  const response = await fetch(`${projectUrl}/rest/v1/wishes${path}`, {
    ...options,
    headers,
  });
  if (!response.ok) throw new Error("Chưa thể kết nối sổ lời chúc.");
  return response.json() as Promise<Wish[]>;
}

export async function loadWishes(signal?: AbortSignal): Promise<Wish[]> {
  if (!sharedWishesEnabled) return readLocal<Wish[]>("garden-wedding:wishes", []);
  const wishes = await request("?select=id,name,message&order=created_at.desc,id.desc&limit=200", { signal });
  return wishes.reverse();
}

export async function sendWish(name: string, message: string): Promise<Wish> {
  if (sharedWishesEnabled) {
    const [wish] = await request("", {
      method: "POST",
      body: JSON.stringify({ name, message }),
    });
    if (!wish) throw new Error("Chưa nhận được xác nhận lưu lời chúc.");
    return wish;
  }
  const wish = {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name,
    message,
  };
  saveWish(wish);
  return wish;
}
