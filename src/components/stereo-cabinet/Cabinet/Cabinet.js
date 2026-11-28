import "../../apps/Player/Player.js";
import "../Cassette/Cassette.js";
import { 
  handlePlaylistSelected, 
  handleNavigateToHome,
} from "./CabinetHandlers.js";
import { playlists } from "../../../stores/playlists.js";
import { 
  checkItemsLength 
} from "../../../utils/pagination/checkItemsLength.js";
import { hideItems } from "../../../utils/pagination/hideItems.js";
import { paginate } from "../../../utils/pagination/paginate.js";

class Cabinet extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.items = playlists;
    this.offset = 0;
    this.limit = 3;
    this.name = "";
    this.playlistIndex = 0;

    this.onCassettesFlipUp = () => {
      paginate({component: this, prev: true, cassettes: true});
      checkItemsLength({component: this, cassettes: true});
    }
    this.onCassettesFlipDown = () => {
      paginate({component: this, cassettes: true});
      checkItemsLength({component: this, cassettes: true});
    }
    this.onPlaylistSelected = (e) => handlePlaylistSelected(this, e);
    this.onNavigateToHome = () => handleNavigateToHome(this);
  }

  attachEventListeners() {
    this.shadowRoot
      .querySelector("#storage-up")
      .addEventListener("click", this.onCassettesFlipUp);
    this.shadowRoot
      .querySelector("#storage-down")
      .addEventListener("click", this.onCassettesFlipDown);

    this.addEventListener("playlist-selected", this.onPlaylistSelected);

    this.shadowRoot
      .querySelector("#back")
      .addEventListener("click", this.onNavigateToHome);
  }

  detachEventListeners() {
    this.shadowRoot.removeEventListener("click", this.onCassettesFlipUp);
    this.shadowRoot.removeEventListener("click", this.onCassettesFlipDown);
    this.removeEventListener("playlist-selected", this.onPlaylistSelected);
    this.shadowRoot.removeEventListener("click", this.onNavigateToHome);
  }

  attributeChangedCallback(oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      hideItems({component: this, cassettes: true});
      checkItemsLength({component: this, cassettes: true});
      this.attachEventListeners();
    }
  }

  connectedCallback() {
    this.render();
    hideItems({component: this, cassettes: true});
    checkItemsLength({component: this, cassettes: true});
    this.attachEventListeners();
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
                    <p class="info-paragraph">${this.items[0].info}</p>
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
                    ${this.items.map((playlist, index) => `
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
              <music-player radio></music-player>

              <div class="instructions-buttons-container">
                <div class="instructions-buttons">
                  <div class="instructions-buttons-inside">
                    <div class="info">
                      <p>1. The top left has a brief description of the playlist</p>
                      <p>2. Select a cassette at the bottom left to play</p>
                      <p>3. Playback controls are above on the cassette player</p>
                      <div class="line"></div>
                      <div class="line"></div>
                      <div class="line"></div>
                      <div class="line"></div>
                      <div class="line"></div>
                      <div class="line"></div>
                      <div class="line"></div>
                    </div>

                    <div id="back">
                      <button>HOME</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="right-container">
              <div class="right">
                <p>This is supposed to be a chatbox :^)</p>
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
