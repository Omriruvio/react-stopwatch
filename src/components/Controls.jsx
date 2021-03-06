import React from "react";

export default class Controls extends React.Component {
  constructor(props) {
    super(props)
    
    this.activeButtonClasses = `stopwatch__control-button btn btn-info`
    this.inactiveButtonClasses = `stopwatch__control-button btn btn-outline-secondary`;

    
  }

  deactivateWhenNotRunning = () => this.props.isRunning ? this.activeButtonClasses : this.inactiveButtonClasses
  activateWhenNotRunning = () => this.props.isRunning ? this.inactiveButtonClasses : this.activeButtonClasses 
  deactivateWhenNotRunningOrPaused = () => !this.props.isRunning && !this.props.isPaused ? this.inactiveButtonClasses : this.activeButtonClasses

  render () {
    const isRunning = this.props.isRunning;
    return (
      <div className="stopwatch__controls">
        {this.props.displayPlayButton && <button disabled={isRunning} className={this.activateWhenNotRunning()} onClick={this.props.handleStart}><i className="bi bi-play" style={{ fontSize: '1rem' }}></i></button>}
        <button disabled={!isRunning && !this.props.isPaused} className={this.deactivateWhenNotRunningOrPaused()} onClick={this.props.onPause}><i className="bi bi-pause" style={{ fontSize: '1rem' }}></i></button>
        <button disabled={!isRunning && !this.props.isPaused} className={this.deactivateWhenNotRunningOrPaused()} onClick={this.props.handleStop}><i className="bi bi-stop" style={{ fontSize: '1rem' }}></i></button>
      </div>
    )
  }
}