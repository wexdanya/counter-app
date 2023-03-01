import React, { Component } from "react";
import styles from "./CounterAutoClick.module.css";
import cx from "classnames";
class CounterAutoClick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 1000,
      isWork: false,
      autoClickMount: 30000,
      autoClickRemaining: 0,
      hideAutoClick: false,
    };
    this.setIntervalId = null;
    this.autoClickRemainingId = null;
  }
  componentDidMount() {
    this.runAutoClick();
    this.autoWorkClickRemaining();
    setTimeout(() => {
      return (
        clearInterval(this.setIntervalId),
        this.setState({ hideAutoClick: true })
      );
    }, this.state.autoClickMount);
  }
  autoWorkClickRemaining = () => {
    this.setState({ autoClickRemaining: this.state.autoClickMount / 1000 });
    this.autoClickRemainingId = setInterval(
      () =>
        this.setState({
          autoClickRemaining: this.state.autoClickRemaining - 1,
        }),
      1000
    );
    setTimeout(
      () => clearInterval(this.autoClickRemainingId),
      this.state.autoClickMount
    );
  };

  runAutoClick = (event) => {
    if (event !== undefined) {
      if (this.state.hideAutoClick === false) {
        this.setState({hideAutoClick: true})
      }
    }
    if (this.state.isWork === false) {
      this.setIntervalId = setInterval(this.props.doStep, this.state.time);
      this.setState({ isWork: true });
    } else {
      clearInterval(this.setIntervalId);
      this.setState({ isWork: false });
    }
  };
  setTime = ({ target: { value } }) => {
    if (value <= 10000 && value > 0) {
      this.setState({ time: value });
    }
  };

  render() {
    const { isWork, autoClickRemaining, hideAutoClick } = this.state;
    const hideClicker = cx(styles.startedDiv, {
      [styles.hide]: hideAutoClick === true,
    });
    return (
      <>
        <div className={hideClicker}>
          Auto click started!
          <p className={styles.startedSeconds}>
            Working remaining : {autoClickRemaining} seconds
          </p>
          <span className={styles.startedSecondsDescription}>(You can stop it)</span>
        </div>
        <article className={styles.clickArticle}>
          <input
            type="number"
            className={styles.clickInput}
            value={this.state.time}
            onChange={this.setTime}
            placeholder="Set auto click in ms"
          ></input>
          <button className={styles.clickButton} onClick={this.runAutoClick}>
            {isWork === false ? "Start" : "Stop"}
          </button>
        </article>
      </>
    );
  }
}

export default CounterAutoClick;
