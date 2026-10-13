import { useState } from "react";
import { wedding } from "./data/wedding";
import { Countdown } from "./components/Countdown";
import { RsvpForm } from "./components/RsvpForm";
import { Guestbook } from "./components/Guestbook";
import { Modal } from "./components/Modal";
import { downloadCalendar } from "./lib/calendar";
import { FloatingPetals } from "./components/FloatingPetals";
import { ArrowIcon } from "./components/ArrowIcon";
import { PhotoSlider } from "./components/PhotoSlider";
import { WeddingCover } from "./components/WeddingCover";
import { ToastIcon } from "./components/ToastIcon";
import { HangingLanterns } from "./components/HangingLanterns";
import { PaperFan } from "./components/PaperFan";
import { InvitationLetter } from "./components/InvitationLetter";

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export default function App() {
  const names = `${wedding.groom.name} & ${wedding.bride.name}`;
  const [opened, setOpened] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  function openInvitation() {
    setOpened(true);
    document
      .getElementById("invitation")
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }
  return (
    <>
      <FloatingPetals />
      <InvitationLetter />
      <a className="skip-link" href="#main">
        Đến nội dung chính
      </a>
      <header className="header">
        <a
          className="monogram"
          href="#home"
          aria-label={`${names} — đầu trang`}
        >
          {wedding.groom.name[0].toLowerCase()}
          <span>&</span>
          {wedding.bride.name[0].toLowerCase()}

        </a>
        <button
          className="menu-toggle icon-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="navigation"
          aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
        >
          {menuOpen ? "×" : "☰"}
        </button>
        <nav
          id="navigation"
          className={menuOpen ? "navigation is-open" : "navigation"}
          aria-label="Điều hướng chính"
          onClick={() => setMenuOpen(false)}
        >
          <a href="#story">Chuyện chúng mình</a>
          <a href="#album">Khoảnh khắc</a>
          <a href="#celebration">Ngày chung đôi</a>
          <a href="#wishes">Lời chúc</a>
        </nav>
      </header>
      <main id="main">
        <WeddingCover opened={opened} onOpen={openInvitation} />

        <section id="invitation" className="invitation-section section">
          <PaperFan className="section-fan section-fan-right" />
          <HangingLanterns />
          <span className="eyebrow">TRÂN TRỌNG KÍNH MỜI</span>
          <h2>
            Bạn là một phần
            <br />
            của ngày hạnh phúc ấy.
          </h2>
          <p>{wedding.invitation}</p>
          <div className="invitation-signature">
            {wedding.groom.name}{" "}
            <span className="invitation-ampersand">&</span>{" "}
            {wedding.bride.name}
          </div>
          <div className="invitation-summary">
            <span>{wedding.dateLabel}</span>
            <span className="summary-dot">·</span>
            <span>{wedding.venue}</span>
          </div>
          <a href="#rsvp" className="text-link">
            Hẹn gặp bạn ở đó <ArrowIcon />
          </a>
        </section>

        <section className="families section container">
          <HangingLanterns side="left" />
          <SectionTitle
            eyebrow="HAI GIA ĐÌNH, MỘT NIỀM VUI"
            title="Trân trọng báo tin lễ vu quy"
          />
          <div className="family-grid">
            <article>
              <span className="eyebrow">NHÀ TRAI</span>
              <p>
                Ông {wedding.groom.father}
                <br />
                Bà {wedding.groom.mother}
              </p>
              <h3>{wedding.groom.fullName}</h3>
              <span className="muted">{wedding.groom.role}</span>
              <div className="family-portrait">
                <img
                  src={wedding.groom.portrait.src}
                  alt={`Chú rể ${wedding.groom.fullName}`}
                  loading="lazy"
                  style={{
                    objectPosition: wedding.groom.portrait.position,
                    transformOrigin: wedding.groom.portrait.position,
                    transform: `scale(${wedding.groom.portrait.scale})`,
                  }}
                />
              </div>
            </article>
            <span className="family-ampersand" aria-hidden="true">
              &
            </span>
            <article>
              <span className="eyebrow">NHÀ GÁI</span>
              <p>
                Ông {wedding.bride.father}
                <br />
                Bà {wedding.bride.mother}
              </p>
              <h3>{wedding.bride.fullName}</h3>
              <span className="muted">{wedding.bride.role}</span>
              <div className="family-portrait">
                <img
                  src={wedding.bride.portrait.src}
                  alt={`Cô dâu ${wedding.bride.fullName}`}
                  loading="lazy"
                  style={{
                    objectPosition: wedding.bride.portrait.position,
                    transformOrigin: wedding.bride.portrait.position,
                    transform: `scale(${wedding.bride.portrait.scale})`,
                  }}
                />
              </div>
            </article>
          </div>
          <p className="family-footer">
            Lễ vu quy được cử hành lúc {wedding.events[0].time} ·{" "}
            {wedding.dateLabel2}
            <br />
            {wedding.events[0].location}
          </p>
        </section>

        <section id="story" className="story-section section">
          <PaperFan className="section-fan section-fan-left" />
          <HangingLanterns />
          <div className="container">
            <SectionTitle
              eyebrow="OUR LITTLE LOVE STORY"
              title="Từ một người lạ, thành cả thế giới"
              description="Có những điều đẹp đẽ bắt đầu từ những điều rất giản đơn."
            />
            <div className="story-grid">
              {wedding.story.map((item, index) => (
                <article className="story-card" key={item.year}>
                  <span className="story-number">0{index + 1}</span>

                  <span className="story-year">{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="album" className="album-section section container">
          <PaperFan className="section-fan section-fan-left" />
          <HangingLanterns />
          <div className="album-heading">
            <SectionTitle
              eyebrow="NHỮNG NGÀY CÓ NHAU"
              title="Một chút chúng mình"
              description="Những khoảnh khắc nhỏ. Những kỷ niệm thật to."
            />
            <span className="album-note">made with love ♡</span>
          </div>
          <PhotoSlider photos={wedding.photos} />
          <p className="album-help">
            Vuốt hoặc kéo ngang để xem những khoảnh khắc của chúng mình.
          </p>
        </section>

        <section id="celebration" className="celebration-section section">
          <PaperFan className="section-fan section-fan-right" />
          <HangingLanterns side="left" />
          <div className="container">
            <SectionTitle
              eyebrow="SAVE OUR DATE"
              title="Hẹn bạn ở ngày chung đôi"
              description="Đánh dấu một ngày thật đặc biệt trong lịch của bạn nhé."
            />
            <Countdown date={wedding.date} />
            <div className="events-grid">
              {wedding.events.map((event) => (
                <article className="event-card" key={event.id}>
                  <span className="event-symbol" aria-hidden="true">
                    {event.id === "ceremony" ? "♡" : <ToastIcon />}
                  </span>
                  <h3>{event.name}</h3>
                  <p className="event-time">{event.time}</p>
                  <span className="event-date">{event.id === "reception" ? wedding.dateLabel : wedding.dateLabel2}</span>
                  <div className="event-rule" />
                  <h4>{event.location}</h4>
                  <p>{event.address}</p>
                  {event.id === "reception" && (
                    <a
                      className="text-link"
                      href={wedding.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Xem chỉ đường <ArrowIcon direction="up-right" />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="details-section section container">
          <div className="schedule">
            <SectionTitle
              eyebrow="TỪ LÚC GẶP NHAU ĐẾN LÚC TẠM BIỆT"
              title="Một buổi trưa thật vui"
            />
            <ol className="timeline">
              {wedding.timeline.map((item) => (
                <li key={item.time}>
                  <time>{item.time}</time>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <aside className="dress-code">

            <span className="eyebrow">DRESS CODE</span>
            <h3>Mặc đẹp theo cách của bạn</h3>
            <p>
              Nếu có thể, hãy chọn một chút sắc màu dưới đây để khu vườn của
              chúng mình thêm xinh nhé.
            </p>
            <div className="color-swatches">
              {wedding.dressCode.map((color) => (
                <div key={color.name}>
                  <span style={{ background: color.color }} />
                  <small>{color.name}</small>
                </div>
              ))}
            </div>
            <p className="dress-note">Và đừng quên mang theo nụ cười!</p>
          </aside>
        </section>

        {/* <section id="rsvp" className="rsvp-section section">
          <div className="container rsvp-grid">
            <div className="rsvp-copy">
              <span className="eyebrow">MỘT CHIẾC HẸN VỚI BẠN</span>
              <h2>
                Ngày vui sẽ đẹp hơn
                <br />
                khi có bạn.
              </h2>
              <p>
                Cho chúng mình biết bạn có thể đến nhé, để chúng mình chuẩn bị
                đón bạn thật chu đáo.
              </p>
              <p className="rsvp-deadline">
                Vui lòng phản hồi trước <strong>{wedding.rsvpDeadline}</strong>
              </p>
              <Botanical />
            </div>
            <RsvpForm />
          </div>
        </section> */}

        <section id="wishes" className="wishes-section section container">
          <PaperFan className="section-fan section-fan-left" />
          <HangingLanterns />
          <SectionTitle
            eyebrow="GỬI GẮM YÊU THƯƠNG"
            title="Những lời chúc ở lại"
            description="Một lời chúc từ bạn, một kỷ niệm chúng mình sẽ giữ mãi."
          />
          <Guestbook />
        </section>

        <section className="gift-section container">
          <div>
            <span className="eyebrow">MỘT CHÚT YÊU THƯƠNG</span>
            <h3>Điều quý nhất là có bạn ở đây.</h3>
            <p>
              Nếu bạn muốn gửi thêm một món quà nhỏ, chúng mình xin trân trọng
              đón nhận.
            </p>
          </div>
          <button
            className="button secondary"
            onClick={() => setGiftOpen(true)}
          >
            Hộp quà mừng <span aria-hidden="true">♡</span>
          </button>
        </section>
        <footer className="footer">
          <PaperFan className="section-fan section-fan-right" />
          <HangingLanterns side="left" />

          <span className="eyebrow">WITH ALL OUR LOVE</span>
          <h2>Cảm ơn vì đã thương chúng mình.</h2>
          <p>Hẹn gặp bạn trong ngày thật đẹp ấy.</p>
          <div className="footer-names">{names}</div>
          <span className="footer-date">{wedding.dateShort}</span>
          <div className="footer-bottom">
            <span>Một ngày vui. Một đời bên nhau.</span>
            <a href="#home">Về đầu trang <ArrowIcon direction="up" /></a>
          </div>
        </footer>
      </main>
      {giftOpen && (
        <Modal
          title="Hộp quà mừng"
          onClose={() => {
            setGiftOpen(false);
            setCopyStatus("");
          }}
        >

          <h2>Hộp quà mừng</h2>
          {wedding.gifts.length ? (
            wedding.gifts.map((gift) => (
              <article className="gift-account" key={gift.account}>
                <h3>{gift.owner}</h3>
                <img src={gift.qr} alt={`Mã QR quà mừng của ${gift.owner}`} />
                <p>
                  {gift.bank} · {gift.account}
                </p>
                <button
                  className="button secondary"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(gift.account);
                      setCopyStatus("Đã sao chép số tài khoản.");
                    } catch {
                      setCopyStatus(
                        "Bạn có thể sao chép trực tiếp số tài khoản phía trên.",
                      );
                    }
                  }}
                >
                  Sao chép tài khoản
                </button>
              </article>
            ))
          ) : (
            <p>
              Thông tin quà mừng sẽ được cập nhật khi thiệp chính thức sẵn sàng.
              Cảm ơn bạn đã gửi yêu thương ♡
            </p>
          )}
          <p role="status">{copyStatus}</p>
        </Modal>
      )}
    </>
  );
}
