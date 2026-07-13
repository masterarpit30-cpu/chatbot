import { useState } from "react";

function App() {

    const [count, setCount] = useState(10);

    function increment() {
        setCount(count + 1);
    }

    function decrement() {
        setCount(count - 1);
    }

    return (
        <div className="App">
            <h2>Count = {count}</h2>

            <button className="btn" onClick={increment}>
                Increment
            </button>

            {" "}

            <button className="btn" onClick={decrement}>
                Decrement
            </button>
        </div>
    );
}

export default App;