import { useEffect, useState } from "react";
import { wedding } from "../data/wedding";
import { getInviteCode, loadInvitee } from "../lib/invitation";
import { supabaseConfig } from "../lib/supabase";
import { Modal } from "./Modal";

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 32 24" fill="none" aria-hidden="true" focusable="false">
      <rect x="1" y="1" width="30" height="22" rx="2" />
      <path d="m2 2 14 11L30 2M2 22l10-9m18 9-10-9" />
    </svg>
  );
}

export function InvitationLetter() {
  const [code, setCode] = useState(() => getInviteCode(window.location.search));
  const [recipient, setRecipient] = useState<string | null>(null);
  const [loading, setLoading] = useState(Boolean(code));
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const updateRecipient = () => {
      setCode(getInviteCode(window.location.search));
    };
    window.addEventListener("popstate", updateRecipient);
    return () => window.removeEventListener("popstate", updateRecipient);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setRecipient(null);
    setError("");
    setLoading(Boolean(code));
    setOpen(true);
    if (!code) return () => controller.abort();
    void loadInvitee(code, supabaseConfig, controller.signal)
      .then(name => {
        if (!controller.signal.aborted) setRecipient(name);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError("Chưa tải được thư mời. Bạn thử lại nhé.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [code, retry]);

  if (!code || (!loading && !recipient && !error)) return null;

  return (
    <>
      <button
        type="button"
        className="invitation-mailbox"
        onClick={() => setOpen(true)}
        aria-label={recipient ? `Mở thư mời dành cho ${recipient}` : "Mở thư mời"}
        aria-haspopup="dialog"
      >
        <EnvelopeIcon />
        <span>Thư mời</span>
      </button>
      {open && (
        <Modal title={recipient ? `Thư mời dành cho ${recipient}` : "Thư mời"} className="invitation-letter" onClose={() => setOpen(false)}>
          {loading ? (
            <p role="status">Đang mở thư mời dành cho bạn…</p>
          ) : error ? (
            <>
              <p role="alert">{error}</p>
              <button type="button" className="button primary" onClick={() => setRetry(value => value + 1)}>Thử lại</button>
            </>
          ) : <>
          <div className="letter-seal" aria-hidden="true">♡</div>
          <p className="letter-salutation">Trân trọng kính mời</p>
          <h2 className="letter-recipient">{recipient}</h2>
          <div className="letter-divider" aria-hidden="true"><span>❦</span></div>
          <p className="letter-message">
            Đến tham dự tiệc cưới và cùng chúng mình chia sẻ niềm hạnh phúc
            trong ngày chung đôi.
          </p>
          <div className="letter-event">
            <strong>{wedding.events[1].time} · {wedding.dateLabel}</strong>
            <span>{wedding.venue}</span>
            <span>{wedding.address}</span>
          </div>
          <p className="letter-thanks">
            Cảm ơn {recipient} đã dành thời gian tham dự và chung vui cùng chúng mình.
            Sự hiện diện của {recipient} là món quà quý giá, giúp ngày hạnh phúc
            này thêm trọn vẹn.
          </p>
          <p className="letter-signoff">Thương mến,</p>
          <p className="letter-signature">{wedding.groom.invitationName} &amp; {wedding.bride.invitationName}</p>
          <button type="button" className="button primary letter-continue" onClick={() => setOpen(false)}>
            Xem thiệp cưới
          </button>
          </>}
        </Modal>
      )}
    </>
  );
}
