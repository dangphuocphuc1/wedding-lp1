const paths = {
  right: "M4 12h16m-6-6 6 6-6 6",
  left: "M20 12H4m6-6-6 6 6 6",
  up: "M12 20V4m-6 6 6-6 6 6",
  down: "M12 4v16m-6-6 6 6 6-6",
  "up-right": "M6 18 18 6M6 6h12v12",
};

export function ArrowIcon({
  direction = "right",
}: {
  direction?: keyof typeof paths;
}) {
  return (
    <svg
      className="arrow-icon"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[direction]} />
    </svg>
  );
}
