import "../window/WindowContainer/WindowContainer.js";
import "../window/WindowContent/WindowContent.js";
import "../window/TitleBar/TitleBar.js";
import { changelogs } from "../../public/changelogs.js";

class Changelogs extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback(oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../index.css", import.meta.url)}");
        @import url("${new URL("./Changelog.css", import.meta.url)}");
      </style>

      <window-container
        id="changelogs"
        start-x="20" 
        start-y="25" 
        start-width="305" 
        active
        widget
      >
        <title-bar
          title="Changelogs"
          slot="title-bar"
          widget
        >
        </title-bar>

        <window-content slot="window-content" widget>
          <div class="changelog-container">
            <div class="changelog">
              ${changelogs.map((changelog) => `
                  <p>${changelog.date} - ${changelog.log}</p>
                `).join("")}
            </div>
          </div>
        </window-content>
      </window-container>
    `
  }
}

customElements.define("change-logs", Changelogs);