import { ArrowIcon } from "./ArrowIcon";
import { Flower } from "./Botanical";

export function OpenInvitationButton({
  opened,
  onClick,
}: {
  opened: boolean;
  onClick: () => void;
}) {
  return (
    <div className="invitation-button-wrap">
      <button
        className={`button open-invitation ${opened ? "opened" : ""}`}
        onClick={onClick}
        type="button"
      >
        <span className="invitation-envelope" aria-hidden="true">
          <svg viewBox="0 0 56 48" fill="none" focusable="false">
            <path d="M6 14 28 3l22 11v26H6Z" fill="#f4d8ca" stroke="#bd9c87" strokeWidth="1.3" strokeLinejoin="round" />
            <rect x="6" y="14" width="44" height="27" rx="4" fill="#fff8e7" stroke="#bd9c87" strokeWidth="1.3" />
            <path d="m7 39 17-14m25 14L32 25" stroke="#ddc6ac" strokeWidth="1.3" />
            <path className="envelope-flap" d="m7 15 21 16 21-16" fill="#f9e8d5" stroke="#bd9c87" strokeWidth="1.3" strokeLinejoin="round" />
            <circle cx="28" cy="29" r="7" fill="#dfaba9" />
            <path d="M28 33s-5-2.8-5-5.3c0-2.3 3.1-3 5-.8 1.9-2.2 5-1.5 5 .8C33 30.2 28 33 28 33Z" fill="#fff8ef" />
          </svg>
        </span>
        <span className="invitation-button-copy">
          <span className="invitation-button-label">{opened ? "Xem lời mời" : "Mở thiệp của chúng mình"}</span>
          <span className="invitation-button-caption">Gửi bạn một chút yêu thương</span>
        </span>
        <ArrowIcon />
      </button>
      <svg className="invitation-button-ribbon" viewBox="0 0 60 40" fill="none" aria-hidden="true" focusable="false">
        <path d="M29 18C11 18 3 6 11 4c8-3 18 8 18 14ZM31 18C49 18 57 6 49 4c-8-3-18 8-18 14Z" fill="#edc5cc" stroke="#c8909d" strokeWidth="1.2" />
        <path d="m28 19-11 16 8-3 3 5 3-18m1 0 11 16-8-3-3 5-3-18" fill="#edc5cc" stroke="#c8909d" strokeWidth="1.2" strokeLinejoin="round" />
        <ellipse cx="30" cy="18" rx="5" ry="4" fill="#e4afba" stroke="#c8909d" strokeWidth="1.2" />
      </svg>
      <Flower className="invitation-button-flower" />
    </div>
  );
}
