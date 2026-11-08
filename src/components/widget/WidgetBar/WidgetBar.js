import { handleDrag } from "./WidgetBarHandlers.js";

class WidgetBar extends HTMLElement {
  static get observedAttributes() {
    return ["title"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.onDrag = (e) => handleDrag(this, e);
  }

  attachEventListeners() {
    this.shadowRoot
      .querySelector(".widget-bar")
      .addEventListener("pointerdown", this.onDrag);
  }

  detachEventListeners() {
    this.removeEventListener("pointerdown", this.onDrag);
  }

  attributeChangedCallback(oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.attachEventListeners();
    }
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  disconnectedCallback() {
    this.attachEventListeners();
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
