import StopWatch from "./StopWatch";
import React from "react";
import TimerControls from "./TimerControls";

export default class Timer extends StopWatch {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (
      <div>
        <div className="stopwatch">00 : 00 : 00</div>
        <TimerControls></TimerControls>
      </div>
    )
  }
}