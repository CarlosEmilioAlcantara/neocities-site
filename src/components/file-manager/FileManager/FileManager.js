import "../../window/WindowContainer/WindowContainer.js";
import "../../window/WindowContent/WindowContent.js";
import "../../window/TitleBar/TitleBar.js";
import { getWindowWidth } from "../../../utils/viewport/getWindowWidth.js";

class FileManager extends HTMLElement {
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
        @import url("${new URL("./FileManager.css", import.meta.url)}");
      </style>

      <window-container
        id="file-manager"
        start-x="${getWindowWidth() > 1536 ? 1180 : 680}" 
        start-y="59"
        start-width="662" 
        start-height="300"
        file-manager
        closed
      >
        <title-bar 
          title="File Manager" 
          slot="title-bar" 
        >
        </title-bar>

        <window-content slot="window-content" file-manager>
          <div class="header-container">
            <div class="header">
              <p>5 items</p>
              <p>232K in disk</p>
              <p>167k available</p>
            </div>
          </div>

          <div class="files">
            <div class="file-icon"></div>
            <div class="file-icon"></div>
            <div class="file-icon"></div>
            <div class="file-icon"></div>
            <div class="file-icon"></div>
            <div class="file-icon"></div>
            <div class="file-icon"></div>
          </div>

        </window-content>
      </window-container>        
    `
  }
}

customElements.define("file-manager", FileManager);
