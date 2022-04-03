import React from "react";

export default class TimeDisPlay extends React.Element {
  constructor(props) {
    super(props);
    this.delimiter = props.delimiter || ' : ';
    this.hours = String(props.hours <= 0 || Number.isNaN(props.hours) ? 0 : props.hours).padStart(2, 0);
    this.minutes = String(props.minutes <= 0 || Number.isNaN(props.minutes)? 0 : props.minutes).padStart(2, 0);
    this.seconds = props.seconds = String(props.seconds <= 0 || Number.isNaN(props.seconds)? 0 : props.seconds).padStart(2, 0);
    console.log(this.hours, this.minutes, this.seconds, this.delimiter);
    
  }

  render () {
    return ( 
      <>
      <span>{this.hours}</span>{this.delimiter}<span>{this.minutes}</span>{this.delimiter}<span>{this.seconds}</span>
      </> 
    )}
}