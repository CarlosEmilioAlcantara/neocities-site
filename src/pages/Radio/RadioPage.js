import "../../components/Player/Player.js";
import "../../components/window/TitleBar/TitleBar.js";
import "../../components/window/WindowContainer/WindowContainer.js";
import "../../components/window/WindowContent/WindowContent.js";

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
        <div class="cabinet-container">
          <div class="cabinet">
            <div class="left-container">
              <div class="left">
                <div class="cassette-info">
                </div>

                <p>eeee</p>

                <div class="cassette-storage">
                </div>
              </div>
            </div>

            <div class="player-container">
              <div class="player-inside">
                <music-player></music-player>
              </div>
            </div>

            <div class="right-container">
              <div class="right">
                <p>eeeeee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

customElements.define("radio-page", RadioPage);
