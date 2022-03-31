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

  formatTime = () => {
    const { hours, minutes, seconds } = this.state.time;
    return `${String(hours).padStart(2, 0)} : ${String(minutes).padStart(2, 0)} : ${String(seconds).padStart(2, 0)}`
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
      time: {
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      start: 0,
      pauseTime: 0,
    })
  }

  componentDidUpdate = () => {
    setTimeout(() => {
      if (this.state.running) {
        const diff = parseInt((Date.now() - this.state.start) / 1000);
        this.setState({
          time: {
            seconds: diff % 60,
            minutes: parseInt((diff % 3600) / 60),
            hours: parseInt(diff / 3600)
          },
          diff
        })
      }
    }, 1000)
  }

  render () {
    return (
      <>
        <div className="stopwatch">{this.formatTime()}</div>
        <Controls handleStart={this.handleStart} handlePause={this.handlePause} handleStop={this.handleStop}></Controls>
      </>
    )
  }
}