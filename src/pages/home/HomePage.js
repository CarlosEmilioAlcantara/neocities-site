import "../../components/banner/Banner.js";
import "../../components/window/Window.js";
import "../../components/window/TitleBar.js";
import "../../components/window/WindowContent.js";

class HomePage extends HTMLElement {
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
        @import url("${new URL("./HomePage.css", import.meta.url)}");
      </style>

      <div class="home">
        <alert-banner 
          message="This site is under construction!"
          warning="true"
        ></alert-banner>

        <window-container start-x="620" start-y="315" start-width="600" start-height="320">
          <title-bar title="Greetings" slot="title-bar"></title-bar>
          <window-content slot="window-content" center>
            <img 
              alt="yuuri-yapping" 
              src="../../assets/images/yuuri-yapping.jpg" 
            />

            <p>Hello</p>
            <p>World</p>
          </window-content>
        </window-container>
      </div>
    `;
  }
}

customElements.define("home-page", HomePage);
