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
    if (this.shouldRenderHTML()) {
      this.renderHTML().then(() => {
        if (this.settingsLink) this.settingsLink.addEventListener('click', this.settingsLinkListener)
      })
    } else if (this.settingsLink) this.settingsLink.addEventListener('click', this.settingsLinkListener)
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

  /**
   * evaluates if a render is necessary
   */
  shouldRenderHTML() {
    return true;
  }

  /**
   * Render HTML
   * OneTrust loads its settings and we check whether we should display the link or not.
   * The link opens the cookie settings in a modal window
   */
  async renderHTML() {
    const span = document.createElement('span')
    span.classList.add('ot-sdk-show-settings')
    span.setAttribute('style', 'display: none !important;')
    document.body.appendChild(span)

    // only render link if OneTrust sets it to ‘visible’
    if (self.getComputedStyle(span).getPropertyValue('visibility') === 'visible') {
      this.html = `<a class="ot-sdk-show-settings">${this.linkText}</a>`
    }

    // cleanup
    span.remove()
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
