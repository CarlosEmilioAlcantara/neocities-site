import "../../components/stereo-cabinet/Cabinet/Cabinet.js";

class RadioPage extends HTMLElement {
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
        @import url("${new URL("../../index.css", import.meta.url)}");
        @import url("${new URL("./RadioPage.css", import.meta.url)}");
      </style>

      <div class="radio">
        <stereo-cabinet></stereo-cabinet>
      </div>
    `
  }
}

customElements.define("radio-page", RadioPage);