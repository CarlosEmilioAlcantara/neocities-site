import "../../components/Player/Player.js";
import "../../components/widget/WidgetBar/WidgetBar.js";
import "../../components/widget/WidgetContainer/WidgetContainer.js";
import "../../components/widget/WidgetContent/WidgetContent.js";

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
        <widget-container
          start-x="50" 
          start-y="50"
          start-width="762" 
        >
          <widget-bar title="Music Player" slot="widget-bar" music-player>
          </widget-bar>

          <widget-content slot="widget-content">
            <music-player slot="music-player"></music-player>
          </widget-content>
        </widget-container>
      </div>
    `
  }
}

customElements.define("radio-page", RadioPage);
