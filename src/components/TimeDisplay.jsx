import React from "react";

export default class TimeDisPlay extends React.Component {
  constructor(props) {
    super(props);
    this.delimiter = props.delimiter || ' : ';
  }

  formatTime = ({ hours, minutes, seconds }) => {
    const delimiter = ' : ';
    hours = String(hours <= 0 || Number.isNaN(hours) ? 0 : hours).padStart(2, 0);
    minutes = String(minutes <= 0 || Number.isNaN(minutes)? 0 : minutes).padStart(2, 0);
    seconds = String(seconds <= 0 || Number.isNaN(seconds)? 0 : seconds).padStart(2, 0);
    return ( <><span>{hours}</span>{delimiter}<span>{minutes}</span>{delimiter}<span>{seconds}</span></> )
  }

  render () {
    const {hours, minutes, seconds} = this.props.time;
    return ( 
      <>
        {this.formatTime({ hours, minutes, seconds })}
      </> 
    )}
}