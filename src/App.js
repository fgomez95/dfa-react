import React, { useState } from "react";
import { create } from "./dfa";

function App() {
  const [stateName, setStateName] = useState("");
  const [transitionValue, setTransitionValue] = useState("");
  const [transition, setTransition] = useState("");

  const [transitions, setTransitions] = useState([]);
  const [states, setStates] = useState([]);

  const [definition, setDefinition] = useState({});
  const [testInput, setTestInput] = useState("");

  const handleAddState = () => {
    let transitionsFormatted = {};
    transitions.forEach((tr) => {
      transitionsFormatted = { ...transitionsFormatted, ...tr };
    });
    const newState = {
      name: stateName,
      transitions: transitionsFormatted,
    };

    setStates([...states, newState]);
    setTransition("");
    setStateName("");
    setTransitionValue("");
    setTransitions([]);
  };

  const handleAddTransition = () => {
    const newTransition = { [transition]: transitionValue };
    const newTransitions = [...transitions, newTransition];
    setTransitions(newTransitions);
  };

  const handleCreateDefinition = () => {
    let formattedStates = {};
    states.forEach((st) => {
      formattedStates = { ...formattedStates, [st.name]: st.transitions };
    });
    const newDefinition = {
      start: "START",
      finals: ["SB"],
      states: formattedStates,
    };
    setDefinition(newDefinition);
  };

  const validateTestInput = () => {
    const machine = create(definition);
    console.log(machine.accept(testInput));
  };

  return (
    <div className="App">
      <div>
        Current:
        <div>
          {states.map((s, i) => {
            return (
              <div key={i}>
                <h4>{s.name}</h4>
                <ul>{JSON.stringify(s.transitions)}</ul>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h3>Define states</h3>
        <div>
          name:{" "}
          <input
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
          />
          <br />
          add transition:{" "}
          <input
            onChange={(e) => setTransition(e.target.value)}
            value={transition}
          />{" "}
          {"->"}{" "}
          <input
            onChange={(e) => setTransitionValue(e.target.value)}
            value={transitionValue}
          />{" "}
          <button onClick={handleAddTransition}>Add transition</button>
          <div>
            transitions:
            <ul>
              {transitions.map((tr, idx) => (
                <li key={idx}>{JSON.stringify(tr)}</li>
              ))}
            </ul>
          </div>
          <div>
            <button onClick={handleAddState}>save state</button>
          </div>
          <div>
            <button onClick={handleCreateDefinition}>
              generate definition
            </button>
          </div>
        </div>
      </div>

      {Object.keys(definition).length !== 0 && (
        <div>
          validate string
          <input
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
          />
          <button onClick={validateTestInput}>validate</button>
        </div>
      )}
    </div>
  );
}

export default App;
