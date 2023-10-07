let currentActiveSheet = null;

const main = document.getElementById("main");
const footer = document.getElementById("footer");

const sheets = [];
let data;

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

  const sheet = document.createElement("div");

  console.log(sheet.classList);
  sheet.innerText = `Sheet${sheets.length}`;
  sheet.className = "sheet";

  sheet.addEventListener("click", sheetClicked);
  // sheet.addEventListener("blur", sheetBlur);
  sheetDiv.appendChild(sheet);

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

  data = [];
  // console.log(grid);

  for (let i = 65; i <= 90; i++) {
    const column = document.createElement("div");
    const char = String.fromCharCode(i);
    const spanText = document.createElement("p");
    column.style.display = "flex";
    spanText.innerText = char;
    spanText.className = "spanText";

    //popup
    // const popup = document.createElement("div");
    // popup.className = "popup";
    // popup.innerHTML = ` <ul> <li><i class=“fas fa-cut”></i>Cut</li> <li><i class=“fas fa-copy”></i>Copy</li> <li><i class=“fas fa-paste”></i>Paste</li> <li><i class=“fas fa-paste”></i>Paste special</li> <li><i class=“fas fa-arrow-left”></i>Insert 1 column left</li> <li><i class=“fas fa-arrow-right”></i>Insert 1 column right</li> </ul> `;

    // column.innerText = char;
    column.id = char;
    column.className = "column";
    const span = document.createElement("span");
    span.addEventListener("click", sortingFunction);
    span.className = "material-icons spanSort";
    span.innerText = "arrow_drop_down";

    const div = document.createElement("div");
    div.className = "dropdown";
    div.innerHTML = `<button class="dropbtn material-icons" onclick="drop(this)">arrow_drop_down</button>
    <div class="dropdown-content">
      <a href="#" onclick="sortAtoZ(this)">Sort Sheet A to Z</a>
      <a href="#" onclick="sortZtoA(this)">Sort Sheet Z to A</a>
    </div>`;

    column.appendChild(spanText);
    column.appendChild(div);
    // column.appendChild(popup);

    gridHeader.appendChild(column);
  }

  function createRow(num) {
    const row = document.createElement("div");
    row.className = "row";

    const rowData = [];

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
        // const randomValue = Math.floor(Math.random() * 100);
        // cell.innerText = randomValue;
        rowData.push(cell);
        // console.log(rowData);
      }
      row.appendChild(cell);
    }

    data.push(rowData);
    grid.appendChild(row);
  }

  for (let i = 1; i < 100; i++) {
    createRow(i);
  }
}

addSheets.addEventListener("click", createGrid);

function sortDataByColumn(columnIndex) {
  const d = [];
  // console.log(data.length);
  // console.log(data[0].length, data.length);
  for (let i = 0; i < data.length; i++) {
    const value = data[i][columnIndex].innerText;
    if (value != "") d.push(value);
    // console.log("");
    // console.log(data[i][columnIndex].innerText, data[i][columnIndex]);
  }

  d.sort();

  // console.log(d);

  // Update the DOM to reflect the sorted data

  for (let j = 1; j < 100; j++) {
    const cellId = String.fromCharCode(64 + columnIndex + 1) + j;
    // console.log(cellId);
    const cell = document.getElementById(cellId);
    cell.innerText = d[j - 1] === undefined ? "" : d[j - 1];
  }
}

function sortDataByColumnReverse(columnIndex) {
  const d = [];

  for (let i = 0; i < data.length; i++) {
    const value = data[i][columnIndex].innerText;
    if (value != "") d.push(value);
  }

  d.sort((a, b) => b - a);

  for (let j = 1; j < 100; j++) {
    const cellId = String.fromCharCode(64 + columnIndex + 1) + j;
    const cell = document.getElementById(cellId);
    cell.innerText = d[j - 1] === undefined ? "" : d[j - 1];
  }
}

function sheetClicked(e) {
  const index = e.target.innerText.replace("Sheet", "");
  e.target.classList.add("sheet-active");
  currentActiveSheet = "Sheet" + index;
  console.log(currentActiveSheet);

  sheets[index - 1].style.display = "block";

  for (let i = 0; i < sheets.length; i++) {
    console.log(i != index - 1, i, index - 1);
    if (i != index - 1) {
      sheets[i].style.display = "none";
    }

    main.insertBefore(sheets[index - 1], footer);
  }
  console.log(sheets[index - 1]);
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

let dropdownContent;

function sortingFunction(e) {
  console.log(popup);
  e.target.appendChild(popup);
}

function drop(e) {
  e.nextElementSibling.classList.toggle("show");
  dropdownContent = e.nextElementSibling;
}

function sortAtoZ(e) {
  const columnName = e.parentNode.parentNode.parentNode;
  const index = columnName.id.charCodeAt(0) - 65;

  sortDataByColumn(index);
}

function sortZtoA(e) {
  const columnName = e.parentNode.parentNode.parentNode;
  const index = columnName.id.charCodeAt(0) - 65;

  sortDataByColumnReverse(index);
}
