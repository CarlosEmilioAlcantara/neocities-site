class Window extends HTMLElement {
  static get observedAttributes() {
    return ["start-x", "start-y", "starti-width", "start-height"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.x = 0;
    this.y = 0;
    this.dragging = false;
    this.resizing = false;
    this.contentVisible = true;
  }

  handleClose = () => {
    this.style.display = "none";
  }

  handleMinimize = (e) => {
    this.querySelector("window-content")
      .style.display = `${e.detail.visible ? "block" : "none"}`;

    this.style.height = `${!e.detail.visible ? "fit-content" : ""}`

    this.contentVisible = e.detail.visible;
  };

  handleDragStart = (e) => {
    this.dragging = true;

    this.startX = e.detail.x;
    this.startY = e.detail.y;

    this.startWindowX = this.x;
    this.startWindowY = this.y;

    window.addEventListener("pointermove", this.handleDrag);
    window.addEventListener("pointerup", this.handleDragEnd);
  };

  handleDrag = (e) => {
    if (!this.dragging || this.resizing) return;

    const dx = e.clientX - this.startX;
    const dy = e.clientY - this.startY;

    this.x = this.startWindowX + dx;
    this.y = this.startWindowY + dy;

    this.style.left = `${this.x}px`;
    this.style.top = `${this.y}px`;
  };

  handleDragEnd = () => {
    this.dragging = false;

    window.removeEventListener("pointermove", this.handleDrag);
    window.removeEventListener("pointerup", this.handleDragEnd);
  };

  handleResizeStart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!this.contentVisible) return;

    const rect = this.getBoundingClientRect();

    this.width = rect.width;
    this.height = rect.height;

    this.resizing = true;

    this.resizeDirection = e.currentTarget.dataset.resize;

    this.startX = e.clientX;
    this.startY = e.clientY;

    this.startWindowX = this.x;
    this.startWindowY = this.y;

    this.startWidth = this.width;
    this.startHeight = this.height;

    window.addEventListener("pointermove", this.handleResize);
    window.addEventListener("pointerup", this.handleResizeEnd);
  };

  handleResize = (e) => {
    if (!this.resizing || this.dragging) return;

    const dx = e.clientX - this.startX;
    const dy = e.clientY - this.startY;

    let x = this.startWindowX;
    let y = this.startWindowY;
    let width = this.startWidth;
    let height = this.startHeight;

    if (this.resizeDirection.includes("e")) {
      width = this.startWidth + dx;
    }

    if (this.resizeDirection.includes("w")) {
      width = this.startWidth - dx;
      x = this.startWindowX + dx;
    }

    if (this.resizeDirection.includes("s")) {
      height = this.startHeight + dy;
    }

    if (this.resizeDirection.includes("n")) {
      height = this.startHeight - dy;
      y = this.startWindowY + dy;
    }

    const minWidth = 200;
    const minHeight = 100;

    if (width < minWidth) {
      if (this.resizeDirection.includes("w")) {
        x = this.startWindowX + this.startWidth - minWidth;
      }

      width = minWidth;
    }

    if (height < minHeight) {
      if (this.resizeDirection.includes("n")) {
        y = this.startWindowY + this.startHeight - minHeight;
      }

      height = minHeight;
    }

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.style.left = `${this.x}px`;
    this.style.top = `${this.y}px`;
    this.style.width = `${this.width}px`;
    this.style.height = `${this.height}px`;
  };

  handleResizeEnd = () => {
    this.resizing = false;

    window.removeEventListener("pointermove", this.handleResize);
    window.removeEventListener("pointerup", this.handleResizeEnd);
  };
  
  connectedCallback() {
    this.x = Number(this.getAttribute("start-x")) || 0;
    this.y = Number(this.getAttribute("start-y")) || 0;

    this.width = Number(this.getAttribute("start-width")) || null;
    this.height = Number(this.getAttribute("start-height")) || null;


    this.render();

    this.addEventListener("window-close", this.handleClose);
    this.addEventListener("window-drag", this.handleDragStart);
    this.addEventListener("window-minimize", this.handleMinimize);
  }

  disconnectedCallback() {
    this.removeEventListener("window-close", this.handleClose);
    this.removeEventListener("window-drag", this.handleDragStart);
    this.removeEventListener("window-minimize", this.handleMinimize);

    window.removeEventListener("pointermove", this.handleResize);
    window.removeEventListener("pointerup", this.handleResizeEnd);
    window.removeEventListener("pointermove", this.handleDrag);
    window.removeEventListener("pointerup", this.handleDragEnd);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
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
        @import url("${new URL("../../index.css", import.meta.url)}");
        @import url("${new URL("./css/Window.css", import.meta.url)}");
      </style>

      <div class="window">
        <slot name="title-bar"></slot>
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

    this.shadowRoot
      .querySelectorAll(".resize")
      .forEach((handle) => {
        handle.addEventListener("pointerdown", this.handleResizeStart);
      });
  }
}

customElements.define("window-container", Window);
