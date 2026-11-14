import { NinetiesEmoPlaylist } from "../../stores/playlists/emo/90s-emo.js";

let playlist = NinetiesEmoPlaylist;

const RECENT_TRACKS_SIZE = 3;
const recentTracks = [];

const checkInnerLength = (element, length) => {
  const elementLength = element.innerHTML.length;
  
  if (elementLength > length) {
    element.style.whiteSpace = "nowrap";
    element.style.overflow = "hidden";
    element.classList.add("left-to-right");
  }
};

const addToRecentTracks = (index) => {
  recentTracks.push(index);
  if (recentTracks.length > RECENT_TRACKS_SIZE) recentTracks.shift();
};

const getRandomTrack = () => {
  const available = 
    [...Array(playlist.length).keys()]
    .filter((index) => !recentTracks.includes(index));

  console.log('Available Tracks:', available);

  const pool = available.length > 0 
    ? available 
    : [...Array(playlist.length).keys()];

  console.log('Current Pool:', pool);

  const index = Math.floor(Math.random() * pool.length);
  const music = playlist[index];

  return {index, music};
};

const handleTogglePlay = (component) => {
  const {index: index, music: music} = getRandomTrack();
  addToRecentTracks(index);

  const song = component.shadowRoot
    .querySelector("#song")

  const artist = component.shadowRoot
    .querySelector("#artist")

  song.innerText = music.title;
  artist.innerText = music.artist;

  checkInnerLength(song, 10);
  checkInnerLength(artist, 10);

  const player = component
    .shadowRoot
    .querySelector("#player");

  player.src = music.src; 
  player.play(); 
}

const handleEndOfPlay = (component) => handleTogglePlay(component);

export { handleTogglePlay, handleEndOfPlay };
