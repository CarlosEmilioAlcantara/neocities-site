const handlePlaylistSelected = (component, e) => {
  component.shadowRoot
    .querySelector(".info-paragraph")
    .innerText = e.detail.info;

  component.name = e.detail.name;
  component.playlistIndex = e.detail.playlistIndex;

  const player = component
    .shadowRoot
    .querySelector("music-player");

  player.name = component.name;
  player.playlistIndex = component.playlistIndex;
  player.onPlaylistChange();
};

export { handlePlaylistSelected };
