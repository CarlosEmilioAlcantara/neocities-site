class WidgetContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../../index.css", import.meta.url)}");
        @import url("${new URL("./WidgetContent.css", import.meta.url)}");
      </style>

      <div class="widget-content">
        <slot name="music-player" id="music-player"></slot>
      </div>
    `
  }
}

customElements.define("widget-content", WidgetContent);
