import "./Calculator.js";
import "../../window/WindowContainer/WindowContainer.js";
import "../../window/TitleBar/TitleBar.js";
import "../../window/WindowContent/WindowContent.js";
import { getWindowWidth } from "../../../utils/viewport/getWindowWidth.js";

class CalculatorWidget extends HTMLElement {
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
        id="calculator"
        start-x="${getWindowWidth() > 1536 ? 1180 : 680}" 
        start-y="59"
        start-width="338.5" 
        widget
        closed
      >
        <title-bar 
          title="Calculator" 
          slot="title-bar" 
          widget
          music-player
        >
        </title-bar>

        <window-content slot="window-content" widget>
          <calculator-app></calculator-app>
        </window-content>
      </window-container>
    `
  }
}

customElements.define("calculator-widget", CalculatorWidget);
