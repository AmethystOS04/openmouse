/**
 * Top-down product art for the persistent device panel.
 */

const filenameCache = new Map<string, string>();

function resolveDeviceImageFilename(_device: HIDDevice | null | undefined, displayName = ""): string {
  const cached = filenameCache.get(displayName);
  if (cached !== undefined) return cached;
  const resolved = computeDeviceImageFilename(displayName);
  filenameCache.set(displayName, resolved);
  return resolved;
}

function computeDeviceImageFilename(displayName: string): string {
  // Preserve the existing device mappings.
  if (/g502\s*x\s*plus/i.test(displayName)) return "logitech-g502-x-plus.png";
  if (/g502\s*x/i.test(displayName)) return "logitech-g502-x.png";
  if (/\bg502\b/i.test(displayName)) return "logitech-g502.png";
  if (/\bg703\b/i.test(displayName)) return "logitech-g703.png";
  if (/\bpro\s*x\s*wireless\b/i.test(displayName)) return "logitech-pro-x-superlight-2c.png";
  if (/mx\s*master\s*4/i.test(displayName)) return "unknown-device.png";
  if (/superstrike/i.test(displayName) && /x\s*3/i.test(displayName)) return "logitech-pro-x3-superstrike.png";
  if (/superstrike/i.test(displayName)) return "logitech-pro-x2-superstrike.png";
  if (/superlight/i.test(displayName)) return "logitech-pro-x-superlight-2c.png";
  if (/op1we/i.test(displayName)) return "endgame-gear-op1we.png";
  if (/\bop1\b/i.test(displayName)) return "endgame-gear-op1-8k.png";
  if (/\bviper\s*v2\s*pro\b/i.test(displayName)) return "razer-viper-v2-pro.png";
  if (/\bviper\s*v3\s*pro\b(?!\s*se)/i.test(displayName)) return "razer-viper-v3-pro.png";
  if (/\bviper\s*mini\b/i.test(displayName)) return "razer-viper-mini.webp";
  if (/\borochi\s*v2\b/i.test(displayName)) return "razer-orochi-v2.png";
  if (/\bcobra\b/i.test(displayName)) return "razer-cobra.webp";
  if (/\bnape\s*pro\b/i.test(displayName)) return "unknown-device.png";
  if (/\bko-one\b/i.test(displayName)) return "crdrako-ko-one.png";
  if (/\bvxe\s+r1(?:\s+(?:se\+?|pro(?:\s+max)?))?\b/i.test(displayName)) return "vxe-r1-series.png";
  if (/\br5\s*ultra\b/i.test(displayName)) return "attackshark-r5-ultra.png";
  if (/\bfloat\s*88\b/i.test(displayName)) return "ipi-float-88.png";
  if (/\batk\s*zero\b/i.test(displayName)) return "atk-zero.png";
  if (/\battack\s*shark\s*r2\b/i.test(displayName)) return "attackshark-r2.png";
  if (/\bdelux\b.*\bm800/i.test(displayName) || /\bm800\s*(mini|pro)?\b/i.test(displayName)) return "delux-m800-mini.png";
  if (/\battack\s*shark\s*x3\b/i.test(displayName)) return "attackshark-x3.png";
  if (/\bm[23]k\b/i.test(displayName)) return "zaunkoenig-m3k.png";
  if (/\bharpe\s*ace\s*aim\s*lab\b/i.test(displayName)) return "asus-rog-harpe-ace-aim-lab.png";
  if (/\bmx\s*master\s*3s\b/i.test(displayName)) return "logitech-mx-master-3s.png";
  if (/\bterra\s*pro\b/i.test(displayName)) return "teevolution-terra-pro.png";
  if (/\bm-001\b/i.test(displayName)) return "wallhack-m-001.png";
  if (/\bk-001\b/i.test(displayName)) return "wallhack-k-001.png";
  if (/\bnightsword\b/i.test(displayName)) return "unknown-device.png";
  if (/\bg(?:102|203)\b/i.test(displayName)) return "logitech-g203.png";
  if (/\bg303\b/i.test(displayName)) return "logitech-g303.png";
  if (/\bg402\b/i.test(displayName)) return "logitech-g402.png";
  if (/\bg403\b/i.test(displayName)) return "logitech-g403.png";
  if (/\bg903\b/i.test(displayName)) return "logitech-g903.png";
  if (/\bg30[45]\b/i.test(displayName)) return "logitech-g305.png";
  if (/\bg309\b/i.test(displayName)) return "logitech-g309.png";
  if (/\bg\s*pro\s*2\b/i.test(displayName)) return "logitech-g-pro-2.png";
  if (/\bg\s*pro\s*wireless\b/i.test(displayName)) return "logitech-gpro-wireless.png";
  if (/\bg\s*pro\b/i.test(displayName)) return "logitech-g-pro.png";
  if (/\bmx\s*anywhere\s*3\b/i.test(displayName)) return "logitech-mx-anywhere-3.png";
  if (/\bmx\s*ergo\b/i.test(displayName)) return "logitech-mx-ergo-s.png";
  if (/\bdeathadder\s*v4\b/i.test(displayName)) return "razer-deathadder-v4-pro.png";
  if (/\bdeathadder\s*v3\s*hyperspeed\b/i.test(displayName)) return "razer-deathadder-v3-hyperspeed.png";
  if (/\bdeathadder\s*v3\b/i.test(displayName)) return "razer-deathadder-v3.png";
  if (/\bdeathadder\s*v2\b(?!\s*x\s*hyperspeed\b)/i.test(displayName)) return "razer-deathadder-v2.png";
  if (/\bdeathadder\s*essential\b/i.test(displayName)) return "razer-deathadder-v2.png";
  if (/\bviper\s*v3\s*hyperspeed\b/i.test(displayName)) return "razer-viper-v3-hyperspeed.png";
  if (/\bviper\s*v4\b/i.test(displayName)) return "razer-viper-v4-pro.png";
  if (/\bviper\b(?!\s*(ultimate|8khz|mini|v2|v3|v4))/i.test(displayName)) return "razer-viper.webp";
  if (/\bxm2\s*8k\b/i.test(displayName)) return "endgame-gear-xm2-8k.png";
  if (/\bxm2w\b/i.test(displayName)) return "endgame-gear-xm2w.png";
  if (/\bbeast\s*max\b/i.test(displayName)) return "wlmouse-beast-max.png";
  if (/\bbeast\s*g\b/i.test(displayName)) return "wlmouse-beast-g.png";
  if (/\bbeast\s*x\s*pro\b/i.test(displayName)) return "unknown-device.png";
  if (/\bbeast\s*mini\b/i.test(displayName)) return "unknown-device.png";
  if (/\bbeast\s*x\b/i.test(displayName)) return "unknown-device.png";
  if (/\bsword\s*x\b/i.test(displayName)) return "wlmouse-sword-x.png";
  if (/\bdragonfly\s*f2\b/i.test(displayName)) return "vgn-dragonfly-f2.png";
  if (/\bmaya\s*x\b/i.test(displayName)) return "lamzu-maya-x.png";
  if (/\bnoir\s*s1\b/i.test(displayName)) return "noir-s1.png";
  if (/k[\s-]*snake/i.test(displayName)) return "ksnake-x11.png";
  if (/\bf1\s*v2\b/i.test(displayName)) return "atk-f1-v2-ultra-max.png";
  if (/\ba7\s*v3\b/i.test(displayName)) return "mchose-a7-v3.png";
  if (/\ba7\s*v2\b/i.test(displayName)) return "mchose-a7-v2.png";
  if (/\ba950\s*pro\s*mg\b/i.test(displayName)) return "dareu-a950-pro-mg.png";
  if (/\bmm711\b/i.test(displayName)) return "coolermaster-mm711.png";
  if (/\bsora\s*v3\b/i.test(displayName)) return "ninjutso-sora-v3.png";
  if (/\bsora\s*v2\b/i.test(displayName)) return "ninjutso-sora-v2.png";
  if (/\bninjutso\b.*\bten\b/i.test(displayName)) return "ninjutso-ten.png";
  if (/\bg23\s*v2\s*pro\b/i.test(displayName)) return "incott-g23-v2-pro.png";
  if (/\bg23\s*v2\b/i.test(displayName)) return "incott-g23-v2.png";
  if (/\bg23\s*pro\b/i.test(displayName)) return "incott-g23-pro.png";
  if (/\bg23\b/i.test(displayName)) return "incott-g23.png";
  if (/\bg24\s*pro\b/i.test(displayName)) return "incott-g24-pro.png";
  if (/\bg24\b/i.test(displayName)) return "incott-g24.png";
  if (/\bghero\s*pro\b/i.test(displayName)) return "incott-ghero-pro.png";
  if (/\bghero\b/i.test(displayName)) return "incott-ghero.png";
  if (/\bzero\s*29\s*pro\b/i.test(displayName)) return "incott-zero-29-pro.png";
  if (/\bzero\s*29\b/i.test(displayName)) return "incott-zero-29.png";
  if (/\bzero\s*39\s*pro\b/i.test(displayName)) return "incott-zero-39-pro.png";
  if (/\bzero\s*39\b/i.test(displayName)) return "incott-zero-39.png";
  if (/\bkeychron\s*m6\b/i.test(displayName)) return "keychron-m6.png";
  if (/\bstarlight\s*x\b|\bslx\b/i.test(displayName)) return "finalmouse-slx.png";
  if (/\b(finalmouse|starlight|ulx)\b/i.test(displayName)) return "finalmouse-ulx.png";
  if (/\borbital\b/i.test(displayName)) return "unknown-device.png";
  if (/\bmoddo/i.test(displayName)) return "unknown-device.png";
  if (/\bintellimouse\s*classic\b/i.test(displayName)) return "microsoft-classic-intellimouse.png";
  if (/\bpro\s*intellimouse\b/i.test(displayName)) return "microsoft-pro-intellimouse.png";
  if (/\bintellimouse\b/i.test(displayName)) return "microsoft-classic-intellimouse.png";
  if (/\bpulsefire\s*haste\b/i.test(displayName)) return "hyperx-pulsefire-haste.png";
  // Direct SteelSeries product image, so there is no SVG wrapper or nested image.
  if (/\brival\s*3\s*gen\s*2\b/i.test(displayName)) return "steelseries-rival-3-gen-2-direct.webp";
  if (/pulsar/i.test(displayName)) return "pulsar-x2-v2.png";
  return "unknown-device.png";
}

