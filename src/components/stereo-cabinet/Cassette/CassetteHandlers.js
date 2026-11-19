import { playlists } from "../../../stores/playlists.js";

const handlePlaylistSelect = (component) => {
  const cabinet = component
    .getRootNode()
    .querySelector(".cabinet");

  cabinet.setAttribute("name", component.getAttribute("name"));
  cabinet.setAttribute("info", component.getAttribute("info"));
  cabinet.setAttribute("playlist-index", component.getAttribute("playlist-index"));
};

export { handlePlaylistSelect };