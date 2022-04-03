import React from "react";
import Controls from "./Controls";
import parseTime from "../utils/parsetime.js";
import TimeDisPlay from "./TimeDisplay";

export default class Timer extends React.Component {
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

  calculateTime = (ms) => {
    return {
      seconds: ms % 60,
      minutes: parseInt((ms % 3600) / 60),
      hours: parseInt(ms / 3600)
    }
  }

  handleKeyUp = (e) => { 
    if (e.key === 'Enter') {
      this.startTimer()
    } else {
      parseTime(this.timerInputField.current.value).then(seconds => {
        const time = this.calculateTime(seconds);
        this.setState({ time })
      }).catch(err => console.log(err))
    }
  }

  startTimer = () => {
    parseTime(this.timerInputField.current.value).then(timer => {
      if (timer.name === "Error") {
        console.log('Could not submit timer, incorrect input.')
      } else if (timer > 0) {
        console.log(`time set for ${timer} seconds`);
        
        this.timerInputField.current.value = '';
        const time = this.calculateTime(timer);
        if (timer !== '') {
          this.setState({ time, timer, running: true, isPaused: false})
        }
      } else {
        console.log('Could not submit timer, incorrect input.')
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

  componentDidUpdate = (props, prevState) => { 
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
        <div className="stopwatch"><TimeDisPlay time={this.state.time}></TimeDisPlay></div>
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