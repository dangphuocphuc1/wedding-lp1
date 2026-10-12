import { useEffect, useState, type FormEvent } from "react";
import { readLocal, type Wish } from "../lib/storage";
import { loadWishes, sendWish, sharedWishesEnabled } from "../lib/wishes";
import { ScrollingWishList } from "./ScrollingWishList";

export function Guestbook() {
  const [wishes, setWishes] = useState(() =>
    sharedWishesEnabled ? [] : readLocal<Wish[]>("garden-wedding:wishes", []),
  );
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [loading, setLoading] = useState(sharedWishesEnabled);

  useEffect(() => {
    if (!sharedWishesEnabled) return;
    const controller = new AbortController();
    let pending = false;
    async function refresh() {
      if (pending || document.hidden) return;
      pending = true;
      try {
        const next = await loadWishes(controller.signal);
        if (!controller.signal.aborted) {
          setWishes(next);
          setLoadError("");
        }
      } catch {
        if (!controller.signal.aborted) setLoadError("Chưa tải được lời chúc. Chúng mình sẽ tự thử lại.");
      } finally {
        pending = false;
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void refresh();
    const interval = window.setInterval(() => void refresh(), 30000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      controller.abort();
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !message) {
      setStatus("Bạn điền tên và lời chúc nhé.");
      return;
    }
    setSending(true);
    try {
      const wish = await sendWish(name, message);
      setWishes((previous) => [...previous.filter(item => item.id !== wish.id), wish]);
      form.reset();
      setStatus(sharedWishesEnabled ? "Đã gửi lời chúc. Cảm ơn bạn đã gửi yêu thương!" : "Đã lưu lời chúc mẫu trên thiết bị này.");
    } catch {
      setStatus("Chưa thể lưu lời chúc. Bạn thử lại nhé.");
    } finally {
      setSending(false);
    }
  }
  return (
    <div className="guestbook-grid">
      <form className="wish-form" onSubmit={submit}>
        <label>
          Tên của bạn
          <input
            name="name"
            placeholder="Người gửi yêu thương"
            required
            maxLength={100}
            autoComplete="name"
          />
        </label>
        <label>
          Lời chúc
          <textarea
            name="message"
            placeholder="Viết vài lời gửi đến chúng mình…"
            required
            rows={4}
            maxLength={1000}
          />
        </label>
        <button className="button primary" type="submit" disabled={sending}>
          {sending ? "Đang gửi lời chúc…" : "Gửi một chút yêu thương"} <span aria-hidden="true">♡</span>
        </button>
        <p className="form-note">
          {sharedWishesEnabled ? "Lời chúc của bạn sẽ hiển thị công khai trên thiệp." : "Lời chúc mẫu chỉ hiển thị trên trình duyệt này."}
        </p>
        <p className="form-status" role="status">
          {status}
        </p>
      </form>
      <div className="guestbook-messages">
      {loadError && <p className="form-status" role="status">{loadError}</p>}
      <ScrollingWishList>
        {wishes.length ? (
          [...wishes].reverse().map((wish) => (
            <article className="wish-card" key={wish.id}>
              <div className="wish-card-decoration" aria-hidden="true">
                <span className="quote-mark">“</span>

              </div>
              <p>{wish.message}</p>
              <div className="wish-author">
                <span className="wish-avatar" aria-hidden="true">
                  {wish.name.trim().charAt(0).toLocaleUpperCase("vi-VN")}
                </span>
                <span className="wish-author-name">{wish.name}</span>
              </div>
            </article>
          ))
        ) : (
          <div className="wish-empty">
            <span aria-hidden="true">♡</span>
            <h3>{loading ? "Đang tải những lời yêu thương…" : "Một góc nhỏ dành cho yêu thương"}</h3>
            <p>{loading || loadError ? "" : "Hãy là người đầu tiên để lại lời chúc cho chúng mình."}</p>
          </div>
        )}
      </ScrollingWishList>
      </div>
    </div>
  );
}
