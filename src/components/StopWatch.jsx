import React from "react"
import Controls from "./Controls"
import TimeDisPlay from "./TimeDisplay"

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
      diff: 0,
      isPaused: false
    }
  }

  handleStart = () => {
    const now = Date.now();
    this.setState({
      running: true,
      isPaused: false,
      start: this.state.pauseTime ? now - (this.state.pauseTime * 1000 ) : now,
      
    })
  }
  
  handlePause = () => {
    console.log('pausing from stopwatch')
    const now = Date.now();
    this.setState({
      running: !this.state.running,
      isPaused: !this.state.isPaused,
      pauseTime: (Date.now() - this.state.start) / 1000,
      start: this.state.pauseTime ? now - (this.state.pauseTime * 1000 ) : now
    })
  }
  handleStop = () => {
    this.setState({
      running: false,
      isPaused: false,
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
    const controlsProps = {
      isPaused: this.state.isPaused,
      displayPlayButton: true,
      isRunning: this.state.running,
      handleStart: this.handleStart,
      onPause: this.handlePause,
      handleStop: this.handleStop
    }
    
    return (
      <div> 
        <div className="stopwatch">
          <TimeDisPlay time={this.state.time} />
        </div>
        <Controls {...controlsProps}></Controls>
      </div>
    )
  }
}