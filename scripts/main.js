"use strict";
const DB = {
  attributes: ATTRIBUTES,
  skills: SKILLS,
  concepts: CONCEPTS,
};

// conceptBox variables
const conceptBox = document.querySelector(".conceptBox");

/* ======================================================
Transform value into dots
====================================================== */
function _dots_for_points(value) {
  let returnString = "";
  for (let i = 0; i < 5; i++) {
    if (value > i) returnString += "●";
    else returnString += "○";
  }
  return returnString;
}

/* ======================================================
Function to collapse "elem"
====================================================== */
function _collapseElement(elem) {
  // debugger;
  elem.style.height = "";
  elem.style.transition = "none";
  const startHeight = window.getComputedStyle(elem).height;

  // Remove the collapse class, and force a layout calculation to get the final height
  elem.classList.toggle("collapsed");
  const height = window.getComputedStyle(elem).height;

  // Set the start height to begin the transition
  elem.style.height = startHeight;

  // wait until the next frame so that everything has time to update before starting the transition
  requestAnimationFrame(() => {
    elem.style.transition = "";

    requestAnimationFrame(() => {
      elem.style.height = height;
    });
  });

  // Clear the saved height values after the transition
  elem.addEventListener("transitionend", () => {
    elem.style.height = "";
  });
}
