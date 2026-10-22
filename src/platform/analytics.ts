import posthogClient from "posthog-js";

const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
const posthogHost = import.meta.env.VITE_POSTHOG_HOST;

// Without both variables (local dev, forks, previews) analytics is a no-op.
export const posthog = posthogKey && posthogHost ? posthogClient : undefined;

if (posthog) {
  posthog.init(posthogKey!, {
    api_host: posthogHost!,
    defaults: "2026-05-30",
    // Anonymous random id in localStorage only: counts users and return visits.
    persistence: "localStorage",
    ip: false,
    respect_dnt: true,
    autocapture: false,
    disable_session_recording: true,
    person_profiles: "identified_only",
    capture_exceptions: true,
    before_send: scrubExceptionEvent,
  });
}

/** Whether anonymous diagnostics are being sent (on unless the user opted out). */
export function analyticsEnabled(): boolean {
  return posthog ? !posthog.has_opted_out_capturing() : false;
}

export function setAnalyticsEnabled(enabled: boolean): void {
  if (!posthog) return;
  if (enabled) posthog.opt_in_capturing();
  else posthog.opt_out_capturing();
}

/** Whether this build reports anything, so Settings can hide a dead switch. */
export const analyticsAvailable = posthog !== undefined;

/** Model-level device facts only: never serials, receiver ids or user text. */
export interface DeviceFacts {
  vendorId?: number;
  productId?: number;
  productName?: string;
  brand?: string;
}

export function deviceProps(device: DeviceFacts | null | undefined): Record<string, string | number> {
  const props: Record<string, string | number> = {};
  if (!device) return props;
  if (device.vendorId !== undefined) props.vendor_id = device.vendorId;
  if (device.productId !== undefined) props.product_id = device.productId;
  if (device.productName) props.product_name = device.productName.slice(0, 80);
  if (device.brand) props.brand = device.brand.slice(0, 40);
  return props;
}

/** Text with emails, paths and long hex ids (serials, receiver ids) removed, and capped. */
function scrubText(raw: string): string {
  return raw
    .replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, "<email>")
    .replace(/(?:[A-Za-z]:)?[\\/][\w .\\/-]{3,}/g, "<path>")
    .replace(/\b[0-9a-fA-F]{12,}\b/g, "<id>")
    .slice(0, 200);
}

export function scrubError(error: unknown): { error_name: string; error_message: string } {
  const name = error instanceof Error ? error.name : "Error";
  return { error_name: name, error_message: scrubText(error instanceof Error ? error.message : String(error)) };
}

interface ExceptionFrame { filename?: string; abs_path?: string; [key: string]: unknown }
interface ExceptionEntry { type?: string; value?: string; stacktrace?: { frames?: ExceptionFrame[] }; [key: string]: unknown }
interface OutgoingEvent { event: string; properties?: Record<string, unknown> }

/** Frame files stay only when they are the app's own bundles, so stacks still de-minify. */
function ownFile(file: string | undefined): string | undefined {
  return file && file.startsWith(location.origin) ? file.split(/[?#]/)[0] : undefined;
}

/** Scrubs automatic `$exception` events before they leave the browser. */
function scrubExceptionEvent<T extends OutgoingEvent | null>(event: T): T {
  if (!event || event.event !== "$exception" || !event.properties) return event;
  const props = event.properties;
  const list = props.$exception_list;
  if (Array.isArray(list)) {
    props.$exception_list = (list as ExceptionEntry[]).map((entry) => ({
      ...entry,
      value: typeof entry.value === "string" ? scrubText(entry.value) : entry.value,
      stacktrace: entry.stacktrace
        ? {
            ...entry.stacktrace,
            frames: entry.stacktrace.frames?.map((frame) => ({
              ...frame,
              filename: ownFile(frame.filename),
              abs_path: ownFile(frame.abs_path),
            })),
          }
        : entry.stacktrace,
    }));
  }
  for (const key of ["$exception_message", "$exception_value"]) {
    if (typeof props[key] === "string") props[key] = scrubText(props[key] as string);
  }
  return event;
}

export function track(event: string, props?: Record<string, unknown>): void {
  posthog?.capture(event, props);
}
