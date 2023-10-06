// const initialCellState = {
//   fontFamily_data: "monospace",
//   fontSize_data: "14",
//   isBold: false,
//   isItalic: false,
//   textAlign: "start",
//   isUnderlined: false,
//   color: "#000000",
//   backgroundColor: "#ffffff",
//   content: "",
// };

// let activeSheetIndex = -1;

// let activeSheetObject = false;

let currentActiveSheet = null;

const main = document.getElementById("main");
const footer = document.getElementById("footer");

const sheets = [];

const body = document.body;

const addSheets = document.getElementById("addSheet");
const sheetDiv = document.getElementById("sheets");

let index = 1;

let gridHeader;

let grid = document.createElement("div");

function createGrid(e) {
  gridHeader = document.createElement("div");
  grid = document.createElement("div");

  grid.className = "grid";
  grid.id = index++;
  gridHeader.className = "grid-header";
  grid.appendChild(gridHeader);
  sheets.push(grid);

  //sheet create
  const individualSheet = document.createElement("div");
  const sheet = document.createElement("div");
  individualSheet.appendChild(sheet);
  individualSheet.style.display = "flex";
  individualSheet.className = "individualSheet";

  const dropDown = document.createElement("button");
  dropDown.className = "material-icons arrow-button";
  dropDown.onclick = "sheetOptions(this)";
  dropDown.disabled = true;
  dropDown.innerText = "arrow_drop_down";
  individualSheet.appendChild(dropDown);

  console.log(sheet.classList);
  sheet.innerText = `Sheet${sheets.length}`;
  sheet.className = "sheet";

  sheet.addEventListener("click", sheetClicked);
  // sheet.addEventListener("blur", sheetBlur);
  sheetDiv.appendChild(individualSheet);

  if (e == 1) {
    main.insertBefore(sheets[0], footer);
    sheet.classList.add("sheet-active");
  }
  createInsideGrid();
}

createGrid(index);

function createInsideGrid() {
  const srNo = document.createElement("div");
  srNo.className = "column";
  srNo.innerText = "";
  gridHeader.appendChild(srNo);

  // const data = [];
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

    // const rowData = [];

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
        const randomValue = Math.floor(Math.random() * 100);
        // cell.innerText = randomValue;
        // rowData.push(randomValue);
      }
      row.appendChild(cell);
    }

    // data.push(rowData);
    grid.appendChild(row);
  }

  for (let i = 1; i < 100; i++) {
    createRow(i);
  }
}

addSheets.addEventListener("click", createGrid);

// function sortDataByColumn(columnIndex) {
//   data.sort((a, b) => a[columnIndex] - b[columnIndex]);

//   // Update the DOM to reflect the sorted data
//   for (let i = 0; i < data.length; i++) {
//     for (let j = 1; j <= 26; j++) {
//       const cellId = String.fromCharCode(64 + j) + (i + 1);
//       const cell = document.getElementById(cellId);
//       cell.innerText = data[i][j - 1];
//     }
//   }
// }

// sortDataByColumn(2);

// document.addEventListener("DOMContentLoaded", () => {
//   sheets.push(main);
//   const sheet = document.createElement("div");
//   sheet.innerText = `Sheet${sheets.length}`;
//   sheet.className = "sheet";
//   sheet.addEventListener("click", sheetClicked);
//   sheetDiv.appendChild(sheet);
// });

// addSheets.addEventListener("click", () => {
//   sheets.push(main);
// const sheet = document.createElement("div");
// sheet.innerText = `Sheet${sheets.length}`;
// sheet.className = "sheet";
// sheet.addEventListener("click", sheetClicked);
// sheetDiv.appendChild(sheet);
//   console.log(sheets);
// });

function sheetClicked(e) {
  const index = e.target.innerText.replace("Sheet", "");
  e.target.classList.add("sheet-active");
  // console.log
  // console.log(index);
  currentActiveSheet = "Sheet" + index;
  console.log(currentActiveSheet);
  // console.log(document.body.remove());

  sheets[index - 1].style.display = "block";

  for (let i = 0; i < sheets.length; i++) {
    console.log(i != index - 1, i, index - 1);
    if (i != index - 1) {
      sheets[i].style.display = "none";
    }

    main.insertBefore(sheets[index - 1], footer);
  }
  console.log(sheets[index - 1]);
  // body.appendChild(sheets[index]);
  manageSheetState(currentActiveSheet);
}

function manageSheetState(index) {
  const sheetList = document.getElementsByClassName("sheet");
  console.log(sheetList);

  for (let i = 0; i < sheetList.length; i++) {
    if (sheetList[i].innerText != index) {
      sheetList[i].classList.remove("sheet-active");
    }
  }
}
