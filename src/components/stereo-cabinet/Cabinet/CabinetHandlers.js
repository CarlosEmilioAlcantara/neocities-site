const handleCassettesFlip = (component, index, up = false) => {
  const cassettes = component
    .shadowRoot
    .querySelectorAll(".playlist");
  
  cassettes.forEach((cassette) => {
    cassette.style.display = "none";
  });

  console.log(index);
  if ((index + 1) === cassettes.length) return;

  if (up) {
    cassettes[index - 1].style.display = "block";
    cassettes[index].style.display = "block";
    cassettes[index - 2].style.display = "block";
    component.cassetteStorageIndex -= 1;
    return;
  }

  cassettes[index - 1].style.display = "block";
  cassettes[index].style.display = "block";
  cassettes[index + 1].style.display = "block";
  component.cassetteStorageIndex += 1;

};

export { handleCassettesFlip };