let textArea = document.getElementById("afd-input");
let button = document.getElementById("run-afd");
let output = document.getElementById("afd-output");
let outputDiv = document.getElementById("afd-output-div");

let actualAFD = null;

//P5
let canvasDiv = document.getElementById("p5Canvas");

let w = canvasDiv.getBoundingClientRect().width;
let h = canvasDiv.getBoundingClientRect().height;
console.log(w + " " + h);

function setup() {
  let canvas = createCanvas(w, 300);
  canvas.parent("p5Canvas");

  background(255);
}

function draw() {
  if (actualAFD) {
    let totalNodes = actualAFD.transitionMatrix.length;
    let margin = 50;
    let workingSpace = width - 2 * margin;
    let radius = height / 3;
    for (let i = 0; i < totalNodes; i++) {
      circle(
        radius + margin + (workingSpace / totalNodes) * i,
        height / 2,
        radius
      );
    }
  }
}

button.onclick = () => {
  output.innerText = "Processing...";
  let inputLines = textArea.value !== "" ? textArea.value.split("\n") : [];
  if (inputLines.length >= 5) {
    //Data validation
    let inputString = inputLines[0];

    let lenguage = inputLines[1].split(";");
    lenguage.pop();

    let startNode = Number(inputLines[2]);

    let endNodes = [];
    inputLines[3].split(";").forEach((element) => {
      if (element !== "") {
        endNodes.push(Number(element));
      }
    });

    transitionMatrix = [];
    for (let y = 4; y < inputLines.length; y++) {
      let newRow = [];
      inputLines[y].split(";", inputLines[y].length).forEach((element) => {
        newRow.push(Number(element));
      });
      newRow.pop();
      transitionMatrix.push(newRow);
    }

    actualAFD = new AFD(lenguage, startNode, endNodes, transitionMatrix);
    console.log(actualAFD);

    if (actualAFD.isSolvable(inputString, startNode)) {
      output.innerText =
        "Accepted. States: " + actualAFD.solveRecursive(inputString, startNode);
      outputDiv.classList.remove("alert-primary");
      outputDiv.classList.remove("alert-danger");
      outputDiv.classList.remove("alert-warning");
      outputDiv.classList.add("alert-success");
    } else {
      output.innerText = "Refused.";
      outputDiv.classList.remove("alert-primary");
      outputDiv.classList.remove("alert-success");
      outputDiv.classList.remove("alert-warning");
      outputDiv.classList.add("alert-danger");
    }
  } else if (textArea.value === "") {
    output.innerText = "Empty.";
    outputDiv.classList.remove("alert-primary");
    outputDiv.classList.remove("alert-success");
    outputDiv.classList.remove("alert-danger");
    outputDiv.classList.add("alert-warning");
  } else {
    output.innerText = "Wrong format.";
    outputDiv.classList.remove("alert-primary");
    outputDiv.classList.remove("alert-success");
    outputDiv.classList.remove("alert-danger");
    outputDiv.classList.add("alert-warning");
  }
};
