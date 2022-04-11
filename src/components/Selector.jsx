import { Link } from "react-router-dom";

export default function Selector () {
  
  return (
    <div style={{display: 'flex', gap: '1rem'}}>
      <Link to={'/stopwatch'}><button type='button' className="btn btn-success">Stopwatch</button></Link>
      <Link to={'/timer'}><button type='button' className="btn btn-success">Timer</button></Link>
    </div>
  )
}