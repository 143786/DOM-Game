const tilesContainer = document.querySelector(".tiles");
const colors = [
  "aqua",
  "aquamarine",
  "crimson",
  "blue",
  "dodgerblue",
  "gold",
  "greenyellow",
  "teal",
];

const colorsPicklist = [...colors, ...colors];
const tileCount = colorsPicklist.length;

// Game state

let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

function buildTile(color) {
  const elemment = document.createElement("div");

  elemment.classList.add("tile");
  elemment.setAttribute("data-color", color);
  elemment.setAttribute("data-revealed", "false");

  elemment.addEventListener("click", () => {
    const revealed = elemment.getAttribute("data-revealed");
    if (awaitingEndOfMove || revealed === "true" || elemment === activeTile) {
      return;
    }
    elemment.style.backgroundColor = color;

    if (!activeTile) {
      activeTile = elemment;

      return;
    }

    const colorToMatch = activeTile.getAttribute("data-color");

    if (colorToMatch === color) {
      activeTile.setAttribute("data-revealed", true);
      elemment.setAttribute("data-revealed", true);
      activeTile = null;
      awaitingEndOfMove = false;
      revealedCount += 2;

      if (revealedCount === tileCount) {
        alert("You win! Refresh to Play again.");
      }
      return;
    }
    // down here
    awaitingEndOfMove = true;

    setTimeout(() => {
      elemment.style.backgroundColor = null;
      activeTile.style.backgroundColor = null;

      awaitingEndOfMove = false;
      activeTile = null;
    }, 1000);
  });
  return elemment;
}

// Build up tiles
for (let i = 0; i < tileCount; i++) {
  const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
  const color = colorsPicklist[randomIndex];
  const tile = buildTile(color);

  colorsPicklist.splice(randomIndex, 1);
  tilesContainer.appendChild(tile);
}
