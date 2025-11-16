export function calculateRemainingTime(remaining) {
  if (Math.abs(remaining) <= 60) return `${Math.abs(Math.floor(remaining))} min`;
  if (Math.abs(remaining) < 1440 && Math.abs(remaining) > 60) return `${Math.abs((remaining / 60).toFixed(1))} hrs`;
  if (Math.abs(remaining) >= 1440) return `${Math.abs((remaining / 1440).toFixed(1))} days`;
}

export function calculateResolutionDays(created_on, closed_on) {
  console.log(`Calculating Resolution Days: created_on: ${created_on}, closed_on: ${closed_on}`);
  if (!created_on || !closed_on) {
    return undefined;
  }
  const created = new Date(created_on);
  const closed = new Date(closed_on);
  return Math.round((closed - created) / (1000 * 60 * 60 * 24));
}

export function calculateSlaResponse(created_on, assigned_on, response_time) {
  console.log(`Calculating SLA Response: created_on: ${created_on}, assigned_on: ${assigned_on}, response_time: ${response_time}`);
    if (!created_on || !assigned_on || !response_time) {
    return undefined;
  }
  const created = new Date(created_on);
  const assigned = new Date(assigned_on);
  const diffMin = (assigned - created) / (1000 * 60);
  return {
    isCompliant: diffMin <= response_time ? "✓ Met" : "✗ Not Met",
    actualTime: calculateRemainingTime(diffMin),
  };
}

export function calculateSlaResolution(created_on, closed_on, resolution_time) {
  console.log(`Calculating SLA Resolution: created_on: ${created_on}, closed_on: ${closed_on}, resolution_time: ${resolution_time}`);
  if ( !created_on || !closed_on || !resolution_time) {
    return undefined;
  }
  const created = new Date(created_on);
  const closed = new Date(closed_on);
  const diffMin = (closed - created) / (1000 * 60);
  return {
    isCompliant: diffMin <= resolution_time ? "✓ Met" : "✗ Not Met",
    actualTime: calculateRemainingTime(diffMin),
  };
}

export function getSlaStatusIcon(created_on, resolution_time) {
  if (!resolution_time) return "­­⚪ N/A";

  const now = new Date();
  const created = new Date(created_on);
  const elapsed = (now - created) / (1000 * 60);
  const remaining = resolution_time - elapsed;

  let remainingTime = calculateRemainingTime(remaining);
  
  if (remaining <= 0) return "🔴 Expired \n> " + remainingTime + " ago";
  const warningThreshold = resolution_time * 0.15;
  if (remaining <= warningThreshold) return "🟡 Near Expiry\n< " + remainingTime;
  return "🟢 On Time\n< " + remainingTime;
}
