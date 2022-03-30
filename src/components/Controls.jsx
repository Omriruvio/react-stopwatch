import React from "react";

export default class Controls extends React.Component {
  constructor(props) {
    super(props)

    this.buttonClasses = `stopwatch__control-button btn btn-info`
  }

  render () {
    return (
      <div className="stopwatch__controls">
        <button className={this.buttonClasses} onClick={this.props.handleStart}><i className="bi bi-play" style={{ fontSize: '1rem' }}></i></button>
        <button className={this.buttonClasses} onClick={this.props.handlePause}><i className="bi bi-pause" style={{ fontSize: '1rem' }}></i></button>
        <button className={this.buttonClasses} onClick={this.props.handleStop}><i className="bi bi-stop" style={{ fontSize: '1rem' }}></i></button>
      </div>
    )
  }
}