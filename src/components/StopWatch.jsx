import React from "react"
import Controls from "./Controls"

export default class StopWatch extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      time: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      start: 0,
      pauseTime: 0,
      running: false,
      diff: 0
    }
  }

  formatTime = ({ hours, minutes, seconds }) => {
    const delimiter = ' : ';
    hours = String(hours <= 0 ? 0 : hours).padStart(2, 0);
    minutes = String(minutes <= 0 ? 0 : minutes).padStart(2, 0);
    seconds = String(seconds <= 0 ? 0 : seconds).padStart(2, 0);
    return `${hours}${delimiter}${minutes}${delimiter}${seconds}`
  }

  handleStart = () => {
    const now = Date.now();
    this.setState({
      running: true,
      start: this.state.pauseTime ? now - (this.state.pauseTime * 1000 ) : now,
      
    })
  }
  handlePause = () => {
    this.setState({
      running: false,
      pauseTime: (Date.now() - this.state.start) / 1000,
    })
  }
  handleStop = () => {
    this.setState({
      running: false,
      time: this.calculateTime(0),
      start: 0,
      pauseTime: 0,
    })
  }

  calculateTime = (ms) => {
    return {
      seconds: ms % 60,
      minutes: parseInt((ms % 3600) / 60),
      hours: parseInt(ms / 3600)
    }
  }

  componentDidUpdate = () => {
    const interval = setTimeout(() => {
      if (this.state.running) {
        const diff = parseInt((Date.now() - this.state.start) / 1000);
        const time = this.calculateTime(diff);
        this.setState({
          time,
          diff
        })
      } else { 
        clearInterval(interval); 
      }
    }, 1000)
  }

  render () {
    return (
      <div> 
        <div className="stopwatch">{this.formatTime(this.state.time)}</div>
        <Controls play={true} isRunning={this.state.running} handleStart={this.handleStart} handlePause={this.handlePause} handleStop={this.handleStop}></Controls>
      </div>
    )
  }
}