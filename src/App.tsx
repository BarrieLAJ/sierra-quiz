import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { AppState } from "./app/store";
import Timer from "./components/Timer";
import { addPoints, changeQNumber } from "./features/appSlice";

const questionsSelector = (state: AppState) => state.quiz.questions;
const qnumberSelector = (state: AppState) => state.quiz.question_number;
const pointsSelector = (state: AppState) => state.quiz.points;
const questionCountSelector = (state: AppState) => state.quiz.questions.length;

const questionSelector = createSelector(
  [questionsSelector, qnumberSelector],
  (questions, qnumber) => questions[qnumber]
);

function App() {
  const {
    question,
    options,
    points,
    answer,
    time,
  } = useSelector((state: AppState) => questionSelector(state));
  const Userpoints = useSelector(pointsSelector);
  const qCount = useSelector(questionCountSelector);
  const qnumber = useSelector(qnumberSelector);
  const dispatch = useDispatch();
  const [stop, setstop] = useState<boolean>(false);
  const nextQ = (option: string) => {
    if (option === answer) {
      dispatch(addPoints(points));
    }
    if (qnumber !== qCount - 1) {
      dispatch(changeQNumber(qnumber + 1));
    } else {
      setstop(true);
    }
  };

  return (
    <div className=" max-h-full h-screen relative">
      <h1 className="bg-green-500 py-7 text-center text-5xl font-bold text-gray-100 uppercase tracking-wider">
        Sierra Quiz
      </h1>
      <div className="rounded-md relative h-5/6">
        <div className="flex justify-between my-4 px-2 text-gray-800">
          <h6 className="flex-none">
            <span className="text-2xl font-semibold mr-1">Q</span>
            <span className="text-2xl font-semibold align-baseline">
              {qnumber + 1}
            </span>
          </h6>
          <h6 className="flex-none">
            <span className="font-bold text-3xl text-green-800 mx-2">
              {Userpoints}
            </span>
            <span className="text-lg font-semibold">points</span>
          </h6>
        </div>
        <div className="relative w-full py-3 mx-auto mt-5 bg-gray-50">
          <Timer time={time} context={qnumber} stop={stop} />
          <p className="pl-5 pt-4 leading-6 w-5/6 font-sans text-2xl">{question}</p>
          <div className="flex flex-col items-center space-y-6 w-full mt-16 font-mono">
            {options.map((option, i) => (
              <button
                className={
                  "w-11/12 bg-blue-500 text-gray-100 text-left p-4 text-lg rounded-lg focus:outline-none shadow"
                }
                key={i}
                onClick={() => {
                  nextQ(option);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>        
      </div>
      <button className="absolute block w-11/12  text-2xl left-4 bottom-5 py-3 bg-green-600 text-gray-200 rounded">
          Next
        </button>
    </div>
  );
}

export default App;
