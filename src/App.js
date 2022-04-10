import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StopWatch from './components/StopWatch';
import Timer from './components/Timer';

function App() {
  return (
    <div className="page-content">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Timer />
                <StopWatch />
              </>
            }
          ></Route>
          <Route path="/stopwatch" element={<StopWatch />}></Route>
          <Route path="/timer" element={<Timer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
