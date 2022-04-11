import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Selector from './components/Selector';
import StopWatch from './components/StopWatch';
import Timer from './components/Timer';

function App() {
  return (
    <div className="page-content">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Selector />} />
          <Route path="/stopwatch" element={<StopWatch />}></Route>
          <Route path="/timer" element={<Timer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
