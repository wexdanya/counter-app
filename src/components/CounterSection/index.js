import React, { Component } from "react";
import Counter from "./Counter/index";
import styles from "./CounterSection.module.css";
import cx from "classnames";
import CounterAutoClick from "./CounterAutoClick";
class CounterSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      counterStep: 1,
      counterDirection: true,
    };
  }
  setStep = (event) => {
    if (event.target.value <= 1000000 && event.target.value > 0) {
      this.setState({ counterStep: Number(event.target.value) });
    }
  };
  changeDirection = () => {
    const { counterDirection } = this.state;
    counterDirection === true
      ? this.setState({ counterDirection: false })
      : this.setState({ counterDirection: true });
  };
  doStep = () => {
    const { counterDirection, counter, counterStep } = this.state;
    counterDirection === true
      ? this.setState({ counter: counter + counterStep })
      : this.setState({ counter: counter - counterStep });
  };
  render() {
    const { counter, counterStep, counterDirection } = this.state;
    const { changeDirection, doStep, setStep } = this;
    const nameInpt = cx(styles.counterSetInput, {
      [styles.invalid]: counterStep >= 1000001 || counterStep < 1,
    });
    return (
      <>
        <section className={styles.counterSection}>
          <Counter
            counter={counter}
            counterStep={counterStep}
            counterDirection={counterDirection}
            changeDirection={changeDirection}
            doStep={doStep}
          />
          <div className={styles.rightSide}>
            <p className={styles.setRange}>Set range below </p>
            <input
              type="number"
              onChange={setStep}
              value={counterStep}
              className={nameInpt}
            ></input>
            <input
              type="range"
              min="1"
              max="1000000"
              step="1"
              className={styles.counterRange}
              value={counterStep}
              onChange={setStep}
            ></input>
            <CounterAutoClick doStep={doStep} counter={counter}/>
          </div>
        </section>
      </>
    );
  }
}

export default CounterSection;
