import "../../components/Player/Player.js";

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
        @import url("${new URL("./RadioPage.css", import.meta.url)}");
      </style>

      <div class="radio">
        <div class="cabinet">
          <div class="cabinet-side"></div>

          <div class="cabinet-middle">
            <div class="cabinet-top-and-bottom">
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
            </div>

            <div class="cabinet-contents">
              <div class="left-container">
                <div class="left">
                  <div class="cassette-info">
                  </div>

                  <div class="cassette-storage">
                    <div id="storage-up" class="cassette-storage-button">
                      <button></button>
                      <button></button>
                    </div>

                    <div class="cassettes">
                      <div class="cassette-container">
                        <div class="cassette">
                          <div class="cassette-label">
                            <p>90s Emo</p>
                          </div>
                        </div>
                      </div>

                      <div class="cassette-container">
                        <div class="cassette">
                          <div class="cassette-label">
                            <p>90s Shoegaze</p>
                          </div>
                        </div>
                      </div>

                      <div class="cassette-container">
                        <div class="cassette">
                          <div class="cassette-label">
                            <p>Grunge</p>
                          </div>
                        </div>
                      </div>
                      
                      <div class="cassette-container">
                        <div class="cassette">
                          <div class="cassette-label">
                            <p>Industrial Rock</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div id="storage-down" class="cassette-storage-button">
                      <button></button>
                      <button></button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="player-container">
                <music-player></music-player>

                <div class="instructions-buttons-container">
                  <div class="instructions-buttons">
                    <div class="instructions-buttons-inside">
                    </div>
                  </div>
                </div>
              </div>

              <div class="right-container">
                <div class="right">
                  <p>eeeeee</p>
                </div>
              </div>
            </div>

            <div class="cabinet-top-and-bottom">
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
              <div class="line"></div>
            </div>
          </div>

          <div class="cabinet-side"></div>
        </div>
      </div>
    `
  }
}

customElements.define("radio-page", RadioPage);
