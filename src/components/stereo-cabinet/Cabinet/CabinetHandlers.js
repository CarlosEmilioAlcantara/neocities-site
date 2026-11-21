const hideCassettes = (component) => {
  let cassettes = Array.prototype.slice.call(component
    .shadowRoot
    .querySelectorAll(".playlist"));
  
  cassettes.forEach((cassette) => {
    cassette.style.display = "none";
  });

  cassettes = cassettes.slice(
    component.offset, 
    (component.limit + component.offset)
  );

  cassettes.forEach((cassette) => {
    cassette.style.display = "block";
  });
};

const checkPlaylistsLength = (component) => {
  if ((component.offset - component.limit) < 0) {
    component.shadowRoot
      .querySelector("#storage-up")
      .classList.add("cassette-storage-button-disabled");
  } else {
    component.shadowRoot
      .querySelector("#storage-up")
      .classList.remove("cassette-storage-button-disabled");
  }

  if ((component.offset + component.limit) >= component.playlists.length) {
    component.shadowRoot
      .querySelector("#storage-down")
      .classList.add("cassette-storage-button-disabled");
  } else {
    component.shadowRoot
      .querySelector("#storage-down")
      .classList.remove("cassette-storage-button-disabled");
  }
};

const handleCassettesFlip = (component, up = false) => {
  let cassettes = Array.prototype.slice.call(component
    .shadowRoot
    .querySelectorAll(".playlist"));
  
  cassettes.forEach((cassette) => {
    cassette.style.display = "none";
  });

  if (up) {
    component.offset = component.offset - component.limit;
  } else {
    component.offset = component.offset + component.limit;
  }

  cassettes = cassettes.slice(
    component.offset, 
    (component.limit + component.offset)
  );

  cassettes.forEach((cassette) => {
    cassette.style.display = "block";
  });

  checkPlaylistsLength(component);
};

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
  console.log(player.playlistIndex);
  player.onPlaylistChange();
};

export { 
  hideCassettes, 
  checkPlaylistsLength, 
  handleCassettesFlip,
  handlePlaylistSelected,
};
