import { Resvg } from "@resvg/resvg-js";
import fs from "node:fs";
import path from "node:path";

const out = process.argv[2] ?? "assets/images";
fs.mkdirSync(out, { recursive: true });

const BRAND = "#0E7A63";
const BRAND_DARK = "#5CC9AE";

const mark = (stroke) => `
  <g fill="none" stroke="${stroke}" stroke-width="72" stroke-linecap="round" stroke-linejoin="round">
    <rect x="212" y="292" width="600" height="440" rx="76"/>
    <polyline points="304,424 448,550 716,364"/>
  </g>`;

const svg = (body, bg) => `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">${bg ? `<rect width="1024" height="1024" fill="${bg}"/>` : ""}${body}</svg>`;

const render = (name, source, size = 1024) => {
  const png = new Resvg(source, { fitTo: { mode: "width", value: size } }).render().asPng();
  fs.writeFileSync(path.join(out, name), png);
};

render("icon.png", svg(mark("#FFFFFF"), BRAND));
render("favicon.png", svg(mark("#FFFFFF"), BRAND), 256);
render("android-icon-background.png", svg("", BRAND));
render("android-icon-foreground.png", svg(mark("#FFFFFF")));
render("android-icon-monochrome.png", svg(mark("#FFFFFF")));
render("splashscreen.png", svg(mark(BRAND)));
render("splashscreen-dark.png", svg(mark(BRAND_DARK)));
fs.writeFileSync(path.join(out, "heed-mark.svg"), svg(mark("currentColor")).trim() + "\n");
