import { handleTogglePlay, handleEndOfPlay } from "./PlayerHandlers.js";

class Player extends HTMLElement {
  static get observedAttributes() {
    return ["playing", "volume"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.volume = 0;

    this.onTogglePlay = () => handleTogglePlay(this);
    this.onEndOfPlay = () => handleEndOfPlay(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.volume = Number(this.getAttribute("volume"));
      this.render();

      this.shadowRoot
        .querySelector("#play")
        .addEventListener("click", this.onTogglePlay);

      this.shadowRoot
        .querySelector("#player")
        .addEventListener("end", this.onEndOfPlay);
    }
  }

  connectedCallback() {
    this.volume = Number(this.getAttribute("volume"));
    this.render();

    this.shadowRoot
      .querySelector("#play")
      .addEventListener("click", this.onTogglePlay);

    this.shadowRoot
      .querySelector("#player")
      .addEventListener("ended", this.onEndOfPlay);
  }

  render() {
    const playing = this.hasAttribute("playing");

    this.shadowRoot.innerHTML = `
      <style>
        @import url("${new URL("../../index.css", import.meta.url)}");
        @import url("${new URL("./Player.css", import.meta.url)}");
      </style>

      <div class="cassette-player">
        <div class="carriage-container">
          <div class="carriage">
            <div class="carriage-window">
              <div class="carriage-inside"></div>
            </div>
            <div class="carriage-window">
              <div class="carriage-inside"></div>
            </div>
            <div class="carriage-window">
              <div class="carriage-inside"></div>
            </div>
            <div class="carriage-window">
              <div class="carriage-inside"></div>
            </div>

            <div class="casette-body">
              <div class="screw"><div></div></div>
              <div class="screw"><div></div></div>
              <div class="screw"><div></div></div>
              <div class="screw"><div></div></div>
              <div class="label">
                <div class="label-descp">
                  <div class="line"></div>
                  <div class="line"></div>
                </div>

                <div class="player">
                  <div class="tape">
                    <div class="reel">
                      <div class="circle" id="circle1">
                        <div class="teeth"></div>
                        <div class="teeth"></div>
                        <div class="teeth"></div>
                        <div class="teeth"></div>
                        <div class="teeth"></div>
                        <div class="teeth"></div>
                      </div>
                    </div>

                    <div class="window">
                      <div class="song-info">
                        <div class="icon">
                          <img 
                            src="../assets/icons/player/note.webp" 
                            alt="Song: " 
                            title="Musical Note " 
                          />
                        </div>

                        <p id="song">PAUSED</p>
                      </div>

                      <span class="song-info">
                        <div class="icon">
                          <img 
                            src="../assets/icons/player/person.webp" 
                            alt="Artist: " 
                            title="Person " 
                          />
                        </div>

                        <p id="artist">PAUSED</p>
                      </span>
                    </div>

                    <div class="reel">
                      <div class="circle" id="circle2">
                        <div class="teeth"></div>
                        <div class="teeth"></div>
                        <div class="teeth"></div>
                        <div class="teeth"></div>
                        <div class="teeth"></div>
                        <div class="teeth"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="tape-footer-container">
                <div class="tape-footer">
                  <div class="holes holes-1">
                    <div class="hole radial"></div>
                    <div class="hole square"></div>
                  </div>

                  <div class="holes holes-2">
                    <div class="hole radial"></div>
                  </div>

                  <div class="holes holes-3">
                    <div class="hole radial"></div>
                    <div class="hole square"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--
          <div class="runtime">
          </div>      
         -->

        <div class="controls-wrapper">
          <div class="controls">
            <div class="volume-container">
              <div class="volume">
                <img src="../../assets/icons/player/sound.webp" />

                <div class="volume-slider-container">
                  <div class="volume-slider-border-outer"></div>
                  <div class="volume-slider-border-inner"></div>

                  <input 
                    type="range" 
                    min="0" 
                    max="7" 
                    value=${this.volume} 
                    list="tickmarks" 
                    class="volume-slider" 
                  />

                  <div class="volume-range">
                    <div class="range">0</div>
                    <div class="range">1</div>
                    <div class="range">2</div>
                    <div class="range">3</div>
                    <div class="range">4</div>
                    <div class="range">5</div>
                    <div class="range">6</div>
                    <div class="range">7</div>
                  </div>

                  <div class="volume-tickmarks">
                    <div class="range">|</div>
                    <div class="range">|</div>
                    <div class="range">|</div>
                    <div class="range">|</div>
                    <div class="range">|</div>
                    <div class="range">|</div>
                    <div class="range">|</div>
                    <div class="range">|</div>
                  </div>

                  <datalist id="tickmarks">
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                  </datalist>
                </div>

                <img src="../../assets/icons/player/sound.webp" />
              </div>
            </div>

            <div class="below">
              <div id="rewind" class="control-container">
                <button class="rewind-button"></button>
              </div>

              <div id="seek-backwards" class="control-container">
                <button class="seek-backwards-button"></button>
              </div>

              <div id="play" class="control-container">
                <button class="play-button"></button>
              </div>

              <div id="pause" class="control-container">
                <button class="seek-forwards-button"></button>
              </div>

              <div id="seek-forwards" class="control-container">
                <button class="skip-button"></button>
              </div>

              <div id="skip" class="control-container">
                <button class="pause-button"></button>
              </div>
            </div>
          </div>
        </div>

        <audio id="player"></audio>
      </div>
    `
  }
}

customElements.define("music-player", Player);
