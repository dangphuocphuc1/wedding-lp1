import { useState, type FormEvent } from "react";
import { readLocal, saveWish, type Wish } from "../lib/storage";

export function Guestbook() {
  const [wishes, setWishes] = useState(() =>
    readLocal<Wish[]>("garden-wedding:wishes", []),
  );
  const [status, setStatus] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !message) {
      setStatus("Bạn điền tên và lời chúc nhé.");
      return;
    }
    try {
      const wish = { id: crypto.randomUUID(), name, message };
      saveWish(wish);
      setWishes((previous) => [...previous, wish]);
      form.reset();
      setStatus("Đã lưu lời chúc mẫu trên thiết bị này.");
    } catch {
      setStatus("Chưa thể lưu lời chúc. Bạn thử lại nhé.");
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
        <button className="button primary" type="submit">
          Gửi một chút yêu thương <span aria-hidden="true">♡</span>
        </button>
        <p className="form-note">
          Lời chúc mẫu chỉ hiển thị trên trình duyệt này.
        </p>
        <p className="form-status" role="status">
          {status}
        </p>
      </form>
      <div className="wish-list" aria-label="Những lời chúc">
        {wishes.length ? (
          [...wishes].reverse().map((wish) => (
            <article className="wish-card" key={wish.id}>
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <p>{wish.message}</p>
              <span>— {wish.name}</span>
            </article>
          ))
        ) : (
          <div className="wish-empty">
            <span aria-hidden="true">♡</span>
            <h3>Một góc nhỏ dành cho yêu thương</h3>
            <p>Hãy là người đầu tiên để lại lời chúc cho chúng mình.</p>
          </div>
        )}
      </div>
    </div>
  );
}
