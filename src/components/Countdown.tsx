import { useEffect, useState } from "react";

export function remainingTime(date: string, now = Date.now()) {
  const total = Math.max(0, new Date(date).getTime() - now);
  return {
    total,
    values: [
      Math.floor(total / 86400000),
      Math.floor(total / 3600000) % 24,
      Math.floor(total / 60000) % 60,
      Math.floor(total / 1000) % 60,
    ],
  };
}

export function Countdown({ date }: { date: string }) {
  const [remaining, setRemaining] = useState(() => remainingTime(date));
  useEffect(() => {
    const interval = window.setInterval(
      () => setRemaining(remainingTime(date)),
      1000,
    );
    return () => window.clearInterval(interval);
  }, [date]);
  if (!remaining.total)
    return (
      <p className="countdown-ended">
        Ngày vui đã đến. Cảm ơn bạn đã chung vui cùng chúng mình ♡
      </p>
    );
  return (
    <div className="countdown" aria-label="Thời gian đến ngày cưới">
      {remaining.values.map((value, i) => (
        <div key={i}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{["Ngày", "Giờ", "Phút", "Giây"][i]}</span>
        </div>
      ))}
    </div>
  );
}
