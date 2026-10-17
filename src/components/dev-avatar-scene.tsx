import type { SVGProps } from "react";

/**
 * Developer-at-desk avatar scene, drawn as vectors so it stays sharp at any
 * size and ships with zero external assets. Composition follows the reference:
 * a hooded engineer at a laptop, floating code tiles, a code window, a plant,
 * a mug and a stack of books.
 */
export function DevAvatarScene(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Illustration of a developer working at a desk with a laptop"
      {...props}
    >
      <defs>
        <linearGradient id="dav-bg" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#2c1a58" />
          <stop offset="0.55" stopColor="#1e1240" />
          <stop offset="1" stopColor="#150d2b" />
        </linearGradient>
        <radialGradient id="dav-glow" cx="0.5" cy="0.48" r="0.55">
          <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.45" />
          <stop offset="0.6" stopColor="#6d28d9" stopOpacity="0.16" />
          <stop offset="1" stopColor="#6d28d9" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="dav-tile" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#b39dff" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="dav-tile2" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#9d7bff" />
          <stop offset="1" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="dav-hoodie" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#5b7cfa" />
          <stop offset="1" stopColor="#2a3ea6" />
        </linearGradient>
        <linearGradient id="dav-skin" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#f9d0ac" />
          <stop offset="1" stopColor="#e3a273" />
        </linearGradient>
        <linearGradient id="dav-hair" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#4a3527" />
          <stop offset="1" stopColor="#2a1d15" />
        </linearGradient>
        <linearGradient id="dav-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dda878" />
          <stop offset="1" stopColor="#b07c4c" />
        </linearGradient>
        <linearGradient id="dav-wood-dark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a5a38" />
          <stop offset="1" stopColor="#593921" />
        </linearGradient>
        <linearGradient id="dav-lid" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#f4f6f9" />
          <stop offset="0.55" stopColor="#cfd6df" />
          <stop offset="1" stopColor="#9aa4b2" />
        </linearGradient>
        <linearGradient id="dav-base" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c9d1da" />
          <stop offset="0.5" stopColor="#f8fafc" />
          <stop offset="1" stopColor="#b6c0cc" />
        </linearGradient>
        <linearGradient id="dav-leaf" x1="0.2" y1="0.1" x2="0.8" y2="1">
          <stop offset="0" stopColor="#5eead4" />
          <stop offset="0.45" stopColor="#34d399" />
          <stop offset="1" stopColor="#15803d" />
        </linearGradient>
      </defs>

      {/* backdrop */}
      <rect width="400" height="500" fill="url(#dav-bg)" />
      <ellipse cx="200" cy="238" rx="205" ry="215" fill="url(#dav-glow)" />

      {/* ambient dots */}
      <g fill="#c4b5fd">
        <circle cx="52" cy="128" r="3" opacity="0.5" />
        <circle cx="356" cy="322" r="3" opacity="0.4" />
        <circle cx="126" cy="352" r="2.5" opacity="0.35" />
        <circle cx="298" cy="52" r="2.5" opacity="0.45" />
        <circle cx="24" cy="252" r="2" opacity="0.3" />
      </g>

      {/* floating code window */}
      <g transform="translate(14 30)">
        <rect
          width="158"
          height="114"
          rx="14"
          fill="#150e2e"
          stroke="#7c3aed"
          strokeOpacity="0.35"
        />
        <circle cx="17" cy="17" r="4" fill="#f87171" />
        <circle cx="31" cy="17" r="4" fill="#fbbf24" />
        <circle cx="45" cy="17" r="4" fill="#34d399" />
        <g>
          <rect x="16" y="34" width="58" height="6" rx="3" fill="#a78bfa" />
          <rect
            x="16"
            y="48"
            width="98"
            height="6"
            rx="3"
            fill="#6366f1"
            opacity="0.85"
          />
          <rect
            x="26"
            y="62"
            width="76"
            height="6"
            rx="3"
            fill="#94a3b8"
            opacity="0.5"
          />
          <rect
            x="26"
            y="76"
            width="108"
            height="6"
            rx="3"
            fill="#a78bfa"
            opacity="0.75"
          />
          <rect
            x="16"
            y="90"
            width="46"
            height="6"
            rx="3"
            fill="#22d3ee"
            opacity="0.6"
          />
        </g>
      </g>

      {/* floating code tiles */}
      <g transform="translate(256 78)">
        <g className="animate-float" style={{ animationDelay: "0s" }}>
          <g transform="rotate(7 31 31)">
            <rect width="62" height="62" rx="18" fill="url(#dav-tile)" />
            <text
              x="31"
              y="40"
              textAnchor="middle"
              fontSize="25"
              fontWeight="700"
              fill="#ffffff"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            >
              {"{ }"}
            </text>
          </g>
        </g>
      </g>

      <g transform="translate(292 196)">
        <g className="animate-float" style={{ animationDelay: "1.1s" }}>
          <g transform="rotate(-9 29 29)">
            <rect width="58" height="58" rx="17" fill="url(#dav-tile2)" />
            <text
              x="29"
              y="37"
              textAnchor="middle"
              fontSize="17"
              fontWeight="700"
              fill="#ffffff"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            >
              {"</>"}
            </text>
          </g>
        </g>
      </g>

      <g transform="translate(26 190)">
        <g className="animate-float" style={{ animationDelay: "2.2s" }}>
          <g transform="rotate(8 26 26)">
            <rect width="52" height="52" rx="15" fill="url(#dav-tile2)" />
            <text
              x="26"
              y="34"
              textAnchor="middle"
              fontSize="20"
              fontWeight="700"
              fill="#ffffff"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            >
              {"{ }"}
            </text>
          </g>
        </g>
      </g>

      {/* character */}
      <g>
        {/* torso */}
        <rect
          x="138"
          y="288"
          width="124"
          height="150"
          rx="48"
          fill="url(#dav-hoodie)"
        />
        {/* hood collar */}
        <ellipse cx="200" cy="300" rx="58" ry="38" fill="#23307e" />
        {/* drawstrings */}
        <g
          stroke="#dbeafe"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.85"
        >
          <path d="M186 318 L183 346" />
          <path d="M214 318 L217 346" />
        </g>
        <circle cx="183" cy="348" r="3.5" fill="#dbeafe" />
        <circle cx="217" cy="348" r="3.5" fill="#dbeafe" />

        {/* neck */}
        <rect x="186" y="266" width="28" height="30" rx="11" fill="#d99263" />

        {/* head */}
        <ellipse cx="144" cy="243" rx="9" ry="13" fill="#e0a071" />
        <ellipse cx="256" cy="243" rx="9" ry="13" fill="#e0a071" />
        <ellipse cx="200" cy="238" rx="55" ry="58" fill="url(#dav-skin)" />

        {/* hair */}
        <g fill="url(#dav-hair)">
          <circle cx="172" cy="184" r="24" />
          <circle cx="204" cy="176" r="27" />
          <circle cx="234" cy="187" r="22" />
          <circle cx="152" cy="212" r="18" />
          <circle cx="250" cy="212" r="17" />
          <path d="M146 232 C140 186 166 166 200 166 C234 166 260 186 254 232 C248 210 240 202 226 202 C216 186 184 186 174 202 C160 202 152 210 146 232 Z" />
        </g>

        {/* face */}
        <g fill="#2c1c14">
          <ellipse cx="182" cy="240" rx="6" ry="8" />
          <ellipse cx="218" cy="240" rx="6" ry="8" />
        </g>
        <g fill="#ffffff">
          <circle cx="184" cy="237" r="2" />
          <circle cx="220" cy="237" r="2" />
        </g>
        <g
          stroke="#3a2820"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M172 222 Q182 216 192 221" />
          <path d="M208 221 Q218 216 228 222" />
        </g>
        <path
          d="M200 248 Q205 255 199 257"
          stroke="#d18c60"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M182 261 Q200 280 218 261 Q200 269 182 261 Z"
          fill="#8b4632"
        />
        <g fill="#f0958a" opacity="0.4">
          <circle cx="166" cy="257" r="9" />
          <circle cx="234" cy="257" r="9" />
        </g>

        {/* hands rest on the keyboard, drawn after the laptop */}
      </g>

      {/* desk */}
      <g>
        <rect x="-8" y="384" width="416" height="22" rx="10" fill="url(#dav-wood)" />
        <rect x="-8" y="402" width="416" height="98" fill="url(#dav-wood-dark)" />
        <rect x="-8" y="384" width="416" height="5" rx="2.5" fill="#f0c295" opacity="0.55" />
      </g>

      {/* laptop */}
      <g>
        <ellipse cx="200" cy="392" rx="92" ry="9" fill="#000000" opacity="0.2" />
        <path d="M152 300 L248 300 L262 378 L138 378 Z" fill="url(#dav-lid)" />
        <path d="M152 300 L248 300 L250 308 L150 308 Z" fill="#ffffff" opacity="0.45" />
        <circle cx="200" cy="340" r="9" fill="#aab4c0" opacity="0.7" />
        <path d="M140 378 L260 378 L270 390 L130 390 Z" fill="url(#dav-base)" />
        <path d="M130 390 L270 390 L270 394 L130 394 Z" fill="#9aa4b2" />
        <rect x="180" y="384" width="40" height="4" rx="2" fill="#8f99a6" opacity="0.55" />
      </g>

      {/* arms and hands */}
      <g fill="none" stroke="url(#dav-hoodie)" strokeWidth="26" strokeLinecap="round">
        <path d="M152 320 C128 348 130 374 150 390" />
        <path d="M248 320 C272 348 270 374 250 390" />
      </g>
      <g fill="url(#dav-skin)">
        <ellipse cx="151" cy="391" rx="11" ry="9" />
        <ellipse cx="249" cy="391" rx="11" ry="9" />
      </g>

      {/* plant */}
      <g>
        <g fill="url(#dav-leaf)">
          <path d="M84 344 C66 312 64 286 78 272 C94 286 94 318 84 344 Z" />
          <path d="M86 344 C104 314 112 292 100 278 C84 292 82 320 86 344 Z" />
          <path d="M85 342 C74 318 76 300 86 292 C96 302 94 324 85 342 Z" />
          <path d="M84 340 C100 330 112 330 120 338 C110 348 94 348 84 340 Z" />
        </g>
        <path d="M84 344 L85 300" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
        <rect x="56" y="342" width="56" height="12" rx="5" fill="#eef2f7" />
        <path d="M62 354 L106 354 L100 386 L68 386 Z" fill="#dbe2ec" />
        <path d="M68 386 L100 386 L100 380 L68 380 Z" fill="#c2cbd8" />
      </g>

      {/* mug */}
      <g>
        <path
          d="M318 358 q15 10 0 20"
          stroke="#2b3648"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <rect x="286" y="346" width="34" height="40" rx="8" fill="#1c2534" />
        <rect x="286" y="346" width="34" height="7" rx="3.5" fill="#2b3648" />
        <text
          x="303"
          y="373"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="#c4b5fd"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        >
          {"</>"}
        </text>
      </g>

      {/* books */}
      <g>
        <g fill="#ef4444">
          <rect x="336" y="377" width="54" height="9" rx="3" />
          <rect x="336" y="377" width="10" height="9" rx="3" fill="#fca5a5" opacity="0.7" />
        </g>
        <g fill="#3b82f6">
          <rect x="340" y="368" width="46" height="9" rx="3" />
          <rect x="340" y="368" width="9" height="9" rx="3" fill="#93c5fd" opacity="0.7" />
        </g>
        <g fill="#f59e0b">
          <rect x="334" y="359" width="54" height="9" rx="3" />
          <rect x="334" y="359" width="10" height="9" rx="3" fill="#fcd34d" opacity="0.75" />
        </g>
      </g>
    </svg>
  );
}
