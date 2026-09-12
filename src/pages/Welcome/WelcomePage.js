import "../../components/Banner/Banner.js";
import "../../components/window/WindowContainer/WindowContainer.js";
import "../../components/window/TitleBar/TitleBar.js";
import "../../components/window/WindowContent/WindowContent.js";
import "../../components/window/WindowIcon/WindowIcon.js";
import "../../components/Button/Button.js";
import { navigate } from "../../main.js";

class WelcomePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.alertShow = false;
  }
  
  connectedCallback() {
    this.render();
  
    const button = this.shadowRoot.querySelector("ui-button");
  
    button.action = () => {
      navigate("/home");
    };
  }

  info = new URL("../../assets/icons/desktop/info.webp", import.meta.url).href;

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../index.css", import.meta.url)}");
        @import url("${new URL("./WelcomePage.css", import.meta.url)}");
      </style>

      <div class="welcome">
        <alert-banner 
          message="This site is under construction!"
          warning="true"
        ></alert-banner>

        <window-icon
          icon=${this.info}
          title="Greetings"
          bottom="1"
          left="1"
          window="greetings"
        ></window-icon>

        <window-container 
          id="greetings" 
          start-x="400" 
          start-y="105" 
          start-width="600" 
          start-height="600"
          active
        >
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
            >
            </ui-button>

          </window-content>
        </window-container>
      </div>
    `;
  }
}

customElements.define("welcome-page", WelcomePage);
