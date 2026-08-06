import Options from "./Options";
function Questions({ question, answer, dispatch }) {
  console.log(question.options);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Questions;
