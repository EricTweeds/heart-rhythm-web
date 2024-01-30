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

      patterns.forEach((p) => {
        if (
          p.PWave.indexOf(results[8].option.value) !== -1 &&
          p.PRInterval.indexOf(results[9].option.value) !== -1 &&
          p.QRSComplex.indexOf(results[10].option.value) !== -1
        ) {
          res = p.name;
        }
      });
    } else {
      patterns = resultsSchema.rhythms;

      const ratePatterns = patterns.filter((p) => {
        const aMax = p.atrialRate.max ?? 0;
        const aMin = p.atrialRate.min ?? 0;
        const vMax = p.ventricleRate.max ?? 0;
        const vMin = p.ventricleRate.min ?? 0;
        return (
          ((results[1].subOptionVal[0] === p.atrialRate.other ||
            (p.atrialRate.other ===
              "atrial rate greater than ventricular rate" &&
              Number(results[1].subOptionVal[0]) >
                Number(results[1].subOptionVal[1])) ||
            (aMax > Number(results[1].subOptionVal[0]) &&
              aMin < Number(results[1].subOptionVal[0]))) &&
            results[1].subOptionVal[1] === p.atrialRate.other) ||
          (vMax > Number(results[1].subOptionVal[1]) &&
            vMin < Number(results[1].subOptionVal[1]))
        );
      });

      const fPatterns = ratePatterns.filter((p) => {
        return (
          p.rhythm.atrial.indexOf(results[2].subOptionVal[0]) !== -1 &&
          p.rhythm.ventricular.indexOf(results[2].subOptionVal[1]) !== -1 &&
          p.PWave.indexOf(results[5].option.value) !== -1 &&
          p.PRInterval.indexOf(results[6].option.value) !== -1 &&
          p.QRSComplex.indexOf(results[7].option.value) !== -1
        );
      });

      const names = fPatterns.map((p) => p.name);

      if (fPatterns.length) {
        res = names.join(", ");
      }
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
