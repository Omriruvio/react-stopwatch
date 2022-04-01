import StopWatch from "./StopWatch";
import React from "react";
import Controls from "./Controls";

export default class Timer extends StopWatch {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      isPaused: false,
      time: this.calculateTime(0),
      timer: null,
      remaining: 0,
    }
    this.timerInputField = React.createRef();
    this.submitButtonActiveClasses = 'btn btn-info ms-1';
    this.submitButtonInactiveClasses = 'btn btn-outline-secondary ms-1';
  }

  handleKeyUp = (e) => { 
    if (e.key === 'Enter') {
      this.startTimer()
      this.timerInputField.current.value = ''
    } else {
      this.setState({
        time: this.calculateTime(this.timerInputField.current.value)
      })
    }
  }

  startTimer = () => {
    // parse value --- if value is string and not empty -> 
    // handle white spaces
    // handle Number space hour / hr / h / hours / hrs / minute / minutes / min / m / mins / seconds / second / secs / s /sec ->
    // handle 'XtimesizeYtimesizeZtimesize...'
    // convert to seconds and pass into "timer state"
    // return a converted Number in seconds
    // const timer = this.parseInput() 
    const timer = Number(this.timerInputField.current.value);
    const time = this.calculateTime(timer);
    if (timer !== '') {
      console.log(`time set for ${timer} seconds`);
      this.setState({ time, timer, running: true, isPaused: false})
    }
  }

  handlePause = () => {
    // super?
    this.setState({
      running: !this.state.running,
      isPaused: !this.state.isPaused
    })
  }

  componentDidUpdate = (prevProps, prevState) => { 
    if (this.state.running && this.state.timer > 0) {
      setTimeout(() => {
        this.setState({
          timer: --this.state.timer,
          time: this.calculateTime(this.state.timer),
          running: this.state.running && this.state.timer > 0
        })
      }, 1000)
    }
  }

  handleStop = () => {
    this.setState({
      running: false,
      isPaused: false,
      time: this.calculateTime(0),
      timer: 0,
      start: 0,
      pauseTime: 0,
    })
  }

  render() {
    return (
      <div>
        <div className="stopwatch">{this.formatTime(this.state.time)}</div>
          <div>
            <div className="input-group input-group-sm mt-3 mb-3">
              <input disabled={this.state.running} readOnly={this.state.running} ref={this.timerInputField} onKeyUp={this.handleKeyUp} type="number" className="form-control" placeholder="Set time" />
              <div className="input-group-append">
                <button disabled={this.state.running || this.state.isPaused} onClick={this.startTimer} className={this.state.running || this.state.isPaused ? this.submitButtonInactiveClasses : this.submitButtonActiveClasses} type="button">Start!</button>
              </div>
          </div>
          <Controls handleStop={this.handleStop} displayPlayButton={false} isPaused={this.state.isPaused} isRunning={this.state.running} onPause={this.handlePause}></Controls>
        </div>
      </div>
    )
  }
}