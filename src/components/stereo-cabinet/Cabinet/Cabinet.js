import "../../Player/Player.js";
import "../Cassette/Cassette.js";
import { 
  hideCassettes, 
  checkPlaylistsLength, 
  handleCassettesFlip,
  handlePlaylistSelected,
} from "./CabinetHandlers.js";
import { playlists } from "../../../stores/playlists.js";

class Cabinet extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.playlists = playlists;
    this.offset = 0;
    this.limit = 3;
    this.name = "";
    this.playlistIndex = 0;

    this.onCassettesFlipUp = () => handleCassettesFlip(this, true);
    this.onCassettesFlipDown = () => handleCassettesFlip(this);
    this.onPlaylistSelected = (e) => handlePlaylistSelected(this, e);
  }

  attachEventListeners() {
    this.shadowRoot
      .querySelector("#storage-up")
      .addEventListener("click", this.onCassettesFlipUp);
    this.shadowRoot
      .querySelector("#storage-down")
      .addEventListener("click", this.onCassettesFlipDown);

    this.addEventListener("playlist-selected", this.onPlaylistSelected);
  }

  detachEventListeners() {
    this.shadowRoot.removeEventListener("click", this.onCassettesFlipUp);
    this.shadowRoot.removeEventListener("click", this.onCassettesFlipDown);
    this.removeEventListener("playlist-selected", this.onPlaylistSelected);
  }

  attributeChangedCallback(oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.attachEventListeners();
      hideCassettes(this);
      checkPlaylistsLength(this);
    }
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
    hideCassettes(this);
    checkPlaylistsLength(this);
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
                    <p class="info-paragraph">${this.playlists[0].info}</p>
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

                  <div 
                    id="storage-down" 
                    class="cassette-storage-button"
                  >
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
