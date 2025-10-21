export function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("es-CR");
}

export function formatTime(value) {
  if (!value) return "";
  return new Date(value).toLocaleTimeString("es-CR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}