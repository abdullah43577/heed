// Heed's own spot illustrations: line art on a 160×120 grid, in the icon stroke.
// Tokens are filled from the theme by <Illustration>, so each works in both schemes.

const STROKE = 'stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"';
const BACKDROP = '<circle cx="80" cy="62" r="50" fill="{{tint}}"/>';

const spark = (x: number, y: number, size: number) =>
  `<path d="M${x} ${y - size}v${size * 2}M${x - size} ${y}h${size * 2}" stroke="{{accent}}" ${STROKE}/>`;

const star = (x: number, y: number, r: number) =>
  `<path d="M${x} ${y - r}c${r * 0.12} ${r * 0.62} ${r * 0.38} ${r * 0.88} ${r} ${r}c-${r * 0.62} ${r * 0.12}-${r * 0.88} ${r * 0.38}-${r} ${r}c-${r * 0.12}-${r * 0.62}-${r * 0.38}-${r * 0.88}-${r}-${r}c${r * 0.62}-${r * 0.12} ${r * 0.88}-${r * 0.38} ${r}-${r}Z" fill="{{accent}}"/>`;

const badge = (fill: string, mark: string) =>
  `<circle cx="116" cy="40" r="12" fill="${fill}"/>${mark}`;

const CHECK_MARK = `<path d="m110.5 40.5 4 4 7.5-8" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
const PLUS_MARK = `<path d="M116 34.5v11M110.5 40h11" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>`;
const CLOCK_MARK = `<circle cx="116" cy="40" r="6.5" stroke="#FFFFFF" stroke-width="1.8"/><path d="M116 36.5V40l2.5 1.8" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`;
const ALERT_MARK = `<path d="M116 34v7" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/><circle cx="116" cy="45.6" r="1.4" fill="#FFFFFF"/>`;

const closedEnvelope = `<rect x="40" y="40" width="80" height="54" rx="6" fill="{{surface}}" stroke="{{fg}}" ${STROKE}/><path d="m43 44 37 26 37-26" stroke="{{fg}}" ${STROKE}/>`;

const openEnvelope = [
  `<path d="M40 58 80 32l40 26" stroke="{{fg}}" ${STROKE}/>`,
  `<rect x="52" y="38" width="56" height="46" rx="5" fill="{{surface}}" stroke="{{fg}}" ${STROKE}/>`,
  `<path d="M62 52h30M62 60h20" stroke="{{subtle}}" ${STROKE}/>`,
  `<path d="M40 58v38a5 5 0 0 0 5 5h70a5 5 0 0 0 5-5V58L80 84 40 58Z" fill="{{surface}}" stroke="{{fg}}" ${STROKE}/>`,
  `<path d="M42 99 70 78M118 99 90 78" stroke="{{fg}}" ${STROKE}/>`,
].join("");

const tray = [
  `<rect x="58" y="24" width="44" height="34" rx="4" fill="{{surface}}" stroke="{{fg}}" ${STROKE}/>`,
  `<path d="M66 35h28M66 43h18" stroke="{{subtle}}" ${STROKE}/>`,
  `<path d="M38 66 50 48h60l12 18v24a5 5 0 0 1-5 5H43a5 5 0 0 1-5-5Z" fill="{{surface}}" stroke="{{fg}}" ${STROKE}/>`,
  `<path d="M38 66h24l5 9h26l5-9h24" stroke="{{fg}}" ${STROKE}/>`,
].join("");

const bubble = [
  `<path d="M46 32h68a6 6 0 0 1 6 6v34a6 6 0 0 1-6 6H78L64 90V78H46a6 6 0 0 1-6-6V38a6 6 0 0 1 6-6Z" fill="{{surface}}" stroke="{{fg}}" ${STROKE}/>`,
  `<path d="M54 48h40M54 58h26" stroke="{{subtle}}" ${STROKE}/>`,
].join("");

const sheet = [
  `<rect x="50" y="28" width="60" height="72" rx="5" fill="{{surface}}" stroke="{{fg}}" ${STROKE}/>`,
  `<path d="M60 42h24" stroke="{{fg}}" ${STROKE}/>`,
  `<path d="M60 54h40M60 63h40M60 72h26" stroke="{{subtle}}" ${STROKE}/>`,
].join("");

const svg = (...parts: string[]) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120" fill="none">${parts.join("")}</svg>`;

