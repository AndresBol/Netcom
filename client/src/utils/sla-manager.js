export function calculateResolutionDays(ticket) {
  const created = new Date(ticket.created_on);
  const closed = new Date(ticket.closed_on);
  return Math.round((closed - created) / (1000 * 60 * 60 * 24));
}

export function calculateSlaResponse(ticket, sla) {
  const created = new Date(ticket.created_on);
  const assigned = new Date(ticket.assigned_on);
  const diffMin = (assigned - created) / (1000 * 60);
  return diffMin <= sla.response_time;
}

export function calculateSlaResolution(ticket, sla) {
  const created = new Date(ticket.created_on);
  const closed = new Date(ticket.closed_on);
  const diffMin = (closed - created) / (1000 * 60);
  return diffMin <= sla.resolution_time;
}

export function complianceResponse(ticket, sla) {
  const created = new Date(ticket.created_on);
  const assigned = new Date(ticket.assigned_on);
  const diffMin = (assigned - created) / (1000 * 60);
  return diffMin <= sla.response_time ? "Compliance" : "No Compliance";
}

export function complianceResolution(ticket, sla) {
  const created = new Date(ticket.created_on);
  const closed = new Date(ticket.closed_on);
  const diffMin = (closed - created) / (1000 * 60);
  return diffMin <= sla.resolution_time ? "Compliance" : "No Compliance";
}

export function getSlaStatusIcon(created_on, resolution_time) {
  if (!resolution_time) return "­­⚪ N/A";

  const now = new Date();
  const created = new Date(created_on);
  const elapsed = (now - created) / (1000 * 60);
  const remaining = resolution_time - elapsed;

  let remainingTime;
  if (Math.abs(remaining) < 60) remainingTime = `${Math.abs(Math.floor(remaining))} min`;
  if (Math.abs(remaining) < 1440 && Math.abs(remaining) > 60) remainingTime = `${Math.abs((remaining / 60).toFixed(1))} hrs`;
  if (Math.abs(remaining) >= 1440) remainingTime = `${Math.abs((remaining / 1440).toFixed(1))} days`;

    if (remaining <= 0) return "🔴 Expired \n> " + remainingTime + " ago";
  const warningThreshold = resolution_time * 0.15;
  if (remaining <= warningThreshold) return "🟡 Near Expiry\n< " + remainingTime;
  return "🟢 On Time\n< " + remainingTime;
}
