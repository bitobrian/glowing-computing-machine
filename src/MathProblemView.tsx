import { useEffect, useState } from "react";
import { getMathProblem, saveCurrentIndex, saveMathProblem } from "./MathGame";
import { MathProblem } from "./MathProblem";

export interface MathProblemViewProps {
  firstNumber: number;
  secondNumber: number;
  answer: number;
}

export const MathProblemView = () => {
  const [index, setIndex] = useState(0);
  const [currentProblem, setCurrentProblem] = useState<MathProblemViewProps>({
    firstNumber: 0,
    secondNumber: 0,
    answer: 0,
  });
  const [complete, setComplete] = useState(false);
  const [percentageCorrect, setPercentageCorrect] = useState(0);

  const wrongAnswers = [
    currentProblem.answer - 1,
    currentProblem.answer + 1,
    currentProblem.answer + 2,
  ];

  // randomize order of answers
  const answers = [currentProblem.answer, ...wrongAnswers].sort(
    () => Math.random() - 0.5
  );

  const checkAnswer = (selectedAnswer: number) => {
    setCurrentProblem(getMathProblem(index));
    const isCorrect = currentProblem.answer === selectedAnswer;

    const tempProblem: MathProblem = {
      ...currentProblem,
      correct: isCorrect,
      answer: selectedAnswer,
    };

    saveMathProblem(tempProblem, index);

    // Move to the next problem
    const nextIndex = index + 1;
    if (nextIndex === 30) {
      // loop through all problems and calculate percentage correct
      let correctCount = 0;
      for (let i = 0; i < 30; i++) {
        const problem = getMathProblem(i);
        if (problem.correct) {
          correctCount++;
        }
      }
      
      const percentCorrect = Math.ceil((correctCount / 30) * 100);
      setPercentageCorrect(percentCorrect);

      saveCurrentIndex(0);
      setComplete(true);
      return;
    }
    saveCurrentIndex(nextIndex);
    setIndex(nextIndex);
  };

  const resetGame = () => {
    saveCurrentIndex(0);
    setComplete(false);
    window.location.reload();
  }

  useEffect(() => {
    setCurrentProblem(getMathProblem(index));
  }, [index]);

  return (
    <div>
      {!complete ? (
        <>
          <h1>Mathable</h1>
          <h2>Problem {index + 1}</h2>
          <p>
            {currentProblem.firstNumber} x {currentProblem.secondNumber}
          </p>
          <div>
            {answers.map((answer, i) => (
              <button key={i} onClick={() => checkAnswer(answer)}>
                {answer}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div>
          <h1>Mathable</h1>
          <h2>Complete!</h2>
          <p>You got {percentageCorrect}% correct!</p>
        </div>
      )}
        <button onClick={resetGame}>Reset</button>
    </div>
  );
};
