import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import "./styles.css";

export default function App() {
  useEffect(() => console.log("Render App"));

  return (
    <div className="App">
      <MyCounterApp />
    </div>
  );
}

function MyCounterApp() {
  useEffect(() => console.log("Render MyCounterApp"));

  return (
    <CountProvider>
      <Counter1 />
      <Counter2 />
    </CountProvider>
  );
}

const Counter1 = () => {
  const { counter1, increaseCounter1 } = useCount();

  useEffect(() => console.log("Render Counter1"));

  return (
    <>
      <h1>Counter 1</h1>
      <p>
        Does this component rerender when the counter2 state changes,
        <br />
        which is not used in this component?{" "}
      </p>
      <p>Short answer: YES :(</p>
      <button onClick={increaseCounter1}>{counter1}</button>
    </>
  );
};

const Counter2 = () => {
  const { counter2, increaseCounter2 } = useCount();

  useEffect(() => console.log("Render Counter2"));

  return (
    <>
      <h1>Counter 2</h1>
      <p>
        Does this component rerender when the counter1 state changes,
        <br />
        which is not used in this component?{" "}
      </p>
      <p>Short answer: YES :(</p>
      <button onClick={increaseCounter2}>{counter2}</button>
    </>
  );
};

const CountContext = createContext();

function CountProvider({ children }) {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);

  const increaseCounter1 = useCallback(
    () => setCounter1((prev) => prev + 1),
    []
  );
  const increaseCounter2 = useCallback(
    () => setCounter2((prev) => prev + 2),
    []
  );

  const value = { counter1, increaseCounter1, counter2, increaseCounter2 };

  return (
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
}

function useCount() {
  const context = useContext(CountContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}
