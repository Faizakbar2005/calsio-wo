<template>
  <Transition name="toast">
    <div v-if="visible" class="toast">
      <div class="toast-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      </div>
      <div class="toast-body">
        <span class="toast-title">Sesi tersimpan!</span>
        <span class="toast-sub">{{ calories }} kcal · {{ exerciseName }}</span>
      </div>
      <button class="toast-dashboard" @click="$emit('go-dashboard')">
        Buka Dashboard
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
      <button class="toast-close" @click="$emit('close')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <!-- Progress bar auto-dismiss -->
      <div class="toast-progress" :style="{ animationDuration: duration + 'ms' }"></div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'WorkoutToast',
  emits: ['close', 'go-dashboard'],
  props: {
    visible     : { type: Boolean, default: false },
    calories    : { type: Number,  default: 0 },
    exerciseName: { type: String,  default: '' },
    duration    : { type: Number,  default: 5000 }, // ms before auto-dismiss
  },

  watch: {
    visible(val) {
      if (val) {
        setTimeout(() => this.$emit('close'), this.duration)
      }
    },
  },
}
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 12px;
  background: #0d1117;
  border: 1px solid rgba(34, 197, 94, 0.35);
  border-radius: 14px;
  padding: 14px 16px;
  min-width: 340px;
  max-width: 420px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(34,197,94,0.1);
  overflow: hidden;
}

.toast-icon {
  width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.25);
  display: flex; align-items: center; justify-content: center;
  color: #22c55e;
}

.toast-body {
  display: flex; flex-direction: column; gap: 2px; flex: 1;
}
.toast-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.95rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.06em;
  color: #22c55e;
}
.toast-sub {
  font-size: 0.72rem; color: rgba(255,255,255,0.4);
}

.toast-dashboard {
  display: flex; align-items: center; gap: 6px; flex-shrink: 0;
  padding: 7px 12px;
  background: rgba(234,179,8,0.1);
  border: 1px solid rgba(234,179,8,0.3);
  border-radius: 8px;
  color: #eab308;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.75rem; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.06em;
  cursor: pointer; transition: all 0.2s;
  white-space: nowrap;
}
.toast-dashboard:hover {
  background: rgba(234,179,8,0.2);
  border-color: rgba(234,179,8,0.5);
}

.toast-close {
  width: 26px; height: 26px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: transparent; border: none;
  color: rgba(255,255,255,0.2);
  border-radius: 6px; cursor: pointer; transition: all 0.15s;
}
.toast-close:hover { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.5); }

/* Auto-dismiss progress bar */
.toast-progress {
  position: absolute; bottom: 0; left: 0;
  height: 2px;
  background: linear-gradient(90deg, #22c55e, rgba(34,197,94,0.3));
  border-radius: 0 0 14px 14px;
  animation: shrink linear forwards;
}
@keyframes shrink {
  from { width: 100%; }
  to   { width: 0%; }
}

/* Transition */
.toast-enter-active { animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-leave-active { animation: slideDown 0.25s ease forwards; }
@keyframes slideUp   { from { opacity: 0; transform: translateY(16px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes slideDown { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(12px); } }

@media (max-width: 480px) {
  .toast { bottom: 16px; right: 16px; left: 16px; min-width: unset; }
}
</style>