const DEVICE_IMAGE_BASE_URL = "https://img.openmouse.app/";

const LOCAL_OVERRIDES: Readonly<Record<string, string>> = {
  "attackshark-r2.png": "/devices/attackshark-r2.png",
  "delux-m800-mini.png": "/devices/delux-m800-mini.png",
  "ipi-float-88.png": "/devices/ipi-float-88.png",
  "asus-rog-harpe-ace-aim-lab.png": "/devices/asus-rog-harpe-ace-aim-lab.png",
  "steelseries-rival-3-gen-2-direct.webp": "https://images.ctfassets.net/hmm5mo4qf4mf/6JeTt3A36dChpcazQKyHbB/ad71640570dea931c42f1114b92d9993/rival_3_gen_2_black_pdp_img_buy_02.png?fm=webp&q=90&fit=scale&w=1200",
};

export function deviceImage(device: HIDDevice | null | undefined, displayName = ""): string {
  const filename = resolveDeviceImageFilename(device, displayName);
  const localPath = LOCAL_OVERRIDES[filename];
  if (localPath) {
    if (/^https?:\/\//i.test(localPath)) return localPath;
    const base = import.meta.env.BASE_URL;
    return `${base.replace(/\/$/, "")}${localPath}`;
  }
  return DEVICE_IMAGE_BASE_URL + filename;
}

export function deviceImageFilename(displayName = ""): string {
  return resolveDeviceImageFilename(null, displayName);
}

const SHOWCASE_DEVICE_FILENAMES: readonly string[] = [
  "logitech-g502-x-plus.png",
  "razer-viper-v3-pro.png",
  "endgame-gear-xm2-8k.png",
  "finalmouse-ulx.png",
  "pulsar-x2-v2.png",
  "lamzu-maya-x.png",
  "zaunkoenig-m3k.png",
  "attackshark-r5-ultra.png",
  "logitech-g-pro-2.png",
  "razer-deathadder-v3.png",
  "wlmouse-sword-x.png",
  "wlmouse-beast-max.png",
];

export function showcaseDeviceImageUrls(): readonly string[] {
  return SHOWCASE_DEVICE_FILENAMES.map((filename) => DEVICE_IMAGE_BASE_URL + filename);
}

export const UNKNOWN_DEVICE_FILENAME = "unknown-device.png";

export function isUnknownDevice(device: HIDDevice | null | undefined, displayName = ""): boolean {
  return resolveDeviceImageFilename(null, displayName) === UNKNOWN_DEVICE_FILENAME;
}
