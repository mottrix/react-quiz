function Progress({ numQuestions, index, point, maxPoint, answer }) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{point}</strong>/{maxPoint} Points
      </p>
    </header>
  );
}

export default Progress;
