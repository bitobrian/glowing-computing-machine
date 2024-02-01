import { MathProblem } from "./MathProblem";

export function initializeGame(keyMultiple: number) {
    // create 30 math problems with the keyMultiple as the first number and a random second number from 0 to 12
    const problems: MathProblem[] = [];

    for (let i = 0; i < 30; i++) {
        const theSecondNumber = Math.floor(Math.random() * 13);
        problems.push({
            firstNumber: keyMultiple,
            secondNumber: theSecondNumber,
            answer: keyMultiple * theSecondNumber
        });
    }

    // save the problems to local storage
    localStorage.setItem("mathProblems", JSON.stringify(problems));
}

export function getMathProblem(index: number): MathProblem {
    // get the problems from local storage
    const problems: MathProblem[] = JSON.parse(localStorage.getItem("mathProblems") || "[]");

    // return the problem at the index
    return problems[index];
}

export function saveMathProblem(problem: MathProblem, index: number) {
    // get the problems from local storage
    const problems: MathProblem[] = JSON.parse(localStorage.getItem("mathProblems") || "[]");

    // update the problem at the index
    problems[index] = problem;

    // save the problems to local storage
    localStorage.setItem("mathProblems", JSON.stringify(problems));
}

export function saveKeyMultiple(keyMultiple: number) {
    // save the keyMultiple to local storage
    localStorage.setItem("keyMultiple", keyMultiple.toString());
}

export function getKeyMultiple(): number {
    // get the keyMultiple from local storage
    return parseInt(localStorage.getItem("keyMultiple") || "0");
}

export function saveCurrentIndex(index: number) {
    // save the index to local storage
    localStorage.setItem("currentIndex", index.toString());
}

export function getCurrentIndex(): number {
    // get the index from local storage
    return parseInt(localStorage.getItem("currentIndex") || "0");
}