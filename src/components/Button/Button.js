class Button extends HTMLElement {
  static get observedAttributes() {
    return ["icon", "label", "action", "large", "small", "blog"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
    
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();

    this.shadowRoot
      .querySelector(".button")
      .addEventListener("click", (e) => {
        if (this.action) this.action(e);
      });
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
        ${icon ? `<img src=${icon} />` : ""}
        ${label ? `<span>${label}</span>` : ""}
      </button>
    `
  }
}

customElements.define("ui-button", Button);
