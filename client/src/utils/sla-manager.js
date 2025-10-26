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

export function remainingTime(ticket, sla) {
  const now = new Date();
  const created = new Date(ticket.created_on);
  const elapsed = (now - created) / (1000 * 60);
  const remaining = sla.resolution_time - elapsed;

  if (remaining <= 0) return "SLA expired";
  if (remaining < 60) return `${Math.floor(remaining)} remaining min`;
  if (remaining < 1440) return `${(remaining / 60).toFixed(1)} remaining hrs`;
  return `${(remaining / 1440).toFixed(1)} remaining days`;
}
