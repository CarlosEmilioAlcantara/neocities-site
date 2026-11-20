import "../../Player/Player.js";
import "../Cassette/Cassette.js";
import { handleCassettesFlip } from "./CabinetHandlers.js";
import { playlists } from "../../../stores/playlists.js";

class Cabinet extends HTMLElement {
  static get observedAttributes() {
    return ["name", "info", "playlist-index"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.name = "";
    this.info = "";
    this.playlistIndex = 0;
    this.cassetteStorageIndex = 2;

    this.onCassettesFlipUp = () => handleCassettesFlip(
      this, 
      this.cassetteStorageIndex, 
      true
    );
    this.onCassettesFlipDown = () => handleCassettesFlip(
      this, 
      this.cassetteStorageIndex
    );
  }

  getPlaylist() {
    this.name = this.getAttribute("name") || playlists[0].name;
    this.info = this.getAttribute("info") || playlists[0].info;
    this.playlistIndex = Number(this.getAttribute("playlist-index")) || 0;
  }

  attachEventListeners() {
    this.shadowRoot
      .querySelector("#storage-up")
      .addEventListener("click", this.onCassettesFlipUp);
    this.shadowRoot
      .querySelector("#storage-down")
      .addEventListener("click", this.onCassettesFlipDown);
  }

  detachEventListeners() {
    this.shadowRoot.removeEventListener("click", this.onCassettesFlipUp);
    this.shadowRoot.removeEventListener("click", this.onCassettesFlipDown);
  }

  attributeChangedCallback(oldValue, newValue) {
    if (oldValue !== newValue) {
      this.getPlaylist();
      this.render();
      this.attachEventListeners();
    }
  }

  connectedCallback() {
    this.getPlaylist();
    this.render();
    this.attachEventListeners();
    console.log(playlists.length);
  }

  disconnectedCallback() {
    this.detachEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../../index.css", import.meta.url)}");
        @import url("${new URL("./Cabinet.css", import.meta.url)}");
      </style>

      <div class="cabinet">
        <div class="cabinet-side"></div>

        <div class="cabinet-middle">
          <div class="cabinet-top-and-bottom">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>

          <div class="cabinet-contents">
            <div class="left-container">
              <div class="left">
                <div class="cassette-info">
                  <div class="info">
                    <p>${this.info}</p>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                  </div>
                </div>

                <div class="cassette-storage">
                  <div 
                    id="storage-up" 
                    class="cassette-storage-button"
                  >
                    <div class="arrow arrow1"></div>
                    <div class="arrow arrow2"></div>
                  </div>

                  <div class="cassettes">
                    ${playlists.map((playlist, index) => `
                      <playlist-cassette 
                        name="${playlist.name}"
                        info="${playlist.info}"
                        playlist-index="${index}"
                        class="playlist"
                      ></playlist-cassette>
                    `).join("")}
                  </div>

                  <div id="storage-down" class="cassette-storage-button ">
                    <div class="arrow arrow1"></div>
                    <div class="arrow arrow2"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="player-container">
              <music-player></music-player>

              <div class="instructions-buttons-container">
                <div class="instructions-buttons">
                  <div class="instructions-buttons-inside">
                  </div>
                </div>
              </div>
            </div>

            <div class="right-container">
              <div class="right">
                <p>eeeeee</p>
              </div>
            </div>
          </div>

          <div class="cabinet-top-and-bottom">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
        </div>

        <div class="cabinet-side"></div>
      </div>
    `;
  }
}

customElements.define("stereo-cabinet", Cabinet);