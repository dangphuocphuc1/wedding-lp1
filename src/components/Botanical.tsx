export function Flower({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`flower ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <g fill="currentColor">
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <ellipse
            key={angle}
            cx="50"
            cy="28"
            rx="12"
            ry="22"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
      </g>
      <circle cx="50" cy="50" r="13" fill="#b39a5e" />
    </svg>
  );
}

export function Botanical({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`botanical ${className}`}
      viewBox="0 0 240 360"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M119 350C136 263 65 209 108 126C124 96 153 61 157 14M116 279C164 252 177 213 187 157M106 233C58 210 37 171 32 126M107 148C70 90 78 70 74 51"
        stroke="#6e8564"
        strokeWidth="2"
      />
      <path
        d="M116 280C169 280 192 249 183 224C156 224 128 244 116 280ZM105 234C51 232 27 205 29 177C61 178 88 202 105 234ZM113 190C145 186 165 164 160 139C135 143 115 163 113 190ZM104 155C63 147 52 126 58 104C81 109 98 131 104 155ZM137 77C171 77 193 54 186 35C165 40 145 53 137 77ZM151 40C127 27 128 10 139 2C156 13 159 26 151 40Z"
        fill="#9aac89"
        opacity=".8"
      />
      <path
        d="M183 226C215 207 227 181 213 164C193 177 185 198 183 226ZM33 174C7 155 3 133 16 117C35 134 39 151 33 174Z"
        fill="#c1ccab"
      />
      <g fill="#e9c7b6">
        <ellipse cx="108" cy="103" rx="10" ry="22" />
        <ellipse
          cx="108"
          cy="103"
          rx="10"
          ry="22"
          transform="rotate(60 108 103)"
        />
        <ellipse
          cx="108"
          cy="103"
          rx="10"
          ry="22"
          transform="rotate(120 108 103)"
        />
      </g>
      <circle cx="108" cy="103" r="7" fill="#c4a05d" />
      <g fill="#eee1b4">
        <ellipse cx="190" cy="154" rx="8" ry="17" />
        <ellipse
          cx="190"
          cy="154"
          rx="8"
          ry="17"
          transform="rotate(60 190 154)"
        />
        <ellipse
          cx="190"
          cy="154"
          rx="8"
          ry="17"
          transform="rotate(120 190 154)"
        />
      </g>
      <circle cx="190" cy="154" r="5" fill="#ac9354" />
    </svg>
  );
}
