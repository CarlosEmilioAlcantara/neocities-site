class WidgetContainer extends HTMLElement {
  static get observedAttributes() {
    return [
      "start-x", 
      "start-y", 
      "start-width", 
      "start-height", 
      "music-player"
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.x = Number(this.getAttribute("start-x"));
    this.y = Number(this.getAttribute("start-y"));
    this.width = Number(this.getAttribute("start-width"));
    this.height = Number(this.getAttribute("start-height"));
    this.render();
  }
  
  render() {
    this.style.position = "absolute";
    this.style.left = `${this.x}px`
    this.style.top = `${this.y}px`
    this.style.width = `${this.width}px`;
    this.style.height = `${this.height}px`;

    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../../index.css", import.meta.url)}");
        @import url("${new URL("./WidgetContainer.css", import.meta.url)}");
      </style>

      <div class="widget">
        <slot name="widget-bar" id="widget-bar"></slot>
        <slot name="widget-content" id="widget-content"></slot>
      </div>
    `
  }
}

customElements.define("widget-container", WidgetContainer);
