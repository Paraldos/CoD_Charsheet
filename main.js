"use strict";

/* ========= concepts ========= */
// Create Concepts
function _create_concepts() {
  // get container
  let concepts = document.getElementById("concepts");

  // empty container
  concepts.innerHTML = ``;

  // fill container with concepts
  _create_concept("name");
  _create_concept("age");
  _create_concept("player");
  _create_concept("chronicle");
  _create_concept("concept");
}
_create_concepts();

function _create_concept(conc) {
  // example how a concept should look like
  // <div id="concepts_name" class="col-lg-6 col-sm-12"></div>

  // create new concept
  let newDiv = document.createElement("div");
  newDiv.id = `concepts_${conc}`;
  newDiv.classList.add("col-lg-6");
  newDiv.classList.add("col-sm-12");
  newDiv.innerText = `${DB[conc].label}: ${DB[conc].value}`;

  // add concept to container
  concepts.appendChild(newDiv);
}

// Update Concepts
function _update_concepts() {
  // general concepts
  _update_concept("name");
  _update_concept("age");
  _update_concept("player");
  _update_concept("chronicle");
  _update_concept("concept");
}

function _update_concept(conc) {
  let domElement = document.getElementById(`concepts_${conc}`);
  domElement.innerText = `${DB[conc].label}: ${DB[conc].value}`;
}

/* ========= aspirations ========= */
function _create_aspirations() {
  // get container from DOM
  let aspirations = document.getElementById("aspirations");

  // Empty container
  aspirations.innerHTML = ``;

  // Fill container with aspirations
  _create_aspiration("aspiration1");
  _create_aspiration("aspiration2");
  _create_aspiration("aspiration3");
}
_create_aspirations();

function _update_aspirations() {
  _update_aspiration("aspiration1");
  _update_aspiration("aspiration2");
  _update_aspiration("aspiration3");
}

function _create_aspiration(asp) {
  // Example of how an spiration should look like
  // <div id="aspiration1" class="col-12"></div>

  // create new aspiration
  let newDiv = document.createElement("div");
  newDiv.id = `asp`;
  newDiv.classList.add("col-12");
  newDiv.innerText = `${DB[asp].value}`;

  // add aspiration to container
  aspirations.appendChild(newDiv);
}

function _update_aspiration(asp) {
  let domElement = document.getElementById(asp);
  domElement.innerText = `${DB[asp].value}`;
}

/* ========= basics ========= */

function _update_basics() {
  _basics_concept("name");
  _basics_concept("age");
  _basics_concept("player");
  _basics_concept("chronicle");
  _basics_concept("concept");
}
_update_basics();

function _basics_concept(elem) {
  let domElement = document.getElementById(`basics_${elem}`);
  domElement.addEventListener("input", () => {
    DB[elem].value = domElement.value;
    _update_concepts();
  });
}
