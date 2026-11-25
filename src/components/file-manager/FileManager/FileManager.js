import "../../window/WindowContainer/WindowContainer.js";
import "../../window/WindowContent/WindowContent.js";
import "../../window/TitleBar/TitleBar.js";
import "../FileIcon/FileIcon.js";
import { getWindowWidth } from "../../../utils/viewport/getWindowWidth.js";
import { fetchFiles } from "../../../apis/fetchFiles.js";

class FileManager extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.files = [];
  }

  async connectedCallback() {
    this.files = await fetchFiles();
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
        start-x="${getWindowWidth() > 1536 ? 350 : 240}" 
        start-y="392"
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
              <p>
                ${this.files.length} 
                ${this.files.length > 1 ? "items" : "item"}
              </p>
              <p>232K in disk</p>
              <p>167k available</p>
            </div>
          </div>

          <div class="files">
            ${this.files.map((file) => 
              `<file-icon 
                filename="${file.name}"
                content="${file.content}"
              ></file-icon>`
            ).join("")}
          </div>

        </window-content>
      </window-container>        
    `
  }
}

customElements.define("file-manager", FileManager);
