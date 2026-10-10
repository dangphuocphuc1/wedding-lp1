import { wedding } from "../data/wedding";

export function downloadCalendar() {
  const stamp = (date: Date) =>
    date
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  const escape = (value: string) =>
    value
      .replace(/\\/g, "\\\\")
      .replace(/\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");
  const start = new Date(wedding.date);
  const contents = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Garden Wedding//VI",
    "BEGIN:VEVENT",
    "UID:garden-wedding-" + start.getTime() + "@invitation.local",
    "DTSTAMP:" + stamp(new Date()),
    "DTSTART:" + stamp(start),
    "DTEND:" + stamp(new Date(start.getTime() + 3.5 * 60 * 60 * 1000)),
    "SUMMARY:" +
      escape(`Đám cưới ${wedding.groom.name} & ${wedding.bride.name}`),
    "LOCATION:" + escape(`${wedding.venue}, ${wedding.address}`),
    "DESCRIPTION:" + escape("Cùng chúng mình chia sẻ ngày vui!"),
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
  const url = URL.createObjectURL(
    new Blob([contents], { type: "text/calendar;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "ngay-minh-chung-doi.ics";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
