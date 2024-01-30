import React, { useState } from "react";
import PropTypes from "prop-types";

import { Button } from "@mui/material";
import styles from "./Question.module.scss";

const MultiQuestion = ({ info, handleNav }) => {
  const [subOptions, setSubOptions] = useState([]);
  const [subOptionVal, setSubOptionVal] = useState({});

  const handleNext = () => {
    handleNav(info.next, info.options, subOptionVal);
    setSubOptionVal({});
    setSubOptions([]);
  };

  const handlePrev = () => {
    handleNav(info.prev, info.options, subOptionVal);
    setSubOptionVal({});
    setSubOptions([]);
  };

  const handleSubOptionVal = (val, i) => {
    const currVal = { ...subOptionVal } ?? {};
    currVal[i] = val;
    setSubOptionVal(currVal);
  };

  const renderSubOption = (option, index) => {
    switch (option.type) {
      case "number":
        return (
          <div className={styles.subOptions} key={option.label}>
            <input
              className={styles.numberInput}
              pattern="\d*"
              type="number"
              value={subOptionVal[index] ?? ""}
              onChange={(e) => handleSubOptionVal(e.target.value, index)}
            />
          </div>
        );
      case "boolean":
        return (
          <div className={styles.subOptions} key={option.label}>
            <Button
              className={styles.option}
              onClick={() =>
                handleSubOptionVal(
                  subOptionVal[index] === option.value ? null : option.value,
                  index
                )
              }
              variant={
                subOptionVal[index] === option.value ? "contained" : "outlined"
              }
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
      <div className={styles.title}>{info.question}</div>
      <div className={styles.optionRow}>
        {info.options.map((option, i) => {
          return (
            <div key={option.label} className={styles.option}>
              <div className={styles.optionLabel}>{option.label}</div>
              {option.subOptions.map((o) => renderSubOption(o, i))}
            </div>
          );
        })}
      </div>
      {subOptions.length ? (
        <>
          <hr style={{ width: "100%" }} />
          {subOptions.map((o) => {
            return renderSubOption(o);
          })}
        </>
      ) : null}
      <div className={styles.navRow}>
        {info.prev ? <Button onClick={handlePrev}>Prev</Button> : null}
        {info.next ? (
          <Button
            onClick={handleNext}
            disabled={
              !Object.values(subOptionVal).every((v) => v) ||
              Object.values(subOptionVal).length < 2
            }
          >
            Next
          </Button>
        ) : null}
        {!info.next ? (
          <Button
            onClick={handleNext}
            disabled={
              !Object.values(subOptionVal).every((v) => v) ||
              Object.values(subOptionVal).length < 2
            }
          >
            Done
          </Button>
        ) : null}
      </div>
    </div>
  );
};

MultiQuestion.propTypes = {
  info: PropTypes.shape({
    question: PropTypes.string,
    next: PropTypes.string,
    prev: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        type: PropTypes.string,
        next: PropTypes.string,
        subOptions: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string,
            type: PropTypes.string,
          })
        ),
      })
    ),
  }).isRequired,
  handleNav: PropTypes.func.isRequired,
};

export default MultiQuestion;
