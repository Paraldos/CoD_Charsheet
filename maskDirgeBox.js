"use strict";
const maskDirgeBox = document.querySelector(".maskDirgeBox");

/* ======================================================
Main function for the maskDirgeBox
====================================================== */
function _maskDirgeBox() {
  maskDirgeBox.innerHTML = `
    <h1>Mask and Dirge</h1>
    <li class="maskDirgeBox_status">
      <p><b>Current Mask:</b> ${_get_current_mask().label}</p>
      <p><b>Current Dirge:</b> ${_get_current_dirge().label}</p>
    </li>`;
  DB.masksAndDirges.forEach((el, index) => _maskDirgeBox_options(el, index));
  _maskDirgeBox_collapse();
  _maskDirgeBox_buttons();
}

/* ============ append label ============ */
let _get_current_mask = () => DB.masksAndDirges[DB.mask.value];

let _get_current_dirge = () => DB.masksAndDirges[DB.dirge.value];

/* ======================================================
add functionallity to buttons
====================================================== */
function _maskDirgeBox_buttons() {
  let maskBtns = document.querySelectorAll(".maskBtn");
  let dirgeBtns = document.querySelectorAll(".dirgeBtn");

  for (let i = 0; i < maskBtns.length; i++) {
    maskBtns[i].addEventListener("click", () => {
      DB.mask.value = i;
      _maskDirgeBox_update();
    });
    dirgeBtns[i].addEventListener("click", () => {
      DB.dirge.value = i;
      _maskDirgeBox_update();
    });
  }
}

/* ============ update current mask and dirge ============ */
function _maskDirgeBox_update() {
  let cMaskLabel = _get_current_mask().label;
  let cDirgeLabel = _get_current_dirge().label;
  let maskDirgeBox_status = document.querySelector(".maskDirgeBox_status");
  maskDirgeBox_status.innerHTML = `
  <p><b>Current Mask:</b> ${cMaskLabel}</p>
  <p><b>Current Dirge:</b> ${cDirgeLabel}</p>
  `;
}

/* ======================================================
add collaps function
====================================================== */
function _maskDirgeBox_collapse() {
  let buttons = document.querySelectorAll(".maskDirgeBox_option");
  let infos = document.querySelectorAll(".maskDirgeBox_info");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => _collapseElement(infos[i]));
  }
}

/* ======================================================
add options
====================================================== */
function _maskDirgeBox_options(el, index) {
  let newEl = document.createElement("li");
  newEl.innerHTML = `
  <button class="maskDirgeBox_option">
    <p>${el.label}</p>
    <p class="required"></p>
  </button>
  <div class="maskDirgeBox_info collapsed"> 
    <p>${el.description}</p>
    <p><b>Single Willpower:</b> ${el.singleWillpower}</p>
    <p><b>All Willpower:</b> ${el.allWillpower}</p>
    <div class="buttons">
      <button class="maskBtn">Choose for Mask</button>
      <button class="dirgeBtn">Choose for Dirge</button>
    </div>
  </div>`;
  maskDirgeBox.appendChild(newEl);
}

/*
<div class="maskDirgeBox_option btn">
  <p>${el.label}</p>
  <p class="required"></p>
</div>
<div class="maskDirgeBox_info collapsed"> 
  <p>${el.description}</p>
  <p><b>Single Willpower:</b> ${el.singleWillpower}</p>
  <p><b>All Willpower:</b> ${el.allWillpower}</p>
  <div class="buttons">
    <button class="maskDirgeBox_maskBtn btn">Choose for Mask</button>
    <button class="maskDirgeBox_dirgeBtn btn">Choose for Dirge</button>
  </div>
</div>`;
*/
