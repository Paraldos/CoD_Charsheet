"use strict";
const aspirationBox = document.querySelector(".aspirationBox");

/* ======================================================
Create aspirationBox
====================================================== */
function _aspirationBox() {
  aspirationBox.innerHTML = `
  <p>Aspirations</p>
  <Input class="aspiration" type="text" value="${DB.aspirations[0]}"></Input>
  <Input class="aspiration" type="text" value="${DB.aspirations[1]}"></Input>
  <Input class="aspiration" type="text" value="${DB.aspirations[2]}"></Input>`;
  _add_aspiration_change_listener();
}
_aspirationBox();

/* ============ add event listener to change aspirations ============ */
function _add_aspiration_change_listener() {
  let aspirations = document.querySelectorAll(".aspiration");
  for (let i = 0; i < aspirations.length; i++) {
    aspirations[i].addEventListener(
      "keyup",
      () => (DB.aspirations[i] = aspirations[i].value)
    );
  }
}
