// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { logError, renderFallback, isCDNAvailable } from '../errorHandler.js';

describe('errorHandler', () => {
  describe('logError', () => {
    beforeEach(() => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('logs an Error object with the component prefix and error message', () => {
      const error = new Error('Something went wrong');
      logError('Map', error);
      expect(console.error).toHaveBeenCalledWith('[Map] Error:', 'Something went wrong');
    });

    it('logs a string message with the component prefix', () => {
      logError('Gallery', 'Failed to load images');
      expect(console.error).toHaveBeenCalledWith('[Gallery] Error:', 'Failed to load images');
    });

    it('includes the component name in the formatted prefix', () => {
      logError('Timeline', 'timeout');
      const call = console.error.mock.calls[0];
      expect(call[0]).toBe('[Timeline] Error:');
    });
  });

  describe('renderFallback', () => {
    let container;

    beforeEach(() => {
      container = document.createElement('div');
    });

    it('appends a fallback div to the container', () => {
      renderFallback(container, 'Map');
      expect(container.children.length).toBe(1);
      const fallback = container.firstElementChild;
      expect(fallback.tagName).toBe('DIV');
    });

    it('sets the correct class name on the fallback element', () => {
      renderFallback(container, 'Map');
      const fallback = container.firstElementChild;
      expect(fallback.className).toBe('component-error-fallback');
    });

    it('sets role="alert" on the fallback element', () => {
      renderFallback(container, 'Game');
      const fallback = container.firstElementChild;
      expect(fallback.getAttribute('role')).toBe('alert');
    });

    it('displays the component name in an h3 heading', () => {
      renderFallback(container, 'Interactive Map');
      const heading = container.querySelector('h3');
      expect(heading).not.toBeNull();
      expect(heading.textContent).toBe('Unable to load Interactive Map');
    });

    it('displays a default message when no custom message is provided', () => {
      renderFallback(container, 'Map');
      const paragraph = container.querySelector('p');
      expect(paragraph).not.toBeNull();
      expect(paragraph.textContent).toBe(
        'This section requires an external resource that could not be loaded. Please check your internet connection and refresh the page.'
      );
    });

    it('displays a custom message when provided', () => {
      renderFallback(container, 'Map', 'Mapbox failed to load.');
      const paragraph = container.querySelector('p');
      expect(paragraph.textContent).toBe('Mapbox failed to load.');
    });

    it('includes a retry button', () => {
      renderFallback(container, 'Game');
      const button = container.querySelector('button.error-retry-btn');
      expect(button).not.toBeNull();
      expect(button.textContent.trim()).toBe('Retry');
    });

    it('does not throw when container is null', () => {
      expect(() => renderFallback(null, 'Map')).not.toThrow();
    });

    it('does not modify the DOM when container is null', () => {
      const result = renderFallback(null, 'Map');
      expect(result).toBeUndefined();
    });
  });

  describe('isCDNAvailable', () => {
    it('returns true when the global variable is defined', () => {
      window.Phaser = {};
      expect(isCDNAvailable('Phaser')).toBe(true);
      delete window.Phaser;
    });

    it('returns false when the global variable is undefined', () => {
      delete window.SomeUndefinedLib;
      expect(isCDNAvailable('SomeUndefinedLib')).toBe(false);
    });

    it('returns true when the global is a function', () => {
      window.mapboxgl = function () {};
      expect(isCDNAvailable('mapboxgl')).toBe(true);
      delete window.mapboxgl;
    });

    it('returns true when the global is explicitly set to null', () => {
      window.NullLib = null;
      expect(isCDNAvailable('NullLib')).toBe(true);
      delete window.NullLib;
    });
  });
});
