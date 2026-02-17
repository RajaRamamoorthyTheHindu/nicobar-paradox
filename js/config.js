/**
 * Application configuration.
 * @module config
 */

/**
 * @typedef {Object} AppConfig
 * @property {string} MAPBOX_TOKEN - Mapbox GL JS access token.
 * @property {string} GA_ID - Google Analytics measurement ID.
 */

// Application configuration
// In production, these values should be injected via environment variables
/** @type {AppConfig} */
export const CONFIG = {
  MAPBOX_TOKEN: 'pk.eyJ1IjoicmFqYXJhbWFtb29ydGh5IiwiYSI6ImNtNzMxZm16NDBmbWoyb3B2NTVtMGNqaGYifQ.2sGBMZyL7BnNf8SxRxYS8w',
  GA_ID: 'G-MSXP46EF6N'
};
