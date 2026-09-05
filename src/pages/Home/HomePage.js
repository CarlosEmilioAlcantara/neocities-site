import "../../components/Banner/Banner.js";
import "../../components/window/WindowContainer/WindowContainer.js";
import "../../components/window/TitleBar/TitleBar.js";
import "../../components/window/WindowContent/WindowContent.js";
import "../../components/Button/Button.js";

class HomePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  
  connectedCallback() {
    this.render();

    const button = this.shadowRoot.querySelector("ui-button");
    // button.action = () => window.location.href = "https://google.com";
    button.action = () => console.log("https://google.com");
  }

  arrow = new URL("../../assets/icons/notification/Warning.svg", import.meta.url).href;

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

        <window-container start-x="625" start-y="220" start-width="600" start-height="560">
          <title-bar title="Greetings" slot="title-bar"></title-bar>
          <window-content slot="window-content" center>
            <img 
              alt="yuuri-yapping" 
              src="../../assets/images/yuuri-yapping.jpg" 
            />

            <p style="text-align: center;">
              Hello! If you've somehow found this site, welcome!
              This is my personal homepage/space/land/territory/structure 
              on the internet where I intend to write and talk about whatever 
              interests me or comes to my mind at the moment :^)
            </p>

            <p style="text-align: center;">
              Obviously there's not much here yet, but I intend to have all
              kinds of fun things here, such as:
            </p>

            <ul>
              <li>Blog posts - so I can yap</li>
              <li>Microblog posts - so I can vent</li>
              <li>
                Radio - so I can show off my totally niche and cool music taste
              </li>
              <li>Favorites page, shrines, etc.</li>
            </ul>

            <ui-button 
              label="ENTER"
              icon="${this.arrow}"
              small
            >
            </ui-button>
          </window-content>
        </window-container>
      </div>
    `;
  }
}

customElements.define("home-page", HomePage);
