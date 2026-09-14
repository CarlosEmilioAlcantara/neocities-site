class WindowContent extends HTMLElement {
  static get observedAttributes() {
    return ["center", "right"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
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
    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../../index.css", import.meta.url)}");
        @import url("${new URL("./WindowContent.css", import.meta.url)}");
      </style>

      <div class="window-content">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("window-content", WindowContent);
