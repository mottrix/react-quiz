import { useEffect, useReducer } from "react";
import Header from "./components/Header.js";
import Main from "./components/Main.js";
import Loader from "./components/Loader.js";
import Error from "./components/Error.js";
import StartScreen from "./components/StartScreen.js";
import Questions from "./components/Questions.js";
import NextQuestion from "./components/NextQuestion.js";
import Progress from "./components/Progress.js";
import FinishScreen from "./components/FinishScreen.js";
import RestartBtn from "./components/RestartBtn.js";

const initialState = {
  questions: [],
  //"ready " ,"loading" ,"error ", "active" ,"finished"
  status: "loading",
  index: 0,
  answer: null,
  point: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" };
    case "failedData":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        point:
          question.correctOption === action.payload
            ? state.point + question.points
            : state.point,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return { ...state, status: "finished" };
    case "restart":
      return {
     ...state,
        status: "ready",
        index: 0,
        answer: null,
        point: 0,
      };
    default:
      throw new Error("Unknown action");
  }
}
export default function App() {
  const [{ questions, status, index, answer, point }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const numQuestions = questions.length;
  const maxPoint = questions.reduce((prev, cur) => prev + cur.points, 0);
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((err) => {
        dispatch({ type: "failedData" });
      });
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              point={point}
              maxPoint={maxPoint}
              index={index}
              numQuestions={numQuestions}
              answer={answer}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              numQuestions={numQuestions}
              index={index}
            />

            <NextQuestion
              dispatch={dispatch}
              answer={answer}
              numQuestion={numQuestions}
              index={index}
            />
          </>
        )}
        {status === "finished" && (
          <>
            <FinishScreen point={point} maxPonit={maxPoint} />
            <RestartBtn dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}
