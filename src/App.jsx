import React, { useState } from "react";
import { Button } from "@mui/material";

import styles from "./App.module.scss";
import Question from "./Question";
import MultiQuestion from "./MultiQuestion";

import questionSchema from "./Rhythm-Generator-Schema.json";
import resultsSchema from "./rhythms.json";

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

  const renderResults = (results) => {
    console.log(results);

    let patterns;
    let res = "Undetermined";

    if (results[3].option.label === "Escape") {
      patterns = resultsSchema.escapeRhythms;

      patterns.forEach((p) => {
        if (
          p.PWave.indexOf(results[8].option.value) !== -1 &&
          p.PRInterval.indexOf(results[9].option.value) !== -1 &&
          p.QRSComplex.indexOf(results[10].option.value) !== -1
        ) {
          res = p.name;
        }
      });
    } else if (results[3].option.label === "Premature") {
      patterns = resultsSchema.prematureRhythms;
    } else {
      patterns = resultsSchema.rhythms;
    }

    return <div>{res}</div>;
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
          <div>{renderResults(results)}</div>
          <Button onClick={() => setCurrentQuestion(1)}>Restart</Button>
        </div>
      )}
    </div>
  );
};

export default App;
