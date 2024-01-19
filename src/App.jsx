import React, { useState } from "react";
import { Button } from "@mui/material";

import styles from "./App.module.scss";
import Question from "./Question";

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
  return (
    <div className={styles.app}>
      {questionSchema[currentQuestion] ? (
        <Question
          info={questionSchema[currentQuestion]}
          handleNav={handleNav}
        />
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
