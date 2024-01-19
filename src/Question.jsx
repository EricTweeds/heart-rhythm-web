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
    const next = info.options[selected].next ?? info.next;
    handleNav(next, info.options[selected], subOptionVal);
    setSelected(null);
    setSubOptionVal(null);
    setSubOptions([]);
  };

  const handlePrev = () => {
    handleNav(info.prev, info.options[selected], subOptionVal);
    setSelected(null);
    setSubOptionVal(null);
    setSubOptions([]);
  };

  const renderSubOption = (option) => {
    switch (option.type) {
      case "number":
        return (
          <div className={styles.subOptions} key={option.label}>
            <div>{option.label}</div>
            <input
              type="number"
              value={subOptionVal ?? 0}
              onChange={(e) => setSubOptionVal(e.target.value)}
            />
          </div>
        );
      case "boolean":
        return (
          <div className={styles.subOptions} key={option.label}>
            <Button
              onClick={() =>
                setSubOptionVal(
                  subOptionVal === option.label ? null : option.label
                )
              }
              variant={subOptionVal === option.label ? "contained" : "outlined"}
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
            <Button
              key={option.label}
              variant={selected === i ? "contained" : "outlined"}
              onClick={() => handleSelection(i)}
            >
              {option.label}
            </Button>
          );
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
        {info.next ? (
          <Button
            onClick={handleNext}
            disabled={selected === null || (subOptions.length && !subOptionVal)}
          >
            Next
          </Button>
        ) : null}
        {!info.next ? (
          <Button
            onClick={handleNext}
            disabled={selected === null || (subOptions.length && !subOptionVal)}
          >
            Done
          </Button>
        ) : null}
      </div>
    </div>
  );
};

Question.propTypes = {
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

export default Question;
