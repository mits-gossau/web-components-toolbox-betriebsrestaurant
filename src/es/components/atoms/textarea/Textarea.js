// @ts-check
import { Shadow } from '../../web-components-toolbox/src/es/components/prototypes/Shadow.js'

/**
 * Arrow is an icon
 * Example at: /src/es/components/pages/Home.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Arrow
 * @type {CustomElementConstructor}
 * @attribute {
 *  
 * }
 * @css {
 * }
 */
export default class Textarea extends Shadow() {
  constructor (...args) {
    super(...args)

    this.keyUpListener = event => {
        if (this.textfield.hasAttribute('data-maxlength')){
            var max = Number(this.textfield.getAttribute('data-maxlength'))
            var value = this.textfield.value.length
            this.counter.innerHTML = this.counter.innerHTML.replace('#number', (max - value).toString())
        }
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
    this.hasAttribute('counter') ? this.textfield.addEventListener('keyUp', this.keyUpListener) : ''
  }

  disconnectedCallback () {
    this.hasAttribute('counter') ? this.textfield.removeEventListener('keyUp', this.keyUpListener) : ''
    this.parentNodeShadowRootHost = null
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderCSS () {
    return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML () {
    return !this.svg
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
      this.css = /* css */`
      :host textarea {
        resize: none;
        border-radius: var(--border-radius, 0.5em);
        background-color: transparent;
        box-sizing: border-box;
        border: 1px solid var(--m-gray-400);
        color: var(--color);
        padding: 0.625em;
        font-size: var(--font-size);
        outline: none;
        width: 100%;
      }
      :host textarea:hover {
        border-color: var(--m-gray-600);
      }
      :host textarea:focus {
        border-color: var(--color-secondary);
      }
    `
  }

  renderHTML(){
      if (this.textfield.hasAttribute('maxlength')){
        if (!this.textfield.hasAttribute('data-maxlength')){
            this.textfield.setAttribute('data-maxlength', this.textfield.getAttribute('maxlength'))
        }
        this.textfield.removeAttribute('maxlength')
      }
      if (this.textfield.hasAttribute('data-maxlength-lable')){
        this.counter.innerHTML = this.textfield.getAttribute('data-maxlength-lable')
        if (!this.counter.innerHTML.includes('#number')){
            this.counter.innerHTML += '#number'
        }
      } else {
        this.counter.innerHTML = '#number'
      }
      this.html = this.counter
      this.html = this.style
  }

  get style () {
    return this._style || (this._style = (() => {
      const style = document.createElement('style')
      style.setAttribute('protected', 'true')
      return style
    })())
  }

  get parentNodeShadowRootHost () {
    if (this._parentNodeShadowRootHost) return this._parentNodeShadowRootHost
    const searchShadowRoot = node => node.root || node.shadowRoot ? node : node.parentNode ? searchShadowRoot(node.parentNode) : node.host ? searchShadowRoot(node.host) : node
    return (this._parentNodeShadowRootHost = searchShadowRoot(this.parentNode))
  }

  set parentNodeShadowRootHost (node) {
    this._parentNodeShadowRootHost = node
  }

  get textfield () {
    return this.root.querySelector('textfield')
  }

  get counter (){
      return this._counter || (this._counter = document.createElement('span'))
  }
}
