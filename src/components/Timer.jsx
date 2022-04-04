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
      cancelled: false
    }
    this.timerInputField = React.createRef();
    this.submitButtonActiveClasses = 'btn btn-info ms-1';
    this.submitButtonInactiveClasses = 'btn btn-outline-secondary ms-1';
    const audioUrl = new URL("../media/mixkit-happy-bells-notification-937.wav", import.meta.url)
    this.notificationSound = new Audio(audioUrl);
    this.notificationSound.volume = 0.2;
  }

  calculateTime = (sec) => {
    return {
      seconds: sec % 60,
      minutes: parseInt((sec % 3600) / 60),
      hours: parseInt(sec / 3600)
    }
  }

  handleKeyUp = (e) => { 
    if (e.key === 'Enter') {
      this.startTimer()
    } else {
      parseTime(this.timerInputField.current.value).then(seconds => {
        const time = this.calculateTime(seconds);
        this.setState({ time, timer: seconds })
      }).catch(err => console.log(err))
    }
  }

  startTimer = () => {
    parseTime(this.timerInputField.current.value).then(timer => {
      if (timer > 0) {
        console.log(`time set for ${timer} seconds`);
        this.timerInputField.current.value = '';
        if (timer !== '') {
          this.setState({ running: true, isPaused: false, cancelled: false})
        }
        this.interval = setInterval(this.countDown, 1000);
      } else {
        console.log('Could not submit timer, incorrect input.');
        this.handleStop();
      }
    }).catch(err => console.log(err))
  }

  countDown = () => {
    if (this.state.running && this.state.timer >= 0) {
      const newTimer = this.state.timer - 1;
      this.setState({
        timer: newTimer,
        time: this.calculateTime(this.state.timer),
        running: this.state.running && this.state.timer > 0
      })
    } else if (!this.state.running && this.state.timer <= 0) clearInterval(this.interval);
  }

  handlePause = () => {
    this.setState({
      running: !this.state.running,
      isPaused: !this.state.isPaused
    })
  }

  componentDidUpdate = (props, prevState) => { 
    prevState.running && 
    !this.state.running && 
    !this.state.cancelled && 
    !this.state.isPaused &&
    this.notificationSound.play();
  }

  handleStop = () => {
    this.setState({
      running: false,
      isPaused: false,
      time: this.calculateTime(0),
      timer: 0,
      start: 0,
      pauseTime: 0,
      cancelled: true
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