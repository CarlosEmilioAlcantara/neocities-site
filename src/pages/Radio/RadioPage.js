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
      </style>

      <div>
        <window-container
          start-x="50" 
          start-y="50"
          start-width="762" 
          widget
        >
          <title-bar 
            title="Music Player" 
            slot="title-bar" 
            music-player
            widget
          >
          </title-bar>

          <window-content slot="window-content" widget>
            <music-player slot="music-player"></music-player>
          </window-content>
        </window-container>
      </div>
    `
  }
}

customElements.define("radio-page", RadioPage);
