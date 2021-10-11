import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { questionApi } from "../../../api/questionsApi";
import Timer from "../../../components/Timer";
import { addPoints } from "../../appSlice";
const Question = ({
  qnumber,
  setSelectedAnswer,
  selected,
  args,
}: {
  args: { cat: string[]; limit: number };
  qnumber: number;
  setSelectedAnswer: (val: boolean) => void;
  selected: boolean;
}) => {
  const { wQuestion, isFetching } =
    questionApi.endpoints.getQuestions.useQueryState(args, {
      selectFromResult: ({ data, ...rest }) => {
        return {
          wQuestion: data?.find((_question, i) => qnumber === i),
          ...rest,
        };
      },
      // skip: true
    });
  // console.log("error state", isError);
  const optionsContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [ansIndex, setAnsIndex] = useState<number>();
  const [stop, setStop] = useState(false);
  useEffect(() => {
    setStop(false);
    setSelectedAnswer(false);
    optionsContainerRef.current
      ?.querySelectorAll("button[data-option]")
      .forEach((el) => {
        el.classList.remove(
          "bg-red-500",
          "focus:ring-red-800",
          "focus:ring-green-800",
          "bg-green-500",
          "ring-2"
        );
        el.classList.add("bg-blue-500");
      });
  }, [qnumber, setSelectedAnswer]);
  // console.log(wQuestion);
  useEffect(() => {
    let ans = wQuestion?.options.indexOf(wQuestion.answer);
    setAnsIndex(ans);
  }, [wQuestion?.options, wQuestion?.answer]);

  const checkAnswer = (
    choice: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (choice === wQuestion?.answer) {
      dispatch(addPoints(wQuestion.points));
      e.currentTarget.classList.remove(`bg-blue-500`);
      // console.log("correct");
      e.currentTarget.classList.add(
        "bg-green-500",
        "focus:ring-green-800",
        "ring-2"
      );
    } else {
      // console.log("wrong");
      e.currentTarget.classList.remove(`bg-blue-500`);
      e.currentTarget.classList.add("bg-red-500", "focus:ring-red-800");
      optionsContainerRef.current &&
        optionsContainerRef.current
          .querySelector(`.correct`)
          ?.classList.remove("bg-blue-500");
      optionsContainerRef.current &&
        optionsContainerRef.current
          .querySelector(`.correct`)
          ?.classList.add("bg-green-500");
    }
  };

  return (
    <div
      className="rounded-md relative h-5/6 overflow-y-scroll"
    >
      {wQuestion && (
        <>
          <div className="flex justify-between my-4 px-2 text-gray-800">
            <h6 className="flex-none">
              <span className="text-2xl font-semibold mr-1">Q</span>
              <span className="text-2xl font-semibold align-baseline">
                {qnumber + 1}
              </span>
            </h6>
          </div>
          <div className="relative w-full py-3 mx-auto mt-5 bg-gray-50">
            <Timer
              time={wQuestion.time}
              context={qnumber}
              stop={stop}
              setStop={setSelectedAnswer}
            />
            <p className="pl-5 pt-4 leading-6 w-5/6 font-sans transition text-2xl">
              {wQuestion.question}
            </p>
            <div
              ref={optionsContainerRef}
              className="flex flex-col items-center space-y-6 w-full mt-16 font-mono"
            >
              {wQuestion.options.map((option, i) => (
                <button
                  className={`w-11/12 bg-blue-500 text-gray-100 text-left p-4 text-lg rounded-lg focus:outline-none shadow transition ${
                    i === ansIndex && "correct"
                  }`}
                  disabled={selected}
                  data-option={`${i}`}
                  key={i}
                  onClick={(e) => {
                    setSelectedAnswer(true);
                    setStop(true);
                    checkAnswer(option, e);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
      {isFetching && <h1>Loading...</h1>}
    </div>
  );
};

export default Question;
