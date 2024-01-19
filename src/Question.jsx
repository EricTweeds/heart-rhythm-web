import React, { useState } from "react";
import PropTypes from "prop-types";

import { Button } from "@mui/material";
import styles from "./Question.module.scss";

const Question = ({ info, handleNav }) => {
  const [subOptions, setSubOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [subOptionVal, setSubOptionVal] = useState(null);

  const handleSelection = (i) => {
    setSelected(i);
    if (info.options[i].subOptions?.length) {
      setSubOptions(info.options[i].subOptions);
    }
  };

  const handleNext = () => {
    handleNav(info.next, info.options[selected], subOptionVal);
  };

  const handlePrev = () => {
    handleNav(info.prev, info.options[selected], subOptionVal);
  };

  const renderSubOption = (option) => {
    switch (option.type) {
      case "number":
        return (
          <div className={styles.subOptions}>
            <div>{option.label}</div>
            <input
              type="number"
              value={subOptionVal}
              onChange={(e) => setSubOptionVal(e.target.value)}
            />
          </div>
        );
      case "boolean":
        return (
          <div className={styles.subOptions}>
            <Button
              onClick={() => setSubOptionVal(subOptionVal !== true)}
              variant={subOptionVal === true ? "contained" : "outlined"}
            >
              {option.label}
            </Button>
          </div>
        );
      default:
        return option.type;
    }
  };
  return (
    <div className={styles.question}>
      <div>{info.question}</div>
      <div className={styles.optionRow}>
        {info.options.map((option, i) => {
          if (option.type === "boolean") {
            return (
              <Button
                variant={selected === i ? "contained" : "outlined"}
                onClick={() => handleSelection(i)}
              >
                {option.label}
              </Button>
            );
          }
          return null;
        })}
      </div>
      {subOptions.length ? (
        <>
          {subOptions.map((o) => {
            return renderSubOption(o);
          })}
        </>
      ) : null}
      <div className={styles.navRow}>
        {info.prev ? <Button onClick={handlePrev}>Prev</Button> : null}
        {info.next ? <Button onClick={handleNext}>Next</Button> : null}
      </div>
    </div>
  );
};

Question.propTypes = {
  info: {
    question: PropTypes.string,
    next: PropTypes.string,
    prev: PropTypes.string,
    options: PropTypes.arrayOf({
      label: PropTypes.string,
      type: PropTypes.string,
      subOptions: PropTypes.arrayOf({
        label: PropTypes.string,
        type: PropTypes.string,
      }),
    }),
  }.isRequired,
  handleNav: PropTypes.func.isRequired,
};

export default Question;
