export function formatMsgTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hours: "2-digit",
    minutes: "2-digit",
    // hour12: false,
  });
}
