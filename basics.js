"use strict";

const basics_concepts = document.getElementById("basics_concepts");
const defense_without_athletics = document.getElementById(
  "defense_without_athletics"
);
const no_aspirations = document.getElementById("no_aspirations");

/* ========= housrules ========= */
defense_without_athletics.checked = DB.housrules.defense_without_athletics;
defense_without_athletics.addEventListener("input", () => {
  DB.housrules.defense_without_athletics = defense_without_athletics.checked;
  _create_advantages();
});

no_aspirations.checked = DB.housrules.no_aspirations;
no_aspirations.addEventListener("input", () => {
  DB.housrules.no_aspirations = no_aspirations.checked;
  _create_concepts();
  _create_basics_concepts();
});

/* ========= basics concepts ========= */
function _create_basics_concepts() {
  basics_concepts.innerHTML = `<h5>Concepts</h5>`; // Empty container and add header
  for (let concept of concepts) _create_basics_concept(concept); // Add concepts
}
_create_basics_concepts();

function _create_basics_concept(concept) {
  /* Example:
  <div>
    <label for="basics_name" class="form-label">Name</label>
    <input type="text" class="form-control" id="basics_name" />
  </div> */

  // skip if aspiration housrule is off
  if (DB.housrules.no_aspirations && concept.search(/aspiration./) >= 0) return;

  // newDiv
  let newDiv = document.createElement("div");
  newDiv.classList.add("m-2");
  basics_concepts.appendChild(newDiv);

  // newLabel
  let newLabel = document.createElement("label");
  newLabel.setAttribute(`for`, `basics_${concept}`);
  newLabel.classList.add("form-label");
  newLabel.innerText = DB.concepts[concept].label;
  newDiv.appendChild(newLabel);

  // newInput
  let newInput = document.createElement("input");
  newInput.setAttribute(`type`, "text");
  newInput.classList.add("form-control");
  newInput.id = `basics_${concept}`;
  newInput.value = DB.concepts[concept].value;
  newDiv.appendChild(newInput);

  // eventListener
  newInput.addEventListener("input", () => {
    DB.concepts[concept].value = newInput.value;
    _create_concepts();
  });
}
