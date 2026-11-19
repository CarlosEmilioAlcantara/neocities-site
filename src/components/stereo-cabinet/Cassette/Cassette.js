import { handlePlaylistSelect } from "./CassetteHandlers.js";

class Cassette extends HTMLElement {
  static get observedAttributes() {
    return ["name", "info", "playlist-index"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.onPlaylistSelect = () => handlePlaylistSelect(this);
  }

  attributeChangedCallback(oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.shadowRoot
        .querySelector(".cassette-container")
        .addEventListener("click", this.onPlaylistSelect);
    }
  }

  connectedCallback() {
    this.render();
    this.shadowRoot
      .querySelector(".cassette-container")
      .addEventListener("click", this.onPlaylistSelect);
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener("click", this.onPlaylistSelect);
  }

  render() {
    const name = this.getAttribute("name");

    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../../index.css", import.meta.url)}");
        @import url("${new URL("./Cassette.css", import.meta.url)}");
      </style>

      <div class="cassette-container">
        <div class="cassette">
          <div class="cassette-label">
            <p>${name}</p>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("playlist-cassette", Cassette);