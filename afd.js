class AFD {
  constructor(lenguage, startNode, endNodes, transitionMatrix) {
    this.lenguage = lenguage;
    this.startNode = startNode;
    this.endNodes = endNodes;
    this.transitionMatrix = transitionMatrix;
  }

  solve(inputStr) {
    let solution = this.solveRecursive(inputStr, this.startNode);
    let splitSolution = solution.split("/");
    const finalState = parseInt(splitSolution[splitSolution.length - 1]);
    return {
      solution: solution,
      isSolvable: this.endNodes.indexOf(finalState) !== -1,
    };
  }

  solveRecursive(inputStr, actualNode) {
    let nextNode = this.nextNode(actualNode, inputStr[0]);
    if (inputStr.length === 1) {
      return actualNode + "/" + nextNode;
    } else {
      return (
        actualNode +
        "/" +
        this.solveRecursive(inputStr.slice(1, inputStr.length), nextNode)
      );
    }
  }

  nextNode(actualNode, input) {
    return this.transitionMatrix[actualNode][this.lenguage.indexOf(input)];
  }
}
