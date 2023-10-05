const gridHeader = document.getElementsByClassName("grid-header")[0];
const grid = document.getElementsByClassName("grid")[0];

const srNo = document.createElement("div");
srNo.className = "column";
srNo.innerText = "";
gridHeader.appendChild(srNo);

// console.log(grid);

for (let i = 65; i <= 90; i++) {
  const column = document.createElement("div");
  const char = String.fromCharCode(i);
  column.innerText = char;
  column.id = char;
  column.className = "column";
  gridHeader.appendChild(column);
}

function createRow(num) {
  const row = document.createElement("div");
  row.className = "row";

  for (let i = 64; i <= 90; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";

    if (i === 64) {
      cell.innerText = num;
      cell.id = num;
    } else {
      cell.contentEditable = true;
      cell.id = String.fromCharCode(i) + num;
      cell.addEventListener("focus", onCellFocus);
      cell.addEventListener("blur", onCellBlur);
      cell.addEventListener("input", onCellInput);
    }
    row.appendChild(cell);
  }
  grid.appendChild(row);
}

for (let i = 1; i < 100; i++) {
  createRow(i);
}
