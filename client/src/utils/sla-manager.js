export function calculateRemainingTime(remaining, t) {
  const minutes = Math.abs(Math.floor(remaining));
  const hours = Math.abs((remaining / 60).toFixed(1));
  const days = Math.abs((remaining / 1440).toFixed(1));
  
  if (Math.abs(remaining) <= 60) return `${minutes} ${t ? t('time.minutes', { count: minutes }) : 'min'}`;
  if (Math.abs(remaining) < 1440 && Math.abs(remaining) > 60) return `${hours} ${t ? t('time.hours', { count: parseFloat(hours) }) : 'hrs'}`;
  if (Math.abs(remaining) >= 1440) return `${days} ${t ? t('time.days', { count: parseFloat(days) }) : 'days'}`;
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

export function calculateSlaResponse(created_on, assigned_on, response_time, t) {
  console.log(`Calculating SLA Response: created_on: ${created_on}, assigned_on: ${assigned_on}, response_time: ${response_time}`);
    if (!created_on || !assigned_on || !response_time) {
    return undefined;
  }
  const created = new Date(created_on);
  const assigned = new Date(assigned_on);
  const diffMin = (assigned - created) / (1000 * 60);
  return {
    isCompliant: diffMin <= response_time ? (t ? t('sla.met') : "✓ Met") : (t ? t('sla.notMet') : "✗ Not Met"),
    actualTime: calculateRemainingTime(diffMin, t),
  };
}

export function calculateSlaResolution(created_on, closed_on, resolution_time, t) {
  console.log(`Calculating SLA Resolution: created_on: ${created_on}, closed_on: ${closed_on}, resolution_time: ${resolution_time}`);
  if ( !created_on || !closed_on || !resolution_time) {
    return undefined;
  }
  const created = new Date(created_on);
  const closed = new Date(closed_on);
  const diffMin = (closed - created) / (1000 * 60);
  return {
    isCompliant: diffMin <= resolution_time ? (t ? t('sla.met') : "✓ Met") : (t ? t('sla.notMet') : "✗ Not Met"),
    actualTime: calculateRemainingTime(diffMin, t),
  };
}

export function getSlaStatusIcon(created_on, resolution_time, t) {
  if (!resolution_time) return t ? `${t('sla.na')} ⚪` : "⚪ N/A";

  const now = new Date();
  const created = new Date(created_on);
  const elapsed = (now - created) / (1000 * 60);
  const remaining = resolution_time - elapsed;

  let remainingTime = calculateRemainingTime(remaining, t);
  
  if (remaining <= 0) return t ? `🔴 ${t('sla.expired')}\n> ${remainingTime} ${t('time.ago')}` : `🔴 Expired \n> ${remainingTime} ago`;
  const warningThreshold = resolution_time * 0.15;
  if (remaining <= warningThreshold) return t ? `🟡 ${t('sla.nearExpiry')}\n< ${remainingTime}` : `🟡 Near Expiry\n< ${remainingTime}`;
  return t ? `🟢 ${t('sla.onTime')}\n< ${remainingTime}` : `🟢 On Time\n< ${remainingTime}`;
}
