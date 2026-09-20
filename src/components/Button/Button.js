class Button extends HTMLElement {
  static get observedAttributes() {
    return [
      "icon", 
      "label", 
      "action", 
      "large", 
      "small", 
      "blog", 
      "page-control",
      "page-control-right",
      "page-control-left",
      "disabled",
    ];
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
        e.preventDefault();
        if (this.action) this.action(e);
      });
  }

  render() {
    const label = this.getAttribute("label");
    const icon = this.getAttribute("icon");
    const pageControl = this.hasAttribute("page-control");

    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../index.css", import.meta.url)}");
        @import url("${new URL("./Button.css", import.meta.url)}");
      </style>

      <button class="button">
        ${icon ? `<img src=${icon} />` : ""}
        ${pageControl ? `<div class="arrow"></div>` : ""}
        ${label ? `<span>${label}</span>` : ""}
      </button>
    `
  }
}

customElements.define("ui-button", Button);
