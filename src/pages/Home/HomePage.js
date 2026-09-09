class HomePage extends HTMLElement {
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
        @import url("${new URL("../../index.css", import.meta.url)}")
        @import url("${new URL("./HomePage.css", import.meta.url)}")
      </style>

      <div class="home">
        <p style="font-size: 34px">This will be like a desktop on a computer.</p>
      </div>
    `
  }
}

customElements.define("home-page", HomePage);
