import StopWatch from "./StopWatch";
import React from "react";
import Controls from "./Controls";

export default class Timer extends StopWatch {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      time: this.calculateTime(0),
      timer: null,
      remaining: 0,
    }
    this.timerInputField = React.createRef();
    this.submitButtonActiveClasses = 'btn btn-info ms-1';
    this.submitButtonInactiveClasses = 'btn btn-outline-secondary ms-1';
  }

  setTime = (e) => { 
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
    const timer = Number(this.timerInputField.current.value);
    const time = this.calculateTime(timer);
    if (timer !== '') {
      console.log(`time set for ${timer} seconds`);
      this.setState({ time, timer, running: true })
    }
  }

  componentDidUpdate = (prevProps, prevState) => { 
    if (this.state.running && this.state.timer > 0) {
      setTimeout(() => {
        this.setState({
          timer: --this.state.timer,
          time: this.calculateTime(this.state.timer),
          running: this.state.timer > 0
        })
      }, 1000)
      // if (this.state.running && this.state.timer <= 0) this.setState({running: false});
    }
    


  }

  render() {
    return (
      <div>
        <div className="stopwatch">{this.formatTime(this.state.time)}</div>
          <div>
            <div className="input-group input-group-sm mt-3 mb-3">
              <input disabled={this.state.running} readOnly={this.state.running} ref={this.timerInputField} onKeyUp={this.setTime} type="number" className="form-control" placeholder="Set time" />
              <div className="input-group-append">
                <button disabled={this.state.running} onClick={this.startTimer} className={this.state.running ? this.submitButtonInactiveClasses : this.submitButtonActiveClasses} type="button">Start!</button>
              </div>
          </div>
          <Controls play={false} isRunning={this.state.running}></Controls>
        </div>
      </div>
    )
  }
}