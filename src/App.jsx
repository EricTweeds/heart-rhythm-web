import React, { useState } from "react";

import styles from "./App.module.scss";
import Question from "./Question";

import questionSchema from "./Rhythm-Generator-Schema.json";

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const handleNav = (newQuestion, option, subOptionVal) => {
    setCurrentQuestion(newQuestion);
    console.log(newQuestion, option, subOptionVal);
  };
  return (
    <div className={styles.app}>
      <Question info={questionSchema[currentQuestion]} handleNav={handleNav} />
    </div>
  );
};

export default App;
