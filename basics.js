"use strict";

const basics_concepts = document.getElementById("basics_concepts");

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
    _update_concepts();
  });
}
