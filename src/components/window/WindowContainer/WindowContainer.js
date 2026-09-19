import { 
  isActiveOnStart,
  handleFocus,
  handleUnfocus,
  handleClose,
  handleMinimize,
  handleDragStart,
  handleDrag,
  handleDragEnd,
  handleResizeStart,
  handleResize,
  handleResizeEnd,
} from "./WindowContainerHandlers.js";

class WindowContainer extends HTMLElement {
  static get observedAttributes() {
    return [
      "start-x", 
      "start-y", 
      "start-width", 
      "start-height", 
      "active",
      "closed",
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.x = 0;
    this.y = 0;
    this.contentVisible = true;

    this.onFocus = () => handleFocus(this);
    this.onUnfocus = (e) => handleUnfocus(this, e);
    this.onClose = () => handleClose(this);
    this.onMinimize = (e) => handleMinimize(this, e);
    this.onDragStart = (e) => handleDragStart(this, e);
    this.onDrag = (e) => handleDrag(this, e);
    this.onDragEnd = () => handleDragEnd(this);
    this.onResizeStart = (e) => handleResizeStart(this, e);
    this.onResize = (e) => handleResize(this, e);
    this.onResizeEnd = () => handleResizeEnd(this);
  }

  attachEventListeners() {
    this.addEventListener("window-close", this.onClose);
    this.addEventListener("window-minimize", this.onMinimize);
    this.addEventListener("window-drag", this.onDragStart);

    this.shadowRoot
      .querySelectorAll(".resize")
      .forEach((handle) => {
        handle.addEventListener("pointerdown", this.onResizeStart);
      });

    this.shadowRoot
      .querySelector(".window")
      .addEventListener("pointerdown", this.onFocus);

    window.addEventListener("pointerdown", this.onUnfocus);
  }

  detachEventListeners() {
    this.removeEventListener("window-close", this.onClose);
    this.removeEventListener("window-minimize", this.onMinimize);
    this.removeEventListener("window-drag", this.onDragStart);
    this.removeEventListener("pointerdown", this.onFocus);

    window.removeEventListener("pointermove", this.onResize);
    window.removeEventListener("pointerup", this.onResizeEnd);
    window.removeEventListener("pointermove", this.onDrag);
    window.removeEventListener("pointerup", this.onDragEnd);
    window.removeEventListener("pointerdown", this.onUnfocus);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.attachEventListeners();
    }
  }
  
  connectedCallback() {
    this.x = Number(this.getAttribute("start-x")) || 0;
    this.y = Number(this.getAttribute("start-y")) || 0;

    this.width = Number(this.getAttribute("start-width")) || 200;
    this.height = Number(this.getAttribute("start-height")) || 100;

    this.render();
    isActiveOnStart(this);
    this.attachEventListeners();
  }

  disconnectedCallback() {
    this.detachEventListeners();
  }

  render() {
    this.style.position = "absolute";
    this.style.left = `${this.x}px`;
    this.style.top = `${this.y}px`;

    if (this.width) {
      this.style.width = `${this.width}px`;
    }

    if (this.height) {
      this.style.height = `${this.height}px`;
    }

    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../../index.css", import.meta.url)}");
        @import url("${new URL("./WindowContainer.css", import.meta.url)}");
      </style>

      <div class="window">
        <slot name="title-bar" id="title-bar"></slot>
        <slot name="window-content" class="window-content"></slot>

        <div class="resize resize-n" data-resize="n"></div>
        <div class="resize resize-e" data-resize="e"></div>
        <div class="resize resize-s" data-resize="s"></div>
        <div class="resize resize-w" data-resize="w"></div>

        <div class="resize resize-ne" data-resize="ne"></div>
        <div class="resize resize-se" data-resize="se"></div>
        <div class="resize resize-sw" data-resize="sw"></div>
        <div class="resize resize-nw" data-resize="nw"></div>
      </div>
    `;

  }
}

customElements.define("window-container", WindowContainer);
