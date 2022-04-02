import StopWatch from "./StopWatch";
import React from "react";
import Controls from "./Controls";
import parseTime from "../utils/parsetime.js";

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
    } else {
      parseTime(this.timerInputField.current.value).then(seconds => {
        const time = this.calculateTime(seconds);
        const { hours, minutes, secs } = time;
        this.setState({ time })
        // this.setState({ time : { hours: hours || 0, minutes: minutes || 0, seconds: secs || 0 } })
      }).catch(err => console.log(err))
    }
  }

  startTimer = () => {
    parseTime(this.timerInputField.current.value).then(timer => {
      // console.log(`time set for ${timer} seconds`, typeof timer);
      
      this.timerInputField.current.value = '';
      const time = this.calculateTime(timer);
      if (timer !== '') {
        this.setState({ time, timer, running: true, isPaused: false})
      }
    }).catch(err => console.log(err))
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
              <input disabled={this.state.running} readOnly={this.state.running} ref={this.timerInputField} onKeyUp={this.handleKeyUp} type="text" className="form-control" placeholder="Set time" />
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