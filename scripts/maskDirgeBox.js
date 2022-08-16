"use strict";
const maskDirgeBox = document.querySelector(".maskDirgeBox");

/* ======================================================
Main function for the Mask and Dirge change section
====================================================== */
function _maskDirgeBox() {
  let cMaskLabel = MASKS_AND_DIRGES[DB.concepts.mask.value].label;
  let cDirgeLabel = MASKS_AND_DIRGES[DB.concepts.dirge.value].label;
  maskDirgeBox.innerHTML = `
    <li class="header">Mask and Dirge</h1>
    <li class="maskDirgeBox_status">
      <p><b>Current Mask:</b> ${cMaskLabel}</p>
      <p><b>Current Mask:</b> ${cDirgeLabel}</p>
    </li>`;
  MASKS_AND_DIRGES.forEach((el) => _maskDirgeBox_add_options(el));
  _maskDirgeBox_collapse();
  _maskDirgeBox_chooseButtons();
}
_maskDirgeBox();

/* ======================================================
Choose Buttons
====================================================== */
function _maskDirgeBox_chooseButtons() {
  let maskBtns = document.querySelectorAll(".maskDirgeBox_maskBtn");
  let dirgeBtns = document.querySelectorAll(".maskDirgeBox_dirgeBtn");
  for (let i = 0; i < maskBtns.length; i++) {
    maskBtns[i].addEventListener("click", () => {
      DB.concepts.mask.value = i;
      _update_currentMaskAndDirge();
    });
    dirgeBtns[i].addEventListener("click", () => {
      DB.concepts.dirge.value = i;
      _update_currentMaskAndDirge();
    });
  }
}

function _update_currentMaskAndDirge() {
  let cMaskLabel = MASKS_AND_DIRGES[DB.concepts.mask.value].label;
  let cDirgeLabel = MASKS_AND_DIRGES[DB.concepts.dirge.value].label;
  let maskDirgeBox_status = document.querySelector(".maskDirgeBox_status");
  maskDirgeBox_status.innerHTML = `
  <p><b>Current Mask:</b> ${cMaskLabel}</p>
  <p><b>Current Mask:</b> ${cDirgeLabel}</p>`;
}

/* ======================================================
Add Collapse for maskDirgeBox
====================================================== */
function _maskDirgeBox_collapse() {
  let buttons = document.querySelectorAll(".maskDirgeBox_option");
  let infos = document.querySelectorAll(".maskDirgeBox_info");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => _collapseElement(infos[i]));
  }
}

/* ======================================================
Build and add the options for the Mask and Dirge List
====================================================== */
function _maskDirgeBox_add_options(el) {
  let newEl = document.createElement("li");
  newEl.innerHTML = `
  <div class="maskDirgeBox_option btn">
    <p>${el.label}</p>
    <p class="required">Clan Specific: --</p>
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
  maskDirgeBox.appendChild(newEl);
}
