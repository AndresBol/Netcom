export function formatDate(value, locale = "es-CR") {
  if (!value) return "";
  return new Date(value).toLocaleDateString(locale);
}

export function formatTime(value, locale = "es-CR") {
  if (!value) return "";
  return new Date(value).toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}