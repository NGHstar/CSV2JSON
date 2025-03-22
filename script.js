let convertButton = document.querySelector(".convert");
let inputText = document.querySelector(".csv-text-input");
let outputText = document.querySelector(".json-text-output");
let errorLabel = document.querySelector(".error-label");

convertButton.addEventListener("click", () => {
  convert();
});

function validation(lines, firstLine) {
  //---
  inputText.classList.remove("error");
  errorLabel.classList.remove("visible");

  let isValid = !lines.some(
    (line) => line.split(",").length !== firstLine.length
  );

  if (!isValid) {
    inputText.classList.add("error");
    errorLabel.classList.add("visible");
  }

  return isValid;
}

function convert() {
  let text = inputText.value;
  let lines = text.trim().split(`\n`);
  let firstLine = lines[0].split(",");
  if (!validation(lines, firstLine)) return;
  let outputJson = "[";
  let range = firstLine.length;
  for (let i = 1; i < lines.length; i++) {
    let line = lines[i].split(",");
    let singleItem = "{";
    for (let j = 0; j < range; j++) {
      let camma = j === range - 1 ? "" : ",";
      singleItem += `\"${firstLine[j]}\":\"${line[j]}\"${camma}`;
    }
    if (i !== lines.length - 1) singleItem += "},";
    else singleItem += "}";
    outputJson += singleItem;
  }
  outputJson += "]";
  outputText.value = outputJson;
}
