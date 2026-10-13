export function getInviteCode(search: string): string | null {
  const code = new URLSearchParams(search).get("invite")?.trim().toLowerCase();
  return code && /^[a-z0-9][a-z0-9_-]{0,63}$/.test(code) ? code : null;
}

export async function loadInvitee(
  code: string,
  config: { projectUrl: string; publicKey: string },
  signal?: AbortSignal,
): Promise<string | null> {
  const { projectUrl, publicKey } = config;
  if (!projectUrl || !publicKey) throw new Error("Chưa cấu hình kết nối thư mời.");
  if (publicKey.startsWith("sb_secret_")) throw new Error("Cấu hình cần publishable key.");
  const headers: Record<string, string> = { apikey: publicKey, "Content-Type": "application/json" };
  if (publicKey.startsWith("eyJ")) headers.Authorization = `Bearer ${publicKey}`;
  const response = await fetch(`${projectUrl}/rest/v1/rpc/lookup_invitee`, {
    method: "POST",
    headers,
    body: JSON.stringify({ invite_code: code }),
    signal,
  });
  if (!response.ok) throw new Error("Chưa tải được thư mời. Vui lòng thử lại.");
  const name: unknown = await response.json();
  if (name === null) return null;
  if (typeof name !== "string" || !name.trim()) throw new Error("Thông tin thư mời chưa hợp lệ.");
  return name.trim();
}
