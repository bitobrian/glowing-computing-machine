import { useState } from "react";
import { initializeGame, saveCurrentIndex, saveKeyMultiple } from "./MathGame";
import { MathProblemView } from "./MathProblemView";

function saveSelectedKeyNumber(keyNumber: number) {
  saveKeyMultiple(keyNumber);
  saveCurrentIndex(0);
}

export const BigTaco = () => {
  const [isReady, setIsReady] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const selectKeyNumber = (keyNumber: number) => {
    saveSelectedKeyNumber(keyNumber);
    initializeGame(keyNumber);
    setIsReady(true);
  };

  return (
    <>
      {isReady ? (
        hasStarted ? (
            <MathProblemView />
        ) : (
          <div>
            <h1>Mathable</h1>
            <p>Mathable is ready to go!</p>
            <button onClick={() => setHasStarted(true)}>Start</button>
          </div>
        )
      ) : (
        <div>
          <h1>Mathable</h1>
          <h2>Select a number</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "10px",
            }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <button key={i} onClick={() => selectKeyNumber(i + 1)}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
