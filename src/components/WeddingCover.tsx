import { wedding } from "../data/wedding";
import { ArrowIcon } from "./ArrowIcon";
import { PaperFan } from "./PaperFan";

export function WeddingCover({ opened, onOpen }: { opened: boolean; onOpen: () => void }) {
  const [day, month, year] = wedding.dateShort.split(".");
  return (
    <section id="home" className="wedding-cover" aria-label="Thiệp mời đám cưới">
      <div className="wedding-cover-paper">
        <svg className="cover-color-filters" width="0" height="0" aria-hidden="true" focusable="false">
          <defs>
            <filter id="cover-color-balance" colorInterpolationFilters="sRGB">
              <feColorMatrix type="matrix" values="
                0.97 0 0 0 0
                0 0.99 0 0 0
                0 0 1.10 0 0.025
                0 0 0 1 0
              " />
            </filter>
          </defs>
        </svg>
        <img className="cover-reference-art" src="/images/wedding-cover-botanical.png"
          alt="" aria-hidden="true" fetchPriority="high" decoding="async" />
        <div className="cover-desktop-decor" aria-hidden="true">
          <PaperFan className="cover-fan-upper" />
          <PaperFan className="cover-fan-lower" />
          <div className="cover-olive-panel" />
          <img className="cover-sticker cover-sticker-sage"
            src="/images/sticker-sage-lantern.png" alt=""
            loading="lazy" decoding="async" />
        </div>
        <div className="cover-invitation-note">
          <p>THƯƠNG<br />GỬI<br />THIỆP MỜI</p>
          <span>tham<br />dự<br />tiệc<br />cưới</span>
        </div>
        <h1 className="cover-couple-names">
          <span>{wedding.groom.invitationName}</span>
          <span className="cover-ampersand">&</span>
          <span>{wedding.bride.invitationName}</span>
        </h1>
        <time className="cover-wedding-date" dateTime={wedding.date} aria-label={wedding.dateLabel}>
          <span>{day}.{month}</span><span>{year}</span>
        </time>
        <button className="cover-open-button" type="button" onClick={onOpen}>
          <span>{opened ? "Xem lời mời" : "Chạm để mở thiệp"}</span>
          <ArrowIcon direction="down" />
        </button>
      </div>
    </section>
  );
}
