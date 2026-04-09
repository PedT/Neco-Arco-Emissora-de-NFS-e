const STATE_KEY = "nfse_auto_state";

function saveState(phase, data) {
  const state = { phase, data, timestamp: Date.now() };
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return null;
    const state = JSON.parse(raw);
    // Expire after 60 seconds in case something went wrong
    if (Date.now() - state.timestamp > 60000) {
      clearState();
      return null;
    }
    return state;
  } catch (e) {
    return null;
  }
}

function clearState() {
  localStorage.removeItem(STATE_KEY);
}
