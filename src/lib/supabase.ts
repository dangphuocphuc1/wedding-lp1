export const supabaseConfig = {
  projectUrl: (import.meta.env.VITE_SUPABASE_URL ?? "").trim().replace(/\/$/, ""),
  publicKey: (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "").trim(),
};
