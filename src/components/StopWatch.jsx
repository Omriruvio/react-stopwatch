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
      running: false
    }
  }

  formatTime = () => {
    const { hours, minutes, seconds } = this.state.time;
    return `${String(hours).padStart(2, 0)} : ${String(minutes).padStart(2, 0)} : ${String(seconds).padStart(2, 0)}`
  }

  handleStart = () => {
    const now = Date.now();
    console.log('now', now, typeof now)
    this.setState({
      ...this.state,
      running: true,
      start: now,
      
    })
    console.log(this.state.start);
  }
  handlePause = () => {
    console.log('stopwatch pause')
    this.setState({
      running: false
    })
  }
  handleStop = () => {
    console.log('stopwatch stop')
    this.setState({
      ...this.state,
      running: false,
      time: {
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      start: 0
    })
  }

  componentDidUpdate = () => {
    if (this.state.running) {
      requestAnimationFrame(() => {
        const diff = parseInt((Date.now() - this.state.start) / 1000);
        this.setState({
          time: {
            seconds: diff % 60,
            minutes: parseInt((diff % 3600) / 60),
            hours: parseInt(diff / 3600)
          }
        })
      })
    }
  }

  componentWillUnmount = () => {

  }
  componentDidMount = () => {
    
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