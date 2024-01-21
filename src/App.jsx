import React, { useState } from "react";
import { Button } from "@mui/material";

import styles from "./App.module.scss";
import Question from "./Question";
import MultiQuestion from "./MultiQuestion";

import questionSchema from "./Rhythm-Generator-Schema.json";

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [results, setResults] = useState({});

  const handleNav = (newQuestion, option, subOptionVal) => {
    setCurrentQuestion(newQuestion);
    setResults((res) => {
      res[currentQuestion] = { option, subOptionVal };
      return res;
    });
  };

  const renderQuestion = (q) => {
    if (q.type === "multi") {
      return <MultiQuestion info={q} handleNav={handleNav} />;
    }
    return (
      <Question info={questionSchema[currentQuestion]} handleNav={handleNav} />
    );
  };
  return (
    <div className={styles.app}>
      {questionSchema[currentQuestion] ? (
        renderQuestion(questionSchema[currentQuestion])
      ) : (
        <div>
          <div>Results</div>
          <div>{JSON.stringify(results)}</div>
          <Button onClick={() => setCurrentQuestion(1)}>Restart</Button>
        </div>
      )}
    </div>
  );
};

export default App;
