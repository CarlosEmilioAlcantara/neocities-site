import "./Player.js";
import { getWindowWidth } from "../../utils/viewport/getWindowWidth.js";

class PlayerWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <window-container
        id="cassette-player"
        start-x="${getWindowWidth() > 1536 ? 1180 : 680}" 
        start-y="59"
        start-width="662" 
        widget
        closed
      >
        <title-bar 
          title="Music Player" 
          slot="title-bar" 
          music-player
          widget
        >
        </title-bar>

        <window-content slot="window-content" widget>
          <music-player slot="music-player" playing></music-player>
        </window-content>
      </window-container>        
    `;
  }
}

customElements.define("player-widget", PlayerWidget)