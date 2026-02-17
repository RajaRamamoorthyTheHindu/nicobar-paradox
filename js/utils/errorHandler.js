/**
 * Centralized error handling utility.
 * Provides consistent error logging, user notification, and fallback UI.
 *
 * @module errorHandler
 */

/**
 * Log an error with contextual information.
 * @param {string} component - Name of the component where the error occurred.
 * @param {Error|string} error - The error object or message.
 */
export function logError(component, error) {
  console.error(`[${component}] Error:`, error instanceof Error ? error.message : error);
}

/**
 * Render a fallback UI element inside a container when a component fails to load.
 * @param {HTMLElement} container - The DOM element to render the fallback into.
 * @param {string} componentName - Human-readable name of the failed component.
 * @param {string} [message] - Optional custom error message.
 */
export function renderFallback(container, componentName, message) {
  if (!container) return;
  const fallback = document.createElement('div');
  fallback.className = 'component-error-fallback';
  fallback.setAttribute('role', 'alert');
  fallback.innerHTML = `
    <div class="error-fallback-content">
      <h3>Unable to load ${componentName}</h3>
      <p>${message || 'This section requires an external resource that could not be loaded. Please check your internet connection and refresh the page.'}</p>
      <button class="btn btn-primary error-retry-btn" onclick="location.reload()">
        Retry
      </button>
    </div>
  `;
  container.appendChild(fallback);
}

/**
 * Check if a CDN-provided global is available.
 * @param {string} globalName - The name of the global variable (e.g., 'Phaser', 'mapboxgl').
 * @returns {boolean} True if the global is defined.
 */
export function isCDNAvailable(globalName) {
  return typeof window[globalName] !== 'undefined';
}
