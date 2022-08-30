"use strict";

/* ========= basics concepts ========= */
const basics_concepts = document.getElementById("basics_concepts");

function _create_basics_concepts() {
  basics_concepts.innerHTML = `<h5>Concepts</h5>`; // Empty container and add header
  for (let i of concepts) _create_basics_concept(i); // Add concepts
}
_create_basics_concepts();

function _create_basics_concept(element) {
  /* Example:
  <div>
    <label for="basics_name" class="form-label">Name</label>
    <input type="text" class="form-control" id="basics_name" />
  </div> */

  // newDiv
  let newDiv = document.createElement("div");
  basics_concepts.appendChild(newDiv);

  // newLabel
  let newLabel = document.createElement("label");
  newLabel.setAttribute(`for`, `basics_${element}`);
  newLabel.classList.add("form-label");
  newLabel.innerText = DB.concepts[element].label;
  newDiv.appendChild(newLabel);

  // newInput
  let newInput = document.createElement("input");
  newInput.setAttribute(`type`, "text");
  newInput.classList.add("form-control");
  newInput.id = `basics_${element}`;
  newInput.value = DB.concepts[element].value;
  newDiv.appendChild(newInput);

  // eventListener
  newInput.addEventListener("input", () => {
    DB.concepts[element].value = newInput.value;
    _update_concepts();
  });
}

/* ========= basics aspirations ========= */
const basics_aspirations = document.getElementById("basics_aspirations");

function _create_basics_aspirations() {
  basics_aspirations.innerHTML = `<h5>Aspirations</h5>`; // Empty conctainer and add header
  for (let number in DB.aspirations) _create_basics_aspiration(number); // add aspirations
}
_create_basics_aspirations();

function _create_basics_aspiration(i) {
  /* Example:
  <div class="mb-3">
    <input type="text" class="form-control" id="basics_aspiration1" />
  </div> */

  // newDiv
  let newDiv = document.createElement("div");
  newDiv.classList.add("mb-3");
  basics_aspirations.appendChild(newDiv);

  // newInput
  let newInput = document.createElement("input");
  newInput.setAttribute(`type`, "text");
  newInput.classList.add("form-control");
  newInput.id = `basics_aspiration${i + 1}`;
  newInput.value = DB.aspirations[i].value;
  newDiv.appendChild(newInput);

  // eventListener
  newInput.addEventListener("input", () => {
    DB.aspirations[i].value = newInput.value;
    _update_aspirations();
  });
}
