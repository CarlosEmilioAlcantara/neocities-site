class WidgetBar extends HTMLElement {
  static get observedAttributes() {
    return ["title"];
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
  }

  render() {
    const title = this.getAttribute("title");

    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../../index.css", import.meta.url)}");
        @import url("${new URL("./WidgetBar.css", import.meta.url)}");
      </style>

      <div class="widget-bar">
        <label>${title}</label>
      </div>
    `
  }
}

customElements.define("widget-bar", WidgetBar);
