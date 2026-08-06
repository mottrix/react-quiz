function FinishScreen({ point, maxPonit }) {
  const percentage = (point / maxPonit) * 100;
  return (
    <p className="result">
      your scored <strong>{point}</strong>out of {maxPonit}({" "}
      {Math.ceil(percentage)}%)
    </p>
  );
}

export default FinishScreen;
