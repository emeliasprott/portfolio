const stage = document.querySelector("[data-sorting-stage]");
const shapeField = document.querySelector("[data-shape-field]");
const sortGrid = document.querySelector("[data-sort-grid]");
const yearNode = document.querySelector("[data-year]");
const header = document.querySelector("[data-header]");
const progressBar = document.querySelector(".section-indicator span");

const palette = [
  "#EFE7D0",
  "#95c9bc",
  "#F8EA7D",
  "#dd7d9d",
  "#BB4C1C",
  "#CA251F",
  "#CFAACB",
  "#537f72",
  "#7086B5",
  "#315927",
  "#BCD03B",
  "#A6135D",
  "#e36659",
  "#285694",
];

const colorWeights = [0.8, 1.4, 1, 1, 0.8, 0.7, 1, 1, 1.5, 0.7, 0.8, 1, 1, 1];

const shapeTypes = [
  "circle",
  "square",
  "triangle",
  "ring",
  "cross",
  "asterisk",
  "diamond",
  "half",
  "x",
];

const sortedColumns = [
  { type: "cross", color: 6, count: 3 },
  { type: "ring", color: 12, count: 4 },
  { type: "square", color: 1, count: 3 },
  { type: "triangle", color: 5, count: 2 },
  { type: "asterisk", color: 0, count: 4 },
  { type: "circle", color: 11, count: 4 },
  { type: "square", color: 9, count: 3 },
  { type: "circle", color: 2, count: 2 },
  { type: "triangle", color: 8, count: 4 },
  { type: "diamond", color: 5, count: 3 },
  { type: "x", color: 7, count: 4 },
  { type: "circle", color: 4, count: 2 },
];

/* x, y, type, color, size, rotation */
const strayPieces = [
  [13, 33, "square", 3, 28, -18],
  [18, 55, "x", 7, 31, -5],
  [24, 24, "asterisk", 0, 30, 8],
  [32, 68, "triangle", 1, 26, -72],
  [73, 28, "cross", 3, 28, 8],
  [82, 39, "x", 0, 29, 18],
  [88, 52, "square", 9, 28, -8],
  [77, 64, "ring", 5, 30, -5],
  [91, 68, "circle", 1, 25, 0],
  [64, 20, "square", 4, 25, 12],
  [10, 68, "cross", 0, 27, 43],
  [86, 22, "diamond", 8, 23, 8],
  [37, 16, "ring", 10, 24, -12],
  [49, 22, "triangle", 5, 23, 24],
  [61, 13, "x", 2, 22, -8],
  [70, 21, "half", 7, 24, 18],
];

let resizeTimer;

function seededRandom(seed) {
  const x = Math.sin(seed * 999.91) * 43758.5453;
  return x - Math.floor(x);
}

function centeredRandom(seed) {
  return (
    (seededRandom(seed) +
      seededRandom(seed + 17) +
      seededRandom(seed + 41) +
      seededRandom(seed + 73)) /
    4
  );
}

function makeShape(type, color, size, rotation, className) {
  const shape = document.createElement("span");
  shape.className = `geo-shape ${className} shape--${type}`;
  shape.style.setProperty("--size", `${size}px`);
  shape.style.setProperty("--shape-color", palette[color % palette.length]);
  shape.style.setProperty("--rotation", `${rotation}deg`);

  if (type === "asterisk") {
    shape.appendChild(document.createElement("span"));
  }

  return shape;
}

function buildGrid() {
  sortGrid.innerHTML = "";
  const columns = 12;
  const rows = 4;
  const cellWidth = sortGrid.getBoundingClientRect().width / columns;
  const cellHeight = sortGrid.getBoundingClientRect().height / rows;

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const cell = document.createElement("div");
      const config = sortedColumns[column];
      cell.className = "sort-grid__cell";

      if (row >= rows - config.count) {
        const size = Math.round(Math.min(cellWidth * 0.48, cellHeight * 0.54));
        const rotation = config.type === "triangle" ? 90 : 0;
        cell.appendChild(
          makeShape(config.type, config.color, size, rotation, "grid-shape"),
        );
      }

      sortGrid.appendChild(cell);
    }
  }
}

function addLooseShape(x, y, type, color, size, rotation, layer) {
  const shape = makeShape(type, color, size, rotation, "loose-shape");
  shape.style.setProperty("--x", `${x}%`);
  shape.style.setProperty("--y", `${y}%`);
  shape.style.setProperty("--layer", layer);
  shapeField.appendChild(shape);
}

function weightedColorIndex(seed) {
  const total = colorWeights.reduce((sum, weight) => sum + weight, 0);
  let target = seededRandom(seed) * total;

  for (let i = 0; i < colorWeights.length; i += 1) {
    target -= colorWeights[i];
    if (target < 0) return i;
  }

  return colorWeights.length - 1;
}

function buildLoosePieces() {
  shapeField.innerHTML = "";
  const compact = stage.getBoundingClientRect().width < 520;
  const pileCount = compact ? 54 : 70;

  for (let i = 0; i < pileCount; i += 1) {
    const x = 47 + (centeredRandom(i + 3) - 0.5) * 56;
    const y = 46 + (centeredRandom(i + 109) - 0.5) * 40;
    const type = shapeTypes[(i * 5 + 2) % shapeTypes.length];
    const color = weightedColorIndex(i + 407);
    const size = Math.round(
      (compact ? 12 : 14) + seededRandom(i + 209) * (compact ? 15 : 20),
    );
    const rotation = -65 + seededRandom(i + 301) * 130;

    addLooseShape(x, y, type, color, size, rotation, 10 + i);
  }

  strayPieces.forEach((piece, index) => {
    const [x, y, type, color, size, rotation] = piece;
    addLooseShape(
      x,
      compact ? Math.min(y, 64) : y,
      type,
      color,
      compact ? Math.max(16, size - 5) : size,
      rotation,
      4 + index,
    );
  });
}

function buildIllustration() {
  buildGrid();
  buildLoosePieces();
}

function updateScrollState() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

  header.classList.toggle("is-scrolled", window.scrollY > 12);
  progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
}

function handleResize() {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(buildIllustration, 120);
}

window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", handleResize);

yearNode.textContent = new Date().getFullYear();

buildIllustration();
updateScrollState();
