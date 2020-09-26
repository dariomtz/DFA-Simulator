class AFD {
  constructor(lenguage, startNode, endNodes, transitionMatrix) {
    this.lenguage = lenguage;
    this.startNode = startNode;
    this.endNodes = endNodes;
    this.transitionMatrix = transitionMatrix;
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

  isSolvable(inputStr, actualNode) {
    let nextNode = this.nextNode(actualNode, inputStr[0]);
    if (inputStr.length === 1) {
      if (this.endNodes.indexOf(nextNode) === -1) {
        return false;
      }
      return true;
    } else {
      return this.isSolvable(inputStr.slice(1, inputStr.length), nextNode);
    }
  }
}
