/**
 * Class DFA. Creates an 
 */
class DFA {
  /**
   * Creates an instance of DFA.
   * @param {Array} language Includes all the simbols of the language
   * @param {Integer} startNode The begining state of the DFA
   * @param {Array} endNodes Includes all of the states (as Integers) of the DFA that are final
   * @param {Array} transitionMatrix Array of Arrays representing the transition matrix of the DFA
   */
  constructor(language, startNode, endNodes, transitionMatrix) {
    this.language = language;
    this.startNode = startNode;
    this.endNodes = endNodes;
    this.transitionMatrix = transitionMatrix;
  }

  /**
   * Evaluates the given string to check whether or not it belongs to the language.
   * Uses @method solveRecursive with the start node specified in @constructor.
   * 
   * @param {String} inputStr The word to evaluate
   * @returns An object that specifies the path taken while to this word
   *          was processed and whether or not the last state is final.
   */
  solve(inputStr) {
    let solution = this.solveRecursive(inputStr, this.startNode);
    let splitSolution = solution.split("/");
    const finalState = parseInt(splitSolution[splitSolution.length - 1]);
    return {
      solution: solution,
      isSolvable: this.endNodes.indexOf(finalState) !== -1,
    };
  }

  /**
   * Evaluates a given string to check whether or not it belongs.
   * to the language starting at the given node.
   * Uses @method nextNode to get the next node of the first character in the string.
   * Calls itself recursively until the string is finished processing.
   * 
   * @param {String} inputStr The word to evaluate.
   * @param {Integer} currentNode The node the word is currently at, to continue evaluation.
   */
  solveRecursive(inputStr, currentNode) {
    let nextNode = this.nextNode(currentNode, inputStr[0]);
    if (inputStr.length === 1) {
      return currentNode + "/" + nextNode;
    } else {
      return (
        currentNode +
        "/" +
        this.solveRecursive(inputStr.slice(1, inputStr.length), nextNode)
      );
    }
  }

  /**
   * Uses transitionMatrix to get the next node given a Character.
   * 
   * @param {Integer} node The node to move from.
   * @param {String} character Character (String of lenght 1) to use to move.
   */
  nextNode(node, character) {
    return this.transitionMatrix[node][this.language.indexOf(character)];
  }
}
