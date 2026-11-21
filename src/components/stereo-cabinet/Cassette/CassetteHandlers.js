const handlePlaylistSelect = (component) => {
  component.dispatchEvent(
    new CustomEvent("playlist-selected", {
      bubbles: true,
      composed: true,
      detail: {
        name: component.getAttribute("name"),
        info: component.getAttribute("info"),
        playlistIndex: component.getAttribute("playlist-index"),
      },
    }) 
  );
};

export { handlePlaylistSelect };
