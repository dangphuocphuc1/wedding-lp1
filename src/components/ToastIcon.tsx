export function ToastIcon() {
  return (
    <svg
      className="event-toast-icon"
      viewBox="0 0 32 32"
      width="32"
      height="32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <g transform="rotate(18 9 16)">
        <path d="M5 4h8l-1 9a3 3 0 0 1-6 0L5 4Z" />
        <path d="M6 10h6M9 16v10m-4 0h8" />
      </g>
      <g transform="translate(14 0)">
        <g transform="rotate(-18 9 16)">
          <path d="M5 4h8l-1 9a3 3 0 0 1-6 0L5 4Z" />
          <path d="M6 10h6M9 16v10m-4 0h8" />
        </g>
      </g>
      <path d="M16 1v2m-2 0-1-1m5 1 1-1" />
    </svg>
  );
}
