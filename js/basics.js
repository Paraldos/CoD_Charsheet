"use strict";

const defense_without_athletics = document.getElementById(
  "defense_without_athletics"
);
const no_aspirations = document.getElementById("no_aspirations");

/* ========= housrules ========= */
defense_without_athletics.checked = DB.housrules.defense_without_athletics;
defense_without_athletics.addEventListener("input", () => {
  DB.housrules.defense_without_athletics = defense_without_athletics.checked;
  _update_all();
});

no_aspirations.checked = DB.housrules.no_aspirations;
no_aspirations.addEventListener("input", () => {
  DB.housrules.no_aspirations = no_aspirations.checked;
  _update_all();
});

/* ========= basics concepts ========= */
function _create_basics_concepts() {
  let container = document.getElementById("basics_concepts");
  container.innerHTML = `<h5>Concepts</h5>`;
  DB.concepts.forEach((concept) => _create_basics_concept(concept, container));
}
_create_basics_concepts();

function _create_basics_concept(concept, container) {
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
  container.appendChild(newDiv);

  // newLabel
  let newLabel = document.createElement("label");
  newLabel.setAttribute(`for`, `basics_${concept}`);
  newLabel.classList.add("form-label");
  newLabel.innerText = concept.label;
  newDiv.appendChild(newLabel);

  // newInput
  let newInput = document.createElement("input");
  newInput.setAttribute(`type`, "text");
  newInput.classList.add("form-control");
  newInput.value = concept.value;
  newDiv.appendChild(newInput);

  // eventListener
  newInput.addEventListener("input", () => {
    concept.value = newInput.value;
    _update_all();
  });
}
