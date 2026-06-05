// utils/dashboardConstants.js
// Konstanta bersama untuk dashboard — import di dashboard.vue dan komponen turunannya

export const MUSCLE_TO_WORKOUT_TYPE = {
  'Dada'    : 'Strength',
  'Punggung': 'Strength',
  'Kaki'    : 'Strength',
  'Bokong'  : 'Strength',
  'Deltoid' : 'Strength',
  'Bisep'   : 'Strength',
  'Trisep'  : 'Strength',
  'Perut'   : 'HIIT',
  'Kardio'  : 'Cardio',
}

export const MUSCLE_COLORS = {
  'Dada'    : '#eab308',
  'Kaki'    : '#3b82f6',
  'Punggung': '#22c55e',
  'Kardio'  : '#14b8a6',
  'Bisep'   : '#a855f7',
  'Trisep'  : '#f97316',
  'Deltoid' : '#ec4899',
  'Perut'   : '#06b6d4',
  'Bokong'  : '#84cc16',
}

export const ICONS = {
  fire: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c0 0-5 4.5-5 9a5 5 0 0 0 10 0c0-2.5-1.5-4.5-2.5-6 0 2-1 3.5-2.5 4.5C13 8 12 5 12 2z"/></svg>`,
  clock: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 3h6"/><path d="M12 3v2"/></svg>`,
  repeat: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`,
  target: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  day: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  week: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  month: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></svg>`,
}