class Button extends HTMLElement {
  static get observedAttributes() {
    return ["icon", "label", "action", "large", "small"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();

    this.shadowRoot
      .querySelector(".button")
      .addEventListener("click", (e) => {
        if (this.action) this.action(e);
      });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const label = this.getAttribute("label");
    const icon = this.getAttribute("icon");

    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../index.css", import.meta.url)}");
        @import url("${new URL("./Button.css", import.meta.url)}");
      </style>

      <button class="button">
        ${icon && `<img src=${icon} />`}
        ${label && `<span>${label}</span>`}
      </button>
    `
  }
}

customElements.define("ui-button", Button);
