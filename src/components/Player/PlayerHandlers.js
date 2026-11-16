import { NinetiesEmoPlaylist } from "../../stores/playlists/emo/90s-emo.js";

let playlist = NinetiesEmoPlaylist;

let isPlaying = false;
let isPaused = false;
const RECENT_TRACKS_SIZE = 9;
const recentTracks = [];

const checkInnerLength = (element, length) => {
  const elementLength = element.innerHTML.length;
  
  if (elementLength > length) {
    element.style.whiteSpace = "nowrap";
    element.style.overflow = "hidden";
    element.classList.add("left-to-right");
  }
};

const changeSongArtist = (component, music) => {
  const song = component.shadowRoot
    .querySelector("#song")
  const artist = component.shadowRoot
    .querySelector("#artist")

  song.innerText = music.title;
  artist.innerText = music.artist;
  checkInnerLength(song, 10);
  checkInnerLength(artist, 10);
};

const playPauseMusic = (component, isPlaying, music = null) => {
  const player = component
    .shadowRoot
    .querySelector("#player");

  if (isPlaying && music) {
    player.src = music.src; 
    player.play(); 
  } else if (isPlaying) {
    player.play();
  } else if (!isPlaying) {
    player.pause();
  }
};

const seekForwardsBackwards = (component, backwards, length = 5) => {
  const player = component.shadowRoot
    .querySelector("#player");

  const circle1 = component.shadowRoot
    .querySelector("#circle1");
  const circle2 = component.shadowRoot
    .querySelector("#circle2");

  circle1.style.animationDuration = "1s";
  circle2.style.animationDuration = "1s";

  const reelBackward = () => {
    circle1.style.animationDirection = "reverse";
    circle2.style.animationDirection = "reverse";
  };

  const returnToNormal = () => {
    circle1.style.animationDuration = "3s";
    circle2.style.animationDuration = "3s";
    circle1.style.animationDirection = "normal";
    circle2.style.animationDirection = "normal";
  };

  const normalizeReelSpeed = () => setTimeout(returnToNormal, 500);
  const clearNormalizeReelSpeed = () => clearTimeout(normalizeReelSpeed);

  if (backwards) {
    player.currentTime -= length;
    reelBackward();
    normalizeReelSpeed();
    clearNormalizeReelSpeed();
  } else {
    player.currentTime += length;
    normalizeReelSpeed();
    clearNormalizeReelSpeed();
  }
}

const changePlayerState = (component, isPlaying, music = null) => {
  const circle1 = component.shadowRoot
    .querySelector("#circle1");
  const circle2 = component.shadowRoot
    .querySelector("#circle2");

  const playBtn = component.shadowRoot
    .querySelector(".play-button");
  const pauseBtn = component.shadowRoot
    .querySelector(".pause-button");

  if (isPlaying && music) {
    changeSongArtist(component, music);

    circle1.style.animationPlayState = "running";
    circle2.style.animationPlayState = "running";
    playBtn.classList.add("active");
    pauseBtn.classList.remove("active");

    playPauseMusic(component, isPlaying, music);
  } else if (isPlaying) {
    circle1.style.animationPlayState = "running";
    circle2.style.animationPlayState = "running";
    playBtn.classList.add("active");
    pauseBtn.classList.remove("active");

    playPauseMusic(component, isPlaying);
  } else if (!isPlaying) {
    circle1.style.animationPlayState = "paused";
    circle2.style.animationPlayState = "paused";
    playBtn.classList.remove("active");
    pauseBtn.classList.add("active");
    playPauseMusic(component, isPlaying);
  }
};

const addToRecentTracks = (index) => {
  recentTracks.push(index);
  if (recentTracks.length > RECENT_TRACKS_SIZE) recentTracks.shift();
};

const getRandomTrack = () => {
  const available = 
    [...playlist]
    .filter((track) => !recentTracks.includes(track));

  const pool = available.length ? available : [...playlist];
  const index = Math.floor(Math.random() * pool.length);
  const music = pool[index];

  return music;
};

const getVolume = (component) => {
  component.isVolumeSet = component.hasAttribute("volume");
  const player = component.shadowRoot.querySelector("#player");

  if (component.isVolumeSet) 
    component.volume = Number(component.getAttribute("volume"));

  player.volume = (component.volume / 100) * 14.28;
};

const handleAdjustVolume = (component, e) => {
  const player = component.shadowRoot.querySelector("#player");
  player.volume = (e.currentTarget.value / 100) * 14.28;
};

const handleTogglePlay = (component) => {
  if (isPlaying) return;
  isPlaying = true;

  if (!isPaused) {
    const music = getRandomTrack();
    addToRecentTracks(music);
    changePlayerState(component, isPlaying, music);
  } else {
    changePlayerState(component, isPlaying);
  }
  
  isPaused = false;
}

const handleTogglePause = (component) => {
  if (!isPlaying) return;
  isPlaying = false;
  isPaused = true;
  changePlayerState(component, isPlaying);
};

const handleToggleRewind = (component) => {
  if (!isPlaying) return;
  const index = recentTracks.at(-2);
  const music = playlist[index];

  changePlayerState(component, isPlaying, music);
};

const handleToggleSeekBack = (component) => {
  seekForwardsBackwards(component, true, 10);
};

const handleToggleSeekForward = (component) => {
  if (!isPlaying) return;
  seekForwardsBackwards(component, false, 10);
};

const handleToggleSkip = (component) => {
  if (!isPlaying) return;
  isPlaying = false;
  handleTogglePlay(component);
};

const handleEndOfPlay = (component) => {
  isPlaying = false;
  handleTogglePlay(component);
};

export { 
  getVolume,
  handleAdjustVolume,
  handleTogglePlay, 
  handleEndOfPlay, 
  handleTogglePause,
  handleToggleRewind,
  handleToggleSeekBack,
  handleToggleSeekForward,
  handleToggleSkip,
};
