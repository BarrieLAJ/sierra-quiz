import React from "react";
import { Questions } from "./features/questions/component/Questions";
// import { CSSTransition } from "react-transition-group";

function App() {
  // const [state, setstate] = useState(false);
  return (
    <div className="app h-screen relative">
      {/* <CSSTransition
        in={state}
        classNames="show"
        unmountOnExit
        addEndListener={() => {}}
      > */}
      <h1 className="bg-green-500 py-7 text-center text-5xl font-bold text-gray-100 uppercase tracking-wider">
        Sierra Quiz
      </h1>
      {/* </CSSTransition> */}
      {/* <button
        className="relative top-40 w-full bg-red-500 text-white"
        onClick={() => setstate(!state)}
      >
        Show
      </button> */}
      <Questions cat={["science", "geography"]} limit={10} />
    </div>
  );
}

export default App;
