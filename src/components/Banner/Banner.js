class Banner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  
  static get observedAttributes() {
    return ['message', 'warning'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }


  render() {
    const message = this.getAttribute("message");
    const warning = this.getAttribute("warning");

    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../index.css", import.meta.url)}");
        @import url("${new URL("./Banner.css", import.meta.url)}");
      </style>

      <div class="banner-container">
        <div class="banner">
          ${message && `
            <div class="message">
              ${warning && `
                <img 
                  class="warning icon" 
                  src="../../assets/icons/notification/Warning.svg" 
                />
              `}

              <span>${message}</span>

              ${warning && `
                <img 
                  class="warning icon" 
                  src="../../assets/icons/notification/Warning.svg" 
                />
              `}
            </div>
          `}
        </div>
      </div>
    `;
  }
}

customElements.define("alert-banner", Banner);
