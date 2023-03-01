import React, { Component } from "react";
import styles from "./Counter.module.css";
class Counter extends Component {
  render() {
    const { counter, counterDirection, counterStep, changeDirection, doStep } =
      this.props;
    return (
      <article className={styles.counterArticle}>
        <h2 className={styles.counterTittle}>Counter</h2>
        <p className={styles.counterText}>{counter}</p>
        <div className={styles.buttons}>
          <button className={styles.counterButton} onClick={doStep}> {counterDirection === true ? "+" : "-"} {counterStep}
          </button>
          <button className={styles.directionButton} onClick={changeDirection}>
            Change direction{" "}
            {counterDirection === true ? "(now up)" : "(now down)"}
          </button>
        </div>
      </article>
    );
  }
}

export default Counter;
