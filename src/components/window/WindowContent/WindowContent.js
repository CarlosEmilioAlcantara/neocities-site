class WindowContent extends HTMLElement {
  static get observedAttributes() {
    return ["center", "right", "widget"];
  }

  attributeChangedCallback(oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  
  connectedCallback() {
    this.render();
  }

  render() {
    const widget = this.hasAttribute("widget");

    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../../index.css", import.meta.url)}");
        @import url("${new URL("./WindowContent.css", import.meta.url)}");
      </style>

      <div class="${widget ? 'widget-content' : 'window-content'}">
        <slot></slot>
        <slot name="music-player" id="music-player"></slot>
      </div>
    `;
  }
}

customElements.define("window-content", WindowContent);
