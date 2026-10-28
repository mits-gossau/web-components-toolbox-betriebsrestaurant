// @ts-check
import { Shadow } from '../../web-components-toolbox/src/es/components/prototypes/Shadow.js'

/* global window */
/* global self */

/**
* @export
* @class OneTrust
* @type {CustomElementConstructor}
*/
export default class OneTrust extends Shadow() {

  /**
   * @param {any} args
   */
  constructor(options = {}, ...args) {
    super({ importMetaUrl: import.meta.url, mode: 'false', tabindex: 'no-tabindex', ...options }, ...args)
  }

  connectedCallback() {
        if (this.settingsLink) this.settingsLink.addEventListener('click', this.settingsLinkListener)
  }

  disconnectedCallback() {
    if (this.settingsLink) this.settingsLink.removeEventListener('click', this.settingsLinkListener)
  }

  settingsLinkListener = () => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.OneTrust) {
      try {
        // @ts-ignore
        window.OneTrust.ToggleInfoDisplay()
      } catch (err) {
        console.error('Failed to open Info Display:', err)
      }
    }
  }

  get id() {
    return this.getAttribute('id')
  }

  get settingsLink() {
    return this.root.querySelector('a')
  }

  get linkText() {
    return this.getAttribute('link-text') || 'Cookie Settings'
  }
}
