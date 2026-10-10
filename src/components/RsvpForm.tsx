import { useState, type FormEvent } from "react";
import { saveRsvp } from "../lib/storage";

export function RsvpForm() {
  const [attendance, setAttendance] = useState("yes");
  const [status, setStatus] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    if (!name) {
      setStatus("Bạn điền tên trước khi gửi nhé.");
      return;
    }
    try {
      saveRsvp({
        name,
        attendance,
        guests: attendance === "yes" ? Number(data.get("guests")) : 0,
        event: String(data.get("event") ?? ""),
        note: String(data.get("note") ?? "").trim(),
        createdAt: new Date().toISOString(),
      });
      setStatus(
        "Đã lưu phản hồi mẫu trên thiết bị này. Phản hồi chưa được gửi đến cô dâu, chú rể.",
      );
      form.reset();
      setAttendance("yes");
    } catch {
      setStatus(
        "Trình duyệt chưa cho phép lưu. Bạn thử lại khi bật quyền lưu dữ liệu nhé.",
      );
    }
  }
  return (
    <form className="rsvp-form" onSubmit={submit}>
      <label>
        Tên của bạn <span>*</span>
        <input
          name="name"
          autoComplete="name"
          placeholder="Để chúng mình biết bạn là ai nhé"
          required
          maxLength={100}
        />
      </label>
      <fieldset>
        <legend>Bạn sẽ đến chung vui chứ?</legend>
        <div className="attendance-options">
          <label className={attendance === "yes" ? "selected" : ""}>
            <input
              type="radio"
              name="attendance"
              value="yes"
              checked={attendance === "yes"}
              onChange={() => setAttendance("yes")}
            />
            Có, mình sẽ đến ♡
          </label>
          <label className={attendance === "no" ? "selected" : ""}>
            <input
              type="radio"
              name="attendance"
              value="no"
              checked={attendance === "no"}
              onChange={() => setAttendance("no")}
            />
            Tiếc quá, mình bận rồi
          </label>
        </div>
      </fieldset>
      {attendance === "yes" && (
        <div className="form-row">
          <label>
            Số người tham dự
            <select name="guests" defaultValue="1">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} người
                </option>
              ))}
            </select>
          </label>
          <label>
            Bạn tham dự
            <select name="event" defaultValue="reception">
              <option value="reception">Tiệc chung vui</option>
              <option value="ceremony">Lễ thành hôn</option>
              <option value="both">Cả lễ và tiệc</option>
            </select>
          </label>
        </div>
      )}
      <label>
        Nhắn thêm cho chúng mình
        <textarea
          name="note"
          placeholder="Ví dụ: mình ăn chay, mình đi cùng bé nhỏ…"
          rows={3}
          maxLength={1000}
        />
      </label>
      <button className="button primary" type="submit">
        Gửi phản hồi <span aria-hidden="true">↗</span>
      </button>
      <p className="form-note">
        Bản mẫu: phản hồi chỉ được lưu trên trình duyệt của bạn.
      </p>
      <p className="form-status" role="status">
        {status}
      </p>
    </form>
  );
}
