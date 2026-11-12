import { 
  handleClose, 
  handleDrag, 
  handleMinimize,
} from "./TitleBarHandlers.js";

class TitleBar extends HTMLElement {
  static get observedAttributes() {
    return ["title", "widget"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.contentVisible = true;
    this.widget = false;

    this.onClose = () => handleClose(this);
    this.onDrag = (e) => handleDrag(this, e);
    this.onMinimize = () => handleMinimize(this);
  }

  attachEventListeners(widget) {
    if (!widget) {
      this.shadowRoot
        .querySelector(".close-button")
        .addEventListener("click", this.onClose);
      
      this.shadowRoot
        .querySelector(".drag-button")
        .addEventListener("pointerdown", this.onDrag);
      
      this.shadowRoot
        .querySelector(".minimize-button")
        .addEventListener("click", this.onMinimize);
    } else {
      this.shadowRoot
        .querySelector(".widget-bar")
        .addEventListener("pointerdown", this.onDrag);
    }
  }

  detachEventListeners(widget) {
    if (!widget) {
      this.removeEventListener("click", this.onClose);
      this.removeEventListener("pointerdown", this.onDrag);
      this.removeEventListener("click", this.onMinimize);
    } else {
      this.removeEventListener("pointerdown", this.onDrag);
    }
  }
  
  attributeChangedCallback(oldValue, newValue) {
    if (oldValue !== newValue) {
      this.widget = this.hasAttribute("widget");
      this.render();

      this.attachEventListeners(this.widget);
    }
  }

  connectedCallback() {
    this.widget = this.hasAttribute("widget");
    this.render();

    this.attachEventListeners(this.widget);
  }

  disconnectedCallback() {
    this.attachEventListeners(this.widget);
  }

  render() {
    const title = this.getAttribute("title");
    this.widget = this.hasAttribute("widget");

    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../../index.css", import.meta.url)}");
        @import url("${new URL("./TitleBar.css", import.meta.url)}");
      </style>

      ${!this.widget ? `
        <div class="title-bar">
          <div class="buttons">
            <button tabindex="-1" class="button close-button">
            </button>

            <button tabindex="-1" class="button drag-button">
            </button>

            <button tabindex="-1" class="button minimize-button">
            </button>
          </div>

          ${title ? `<p class="title">${title}</p>` : ""}
        </div>
      ` : `
        <div class="widget-bar">
          <label>${title}</label>
        </div>
      `}
    `;
  }
}

customElements.define("title-bar", TitleBar);
