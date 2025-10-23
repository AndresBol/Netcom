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

export function formatDateUS(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US");
}

export function formatTimeUS(value) {
  if (!value) return "";
  return new Date(value).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}