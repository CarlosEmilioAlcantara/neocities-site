import { 
  handleTogglePlay, 
  handleEndOfPlay, 
  handleTogglePause,
  handleToggleRewind,
  handleToggleSeekBack,
  handleToggleSeekForward,
  handleToggleSkip,
} from "./PlayerHandlers.js";

class Player extends HTMLElement {
  static get observedAttributes() {
    return ["playing", "volume"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.isVolumeSet = false;
    this.volume = 6;

    this.onToggleRewind = () => handleToggleRewind(this);
    this.onToggleSeekBack = () => handleToggleSeekBack(this);
    this.onTogglePlay = () => handleTogglePlay(this);
    this.onEndOfPlay = () => handleEndOfPlay(this);
    this.onToggleSeekForward = () => handleToggleSeekForward(this);
    this.onToggleSkip = () => handleToggleSkip(this);
    this.onTogglePause = () => handleTogglePause(this);
  }

  getVolume() {
    this.isVolumeSet = this.hasAttribute("volume");
    this.player = this.shadowRoot.querySelector("#player");

    if (this.isVolumeSet) this.volume = Number(this.getAttribute("volume"));
    this.player.volume = (this.volume / 100) * 14.28;
  }

  adjustVolume(e) {
    this.player = this.shadowRoot.querySelector("#player");
    this.player.volume = (e.currentTarget.value / 100) * 14.28;
  }

  attachEventListeners() {
    this.shadowRoot
      .querySelector("#volume-slider")
      .addEventListener("change", (e) => this.adjustVolume(e));

    this.shadowRoot
      .querySelector("#rewind")
      .addEventListener("click", this.onToggleRewind);

    this.shadowRoot
      .querySelector("#seek-backwards")
      .addEventListener("click", this.onToggleSeekBack);

    this.shadowRoot
      .querySelector("#play")
      .addEventListener("click", this.onTogglePlay);

    this.shadowRoot
      .querySelector("#seek-forwards")
      .addEventListener("click", this.onToggleSeekForward);

    this.shadowRoot
      .querySelector("#skip")
      .addEventListener("click", this.onToggleSkip);

    this.shadowRoot
      .querySelector("#player")
      .addEventListener("ended", this.onEndOfPlay);

    this.shadowRoot
      .querySelector("#pause")
      .addEventListener("click", this.onTogglePause);
  }

  detachEventListeners() {
    this.shadowRoot.removeEventListener("change", this.adjustVolume);
    this.shadowRoot.removeEventListener("click", this.onToggleRewind);
    this.shadowRoot.removeEventListener("click", this.onToggleSeekBack);
    this.shadowRoot.removeEventListener("click", this.onTogglePlay);
    this.shadowRoot.removeEventListener("click", this.onToggleSeekForward);
    this.shadowRoot.removeEventListener("click", this.onToggleSkip);
    this.shadowRoot.removeEventListener("click", this.onTogglePause);
    this.shadowRoot.removeEventListener("end", this.onEndOfPlay);
  }

  attributeChangedCallback(oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.getVolume();
      this.attachEventListeners();
    }
  }

  connectedCallback() {
    this.render();
    this.getVolume();
    this.attachEventListeners();
  }

  disconnectedCallback() {
    this.detachEventListeners();
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
            <div class="above">
              <div class="volume-container">
                <div class="volume">
                  <img src="../../assets/icons/player/sound.webp" />

                  <div class="volume-slider-container">
                    <div class="volume-slider-border-outer"></div>
                    <div class="volume-slider-border-inner"></div>

                    <input 
                      id="volume-slider"
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

              <div class="mark-container">
                <div class="mark">
                  <p>S N I B B Y</p>
                  <h3>RUNMAN</h3>
                  <p>RM - F404</p>
                </div>
              </div>
            </div>

            <div class="below">
              <div class="duration">
                <div id="rewind" class="control-container">
                  <button class="rewind-button"></button>
                </div>

                <div id="seek-backwards" class="control-container">
                  <button class="seek-backwards-button"></button>
                </div>

                <div id="play" class="control-container">
                  <button class="play-button"></button>
                </div>

                <div id="seek-forwards" class="control-container">
                  <button class="seek-forwards-button"></button>
                </div>

                <div id="skip" class="control-container">
                  <button class="skip-button"></button>
                </div>

                <div id="pause" class="control-container">
                  <button class="pause-button"></button>
                </div>
              </div>

              <div class="radio-button-container">
                <div id="radio" class="control-container">
                  <button class="radio-button">AM / FM</button>
                </div>
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
