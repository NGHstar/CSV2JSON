let convertButton = document.querySelector(".convert");
let inputText = document.querySelector(".csv-text-input");
let outputText = document.querySelector(".json-text-output");
let errorLabel = document.querySelector(".error-label");
let readButton = document.querySelector(".read-button");
let chooseFileInput = document.getElementById("csv-file");

readButton.addEventListener("click", () => {
  if (chooseFileInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function (e) {
      inputText.value = e.target.result;
    };
    reader.readAsText(chooseFileInput.files[0]);
  }
});

convertButton.addEventListener("click", convert);

function validation(lines, firstLine) {
  inputText.classList.remove("error");
  errorLabel.classList.remove("visible");

  let isValid = !lines.some(
    (line) => line.split(",").length !== firstLine.length
  );

  if (!isValid) {
    inputText.classList.add("error");
    errorLabel.textContent = "فرمت CSV معتبر نیست!";
    errorLabel.classList.add("visible");
  }

  return isValid;
}

function convert() {
  let text = inputText.value.trim();
  if (!text) {
    errorLabel.textContent = "ورودی خالی است!";
    errorLabel.classList.add("visible");
    return;
  }

  let lines = text.split(/\r?\n/);
  let keys = lines[0].split(",");

  if (!validation(lines, keys)) return;

  let jsonArray = lines.slice(1).map((line) => {
    let values = line.split(",");
    return Object.fromEntries(keys.map((key, i) => [key, values[i] || ""]));
  });

  outputText.value = JSON.stringify(jsonArray, null, 2);
}
