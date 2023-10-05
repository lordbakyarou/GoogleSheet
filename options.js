const position = document.getElementById("position");
const formulas = document.getElementById("formulas");
const textAlignELements = document.getElementsByClassName("text-align");

// console.log(menuItems);
//menuItems
const bold = document.getElementById("bold");
const italic = document.getElementById("italic");
const underline = document.getElementById("underline");

let activeCell = null;
position.innerText = "";

let activeOptionsState;

function onCellFocus(e) {
  highlightRowAndColoumn(e);

  if (activeCell && activeCell.id === e.target.id) return;

  activeCell = e.target;
  position.innerText = activeCell.id;

  const computedStyle = getComputedStyle(activeCell);

  activeOptionsState = {
    fontFamily: computedStyle.fontFamily,
    isBoldSelected: computedStyle.fontWeight === "600",
    isItalicSelected: computedStyle.fontStyle === "italic",
    isUnderLineSelected:
      computedStyle.textDecoration === "underline solid rgb(0, 0, 0)",
    textAlign: computedStyle.textAlign,
    textColor: computedStyle.color,
    backgroundColor: computedStyle.backgroundColor,
    fontSize: computedStyle.fontSize,
  };

  console.log(activeOptionsState);
  manageButtonState(computedStyle);
}

function highlightRowAndColoumn(e) {
  const currentId = e.target;
  const coloumnId = e.target.parentNode.children[0];
  const rowId = currentId.id.replace(coloumnId.innerText, "");
  const rowElement = document.getElementById(rowId);

  coloumnId.style.backgroundColor = "#D3E3FD";
  rowElement.style.backgroundColor = "#D3E3FD";
  currentId.style.border = "none";
  currentId.style.border = "1px solid #135dd2";
  position.innerText = currentId.id;
  formulas.innerText = currentId.innerText;
}

function onCellBlur(e) {
  const currentId = e.target;
  const coloumnId = e.target.parentNode.children[0];
  const rowId = currentId.id.replace(coloumnId.innerText, "");
  const rowElement = document.getElementById(rowId);

  coloumnId.style.backgroundColor = "white";
  rowElement.style.backgroundColor = "white";
  currentId.style.border = "1px solid #e1e1e1";
  currentId.style.borderRightWidth = "0px";
  currentId.style.borderTopWidth = "0px";
  formulas.innerText = "";
}

function onCellInput(e) {
  formulas.innerText = e.target.innerText;
}

function changeButtonState(button, selectedButton) {
  if (selectedButton) {
    button.classList.add("active-option");
  } else {
    button.classList.remove("active-option");
  }
}

function manageButtonState(computedStyle) {
  //bold
  changeButtonState(bold, activeOptionsState.isBoldSelected);

  //italic
  changeButtonState(italic, activeOptionsState.isItalicSelected);

  //underline
  changeButtonState(underline, activeOptionsState.isUnderLineSelected);

  //textAlign
  highlightTextAlignButton(activeOptionsState.textAlign);
}

function onClickBold(boldButton) {
  boldButton.classList.toggle("active-option");

  if (activeCell) {
    activeCell.classList.toggle("bold");
    console.log(activeCell);
    activeOptionsState.isBoldSelected = !activeOptionsState.isBoldSelected;
  }
}

function onClickItalic(italicButton) {
  italicButton.classList.toggle("active-option");
  if (activeCell) {
    activeCell.classList.toggle("italic");
    activeOptionsState.isItalicSelected = !activeOptionsState.isItalicSelected;
  }
}

function onClickUnderline(underlineButton) {
  underlineButton.classList.toggle("active-option");

  if (activeCell) {
    activeCell.classList.toggle("underline");
    activeOptionsState.isUnderLineSelected =
      !activeOptionsState.isUnderLineSelected;
  }
}

function onClickCopy() {}
function onClickCut() {}
function onClickPaste() {}

function highlightTextAlignButton(textAlignValue) {
  for (let i = 0; i < textAlignELements.length; i++) {
    if (textAlignELements[i].getAttribute("data-value") === textAlignValue) {
      textAlignELements[i].classList.add("active-option");
    } else {
      textAlignELements[i].classList.remove("active-option");
    }
  }
}

function onClickTextAlign(textAlignButton) {
  let selectedValue = textAlignButton.getAttribute("data-value");

  highlightTextAlignButton(selectedValue);

  if (activeCell) {
    activeCell.style.textAlign = selectedValue;
    activeOptionsState.textAlign = selectedValue;
  }
}

function onChangeTextColor(textColorInput) {
  if (activeCell) {
    activeCell.style.color = textColorInput.value;
    activeOptionsState.textColor = textColorInput.value;
  }
}

function onChangeBackgroundColor(textColorInput) {
  if (activeCell) {
    activeCell.style.backgroundColor = textColorInput.value;
    activeOptionsState.backgroundColor = textColorInput.value;
  }
}
