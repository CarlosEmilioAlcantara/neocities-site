import "../Button/Button.js";

class Alert extends HTMLElement {
  static get observedAttributes() {
    return ["variant", "message"];
  } 

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();

    this.shadowRoot
      .querySelector("ui-button")
      .action = () => {
        this.style.display = "none";
      }
  }

  render() {
    const variant = this.getAttribute("variant");
    const message = this.getAttribute("message");

    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../index.css", import.meta.url)}");
        @import url("${new URL("./Alert.css", import.meta.url)}");
      </style>

      <div class="alert-wrapper">
        <div class="outer-border">
          <div class="inner-border">
            <div class="contents">
              <div class="dialog">
                ${variant === "info"
                    ? `<img 
                          src="../../assets/icons/desktop/info.webp" 
                          alt="Info icon" 
                       />`
                : variant === "warning"
                    ? `<img 
                        src="../../assets/icons/notification/warning.svg" 
                        alt="Warning icon" 
                      />`
                : variant === "alert"
                    ? `<img 
                        src="../../assets/icons/notification/alert.svg" 
                        alt="Alert icon" 
                      />`
                : variant === "stop"
                    ? `<img 
                        src="../../assets/icons/notification/stop.svg" 
                        alt="Stop icon" 
                      />`
                : ""
                }
                
                ${message ? `<p>${message}</p>` : ""}
              </div>

              <span class="button">
                <ui-button label="Ok"></ui-button>
              </span>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

customElements.define("alert-box", Alert);
