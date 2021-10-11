import React, { useEffect, useState } from "react";
import { OptionsType } from "../types";
import { useGetQuestionsQuery } from "../../../api/questionsApi";
import Question from "./Question";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../app/store";
import { changeQNumber } from "../../appSlice";
import { CSSTransition } from "react-transition-group";

const qnumberSelector = (state: AppState) => state.quiz.question_number;
const pointsSelector = (state: AppState) => state.quiz.points;

export const Questions = ({ cat, limit }: OptionsType) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [changeQ, setChangeQ] = useState(true);
  const dispatch = useDispatch();
  const { isLoading, data, isError } = useGetQuestionsQuery(
    {
      cat,
      limit,
    },
    {}
  );

  const [finish, setFinish] = useState(false);
  const qnumber = useSelector(qnumberSelector);
  const qCount = data?.length;
  const points = useSelector(pointsSelector);

  useEffect(() => {
    setChangeQ(true);
  }, [qnumber]);

  const nextQuestion = () => {
    if (qCount) {
      if (qnumber !== qCount - 1) {
        dispatch(changeQNumber(qnumber + 1));
      } else {
        setChangeQ(false);
        setSelected(false);
        setTimeout(() => {
          setFinish(true);
        }, 400);
      }
    }
  };
  if (isLoading)
    return <div className="animate-spin w-10 h-10 rounded-full ring-1"></div>;
  if (isError)
    return <div className="text-3xl text-red-400">Error Featching</div>;
  return (
    <>
      <CSSTransition
        appear
        in={changeQ}
        classNames="show"
        timeout={300}
        unmountOnExit
        addEndListener={(node, done) =>
          node.addEventListener("transitionend", done, false)
        }
      >
        <Question
          qnumber={qnumber}
          setSelectedAnswer={setSelected}
          selected={selected}
          args={{ cat, limit }}
        />
      </CSSTransition>

      <CSSTransition
        in={selected}
        classNames="button"
        timeout={200}
        unmountOnExit
        addEndListener={(node, done) =>
          node.addEventListener("transitionend", done, false)
        }
      >
        <div className="absolute bottom-3 w-full rounded-xl h-32 bg-gray-200 flex flex-col justify-end items-center">
          <button
            className="block w-11/12  text-2xl left-4 py-3 bg-blue-500 text-gray-200 rounded"
            onClick={(e) => {
              setChangeQ(false);
              nextQuestion();
            }}
          >
            {qCount && (qnumber === qCount - 1 ? "Finish" : "Next")}
          </button>
        </div>
      </CSSTransition>

      {finish && (
        <>
          <div className="text-4xl">Score: {points}</div>
        </>
      )}
    </>
  );
};
