class TitleBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.contentVisible = true;
  }
  
  static get observedAttributes() {
    return ['title'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  handleClose = () => {
    this.dispatchEvent(
      new CustomEvent("window-close", {
        bubbles: true,
        composed: true,
      })
    );
  };

  handleDrag = (e) => {
    if (e.button !== 0) return;
    
    this.dispatchEvent(
      new CustomEvent("window-drag", {
        bubbles: true,
        composed: true,
        detail: {
          x: e.clientX,
          y: e.clientY,
        },
      })
    );
  };
    
  handleMinimize = () => {
    this.dispatchEvent(
      new CustomEvent("window-minimize", {
        bubbles: true,
        composed: true,
        detail: {
          visible: !this.contentVisible,
        },
      })
    );

    this.contentVisible = !this.contentVisible;
  };

  connectedCallback() {
    this.render();

    this.shadowRoot
      .querySelector(".close-button")
      .addEventListener("click", this.handleClose);

    this.shadowRoot
      .querySelector(".drag-button")
      .addEventListener("pointerdown", this.handleDrag);

    this.shadowRoot
      .querySelector(".minimize-button")
      .addEventListener("click", this.handleMinimize);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClose);
    this.removeEventListener("pointerdown", this.handleDrag);
    this.removeEventListener("click", this.handleMinimize);
  }

  render() {
    const title = this.getAttribute("title");

    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../index.css", import.meta.url)}");
        @import url("${new URL("./css/TitleBar.css", import.meta.url)}");
      </style>


      <div class="title-bar">
        <div class="buttons">
          <button class="button close-button">
          </button>

          <button class="button drag-button">
          </button>

          <button class="button minimize-button">
          </button>
        </div>

        ${title ? `<p class="title">${title}</p>` : ""}
      </div>
    `;
  }
}

customElements.define("title-bar", TitleBar);
