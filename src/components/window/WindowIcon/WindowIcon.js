import { 
  handleOpen, 
  handleIconFocus, 
  handleIconUnfocus,
} from "./WindowIconHandlers.js";

class WindowIcon extends HTMLElement {
  static get observedAttributes() {
    return [
      "icon", 
      "title", 
      "top", 
      "right", 
      "bottom", 
      "left", 
      "window",
      "widget",
      "app",
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.clickCount = 0;
    this.top = null;
    this.right = null;
    this.bottom = null;
    this.left = null;
    this.widget = false;

    this.onOpen = () => handleOpen(this);
    this.onIconFocus = () => handleIconFocus(this);
    this.onIconUnfocus = (e) => handleIconUnfocus(this, e);
  }

  attributeChangedCallback(oldValue, newValue) {
    if (oldValue !== newValue) {
      this.top = Number(this.getAttribute("top"));
      this.right = Number(this.getAttribute("right"));
      this.bottom = Number(this.getAttribute("bottom"));
      this.left = Number(this.getAttribute("left"));
      this.widget = this.hasAttribute("widget");

      this.render();

      this.shadowRoot
        .querySelector(".window-icon")
        .addEventListener("pointerdown", this.onIconFocus);
      this.shadowRoot
        .querySelector(".window-icon")
        .addEventListener("pointerdown", this.onOpen);
      
      window.addEventListener("pointerdown", this.onIconUnfocus);
    }
  }

  connectedCallback() {
    this.top = Number(this.getAttribute("top"));
    this.right = Number(this.getAttribute("right"));
    this.bottom = Number(this.getAttribute("bottom"));
    this.left = Number(this.getAttribute("left"));
    this.widget = this.hasAttribute("widget");

    this.render();

    this.shadowRoot
      .querySelector(".window-icon")
      .addEventListener("pointerdown", this.onIconFocus);
    this.shadowRoot
      .querySelector(".window-icon")
      .addEventListener("pointerdown", this.onOpen);
    
    window.addEventListener("pointerdown", this.onIconUnfocus);
  }

  disconnectedCallback() {
    this.removeEventListener("pointerdown", this.onOpen);
    this.removeEventListener("pointerdown", this.onIconFocus);
    window.removeEventListener("pointerdown", this.onIconUnfocus);
  }

  render() {
    const icon = this.getAttribute("icon");
    const title = this.getAttribute("title");

    this.style.position = "absolute";
    this.style.top = `${this.top ? `${this.top}%` : ""}`;
    this.style.right = `${this.right ? `${this.right}%` : ""}`;
    this.style.bottom = `${this.bottom ? `${this.bottom}%` : ""}`;
    this.style.left = `${this.left ? `${this.left}%` : ""}`;

    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../../index.css", import.meta.url)}");
        @import url("${new URL("./WindowIcon.css", import.meta.url)}");
      </style>


      <div class="window-icon">
        ${icon 
          ? `<img src=${icon} />` 
          : `<img src="../../../assets/icons/notification/Warning.svg" />`
        }
        ${title ? `<p class="title">${title}</p>` : ""}
      </div>
    `;
  }
}

customElements.define("window-icon", WindowIcon);
