let textArea = document.getElementById("afd-input");
let button = document.getElementById("run-afd");
let output = document.getElementById("afd-output");
let outputDiv = document.getElementById("afd-output-div");

let currentDFA = null;

//P5
let canvasDiv = document.getElementById("p5Canvas");
let w = canvasDiv.getBoundingClientRect().width;
let nodes = [];
let circlesDiameter;
function setup() {
  let canvas = createCanvas(w, 400);
  canvas.parent("p5Canvas");
  circlesDiameter = 50;
  background(190);
}

function draw() {
  background(190);
  translate(width / 2, height / 2);
  if (currentDFA) {
    connectNodes();
    drawNodes();
  } else {
  }
}

function connectNodes() {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < currentDFA.language.length; j++) {
      if (currentDFA.transitionMatrix[i][j] !== i) {
        let x1 = nodes[i].x;
        let y1 = nodes[i].y;

        let x2 = nodes[currentDFA.transitionMatrix[i][j]].x;
        let y2 = nodes[currentDFA.transitionMatrix[i][j]].y;

        line(x1, y1, x2, y2);
      }
    }
  }
}

function arrow(x1, y1, x2, y2) {
  line(x1, y1, x2, y2);
  angleMode(RADIANS);
  let offset = 50;
  push(); //start new drawing state
  var angle = atan2(y1 - y2, x1 - x2); //gets the angle of the line
  translate(x2, y2); //translates to the destination vertex
  rotate(angle - HALF_PI); //rotates the arrow point
  triangle(-offset * 0.5, offset, offset * 0.5, offset, 0, 0); //draws the arrow point as a triangle
  pop();
}
function drawNodes() {
  for (let i = 0; i < nodes.length; i++) {
    circle(nodes[i].x, nodes[i].y, circlesDiameter);
    rectMode(CENTER);
    text(i, nodes[i].x, nodes[i].y);
  }
}

function generateNodes() {
  let totalNodes = currentDFA.transitionMatrix.length;
  let margin = 5;
  let diameter = height - 2 * margin;
  let tetha = 365 / totalNodes;

  angleMode(DEGREES);

  for (let i = 0; i < totalNodes; i++) {
    let x = (cos(tetha * i) * diameter) / 2;
    let y = (sin(tetha * i) * diameter) / 2;
    nodes.push({
      x: x,
      y: y,
    });
  }
}

button.onclick = () => {
  output.innerText = "Processing...";

  currentDFA = null;
  nodes = [];

  let inputLines = textArea.value !== "" ? textArea.value.split("\n") : [];
  if (inputLines.length < 5) {
    wrongFormat();
    return;
  }

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

  currentDFA = new DFA(lenguage, startNode, endNodes, transitionMatrix);
  console.log(currentDFA);
  generateNodes();
  console.log(nodes);

  const { solution, isSolvable } = currentDFA.solve(inputString);

  resetAlert();

  if (isSolvable) {
    output.innerText = "Accepted. States: " + solution;
    outputDiv.classList.add("alert-success");
  } else {
    output.innerText = "Refused. States: " + solution;
    outputDiv.classList.add("alert-danger");
  }
};

function wrongFormat() {
  resetAlert();
  output.innerText = "Wrong format.";
  outputDiv.classList.add("alert-warning");
}

function resetAlert() {
  outputDiv.classList.remove("alert-primary");
  outputDiv.classList.remove("alert-danger");
  outputDiv.classList.remove("alert-warning");
  outputDiv.classList.remove("alert-success");
}
