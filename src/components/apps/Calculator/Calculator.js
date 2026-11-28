class Calculator extends HTMLElement {
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
        @import url("${new URL("../../../index.css", import.meta.url)}");
        @import url("${new URL("./Calculator.css", import.meta.url)}");
      </style>

      <div class="calculator">
        <div class="screen"><p class="result">0</p></div>

        <div class="buttons">
          <button>C</button>
          <button>=</button>
          <button>/</button>
          <button>*</button>
        </div>

        <div class="buttons">
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button>-</button>
        </div>

        <div class="buttons">
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>+</button>
        </div>

        <div class="bottom">
          <div class="left">
            <div class="buttons">
              <button>1</button>
              <button>2</button>
              <button>3</button>
            </div>

            <div class="buttons">
              <button id="zero">0</button>
              <button>.</button>
            </div>
          </div>

          <div class="buttons">
            <button id="equal">=</button>
          </div>
        </div>
      </div>
    `
  }
}

customElements.define("calculator-app", Calculator);