export const SPOTS = {
  emptyReview: svg(BACKDROP, openEnvelope, badge("{{accent}}", CHECK_MARK), spark(32, 35, 5), spark(132, 82, 4), '<circle cx="128" cy="20" r="2" fill="{{accent}}"/>'),
  emptyHandled: svg(BACKDROP, tray, badge("{{accent}}", CHECK_MARK), spark(30, 40, 5), '<circle cx="132" cy="80" r="2" fill="{{accent}}"/>'),
  emptyAsk: svg(BACKDROP, bubble, star(116, 30, 9), star(34, 82, 5), '<circle cx="134" cy="66" r="2" fill="{{accent}}"/>'),
  emptyAccounts: svg(BACKDROP, closedEnvelope, badge("{{accent}}", PLUS_MARK), spark(32, 36, 5), '<circle cx="130" cy="84" r="2" fill="{{accent}}"/>'),
  emptyNotifications: svg(
    BACKDROP,
    `<path d="M80 26v5" stroke="{{fg}}" ${STROKE}/>`,
    `<path d="M80 31a21 21 0 0 0-21 21c0 16-6 23-10 27h62c-4-4-10-11-10-27a21 21 0 0 0-21-21Z" fill="{{surface}}" stroke="{{fg}}" ${STROKE}/>`,
    `<path d="M71 86a9 9 0 0 0 18 0" stroke="{{fg}}" ${STROKE}/>`,
    badge("{{accent}}", CHECK_MARK),
    spark(34, 46, 5),
  ),
  error: svg('<circle cx="80" cy="62" r="50" fill="{{warnTint}}"/>', closedEnvelope, badge("{{warn}}", ALERT_MARK)),
  onboardingNoise: svg(
    BACKDROP,
    `<g transform="rotate(-12 56 50)"><rect x="34" y="34" width="44" height="30" rx="4" fill="{{surface}}" stroke="{{fg}}" ${STROKE}/><path d="m36 37 20 14 20-14" stroke="{{fg}}" ${STROKE}/></g>`,
    `<g transform="rotate(10 104 46)"><rect x="84" y="30" width="44" height="30" rx="4" fill="{{surface}}" stroke="{{fg}}" ${STROKE}/><path d="m86 33 20 14 20-14" stroke="{{fg}}" ${STROKE}/></g>`,
    `<g transform="rotate(-4 82 82)"><rect x="58" y="66" width="48" height="32" rx="4" fill="{{surface}}" stroke="{{fg}}" ${STROKE}/><path d="m60 69 22 15 22-15" stroke="{{fg}}" ${STROKE}/></g>`,
    '<circle cx="76" cy="32" r="5" fill="{{warn}}"/><circle cx="128" cy="30" r="5" fill="{{warn}}"/><circle cx="106" cy="66" r="5" fill="{{warn}}"/>',
  ),
  onboardingReads: svg(BACKDROP, tray, badge("{{accent}}", CHECK_MARK), spark(30, 40, 5), spark(134, 80, 4)),
  onboardingReply: svg(
    BACKDROP,
    bubble,
    '<circle cx="116" cy="40" r="12" fill="{{accent}}"/>',
    '<path d="m110.5 41 5.5-5.5 5.5 5.5M116 35.5V46" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    spark(32, 84, 5),
  ),
  setupReport: svg(BACKDROP, sheet, `<path d="M60 81h32M60 90h20" stroke="{{subtle}}" ${STROKE}/>`, badge("{{accent}}", CLOCK_MARK), spark(34, 84, 5)),
  setupStyle: svg(
    BACKDROP,
    sheet,
    `<path d="M60 88c3-7 7-7 9 0s6 7 9 0" stroke="{{accent}}" ${STROKE}/>`,
    `<g transform="rotate(35 112 78)"><rect x="106" y="48" width="12" height="38" rx="3" fill="{{surface}}" stroke="{{fg}}" ${STROKE}/><path d="M106 86l6 10 6-10Z" fill="{{accent}}" stroke="{{fg}}" ${STROKE}/><path d="M106 56h12" stroke="{{fg}}" ${STROKE}/></g>`,
    star(36, 40, 6),
  ),
} as const;

export type IllustrationName = keyof typeof SPOTS;
