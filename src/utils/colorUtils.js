/**
 * Lighten a hex color by a given percentage
 * @param {string} hex - Hex color code (e.g., "#4CAF50")
 * @param {number} percent - Percentage to lighten (default: 10)
 * @returns {string} Lightened hex color
 */
export const lightenColor = (hex, percent = 10) => {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
  const B = Math.min(255, (num & 0x0000ff) + amt);
  return "#" + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
};

/**
 * Get background color based on timer state
 * @param {boolean} isTimerActive - Whether the timer is active
 * @param {boolean} isWorkPhase - Whether it's a work phase
 * @param {object} config - Timer configuration object
 * @returns {string} Background color
 */
export const getBackgroundColor = (isTimerActive, isWorkPhase, config) => {
  const idleColor = config.idle_color || "#FFD700";
  const workColor = config.work_color || "#4CAF50";
  const restColor = config.rest_color || "#FF6B6B";

  if (!isTimerActive) {
    return lightenColor(idleColor);
  }
  return isWorkPhase ? lightenColor(workColor) : lightenColor(restColor);
};

/**
 * Get progress bar color based on timer state
 * @param {boolean} isTimerActive - Whether the timer is active
 * @param {boolean} isWorkPhase - Whether it's a work phase
 * @param {boolean} isFlashing - Whether the timer is flashing
 * @param {object} config - Timer configuration object
 * @returns {string} Progress color
 */
export const getProgressColor = (isTimerActive, isWorkPhase, isFlashing, config) => {
  const idleColor = config.idle_color || "#FFD700";
  const workColor = config.work_color || "#4CAF50";
  const restColor = config.rest_color || "#FF6B6B";

  // Flash progress bar to lighter color during countdown
  if (isFlashing) {
    if (!isTimerActive) {
      return lightenColor(idleColor);
    }
    return isWorkPhase ? lightenColor(workColor) : lightenColor(restColor);
  }

  if (!isTimerActive) {
    return idleColor;
  }
  return isWorkPhase ? workColor : restColor;
};

/**
 * Get text color based on timer state
 * @param {boolean} isTimerActive - Whether the timer is active
 * @param {boolean} isWorkPhase - Whether it's a work phase
 * @returns {string} Text color
 */
export const getTextColor = (isTimerActive, isWorkPhase) => {
  if (!isTimerActive) {
    return "#000";
  }
  return isWorkPhase ? "#fff" : "#fff";
};
