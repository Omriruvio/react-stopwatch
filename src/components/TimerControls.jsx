import Controls from "./Controls";
import React from "react";

export default class TimerControls extends Controls {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <div className="input-group input-group-sm mt-3 mb-3">
          <input type="text" className="form-control" placeholder="Set time" />
          <div className="input-group-append">
            <button className="btn btn-info ms-1" type="button">Start!</button>
          </div>
        </div>
        <Controls></Controls>
      </div>
    )
  }
}