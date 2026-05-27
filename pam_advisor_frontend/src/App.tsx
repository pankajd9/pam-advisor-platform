import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CompareTools from './pages/CompareTools';
import PAMAdvisor from './pages/PAMAdvisor';
import ArchitectureAdvisor from './pages/ArchitectureAdvisor';
import ScheduleMeeting from './pages/ScheduleMeeting';
import RequestDemo from './pages/RequestDemo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All pages render standalone without Layout wrapper */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/compare" element={<CompareTools />} />
        <Route path="/recommendations" element={<PAMAdvisor />} />
        <Route path="/architecture" element={<ArchitectureAdvisor />} />
        <Route path="/schedule-meeting" element={<ScheduleMeeting />} />
        <Route path="/request-demo" element={<RequestDemo />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// Made with Bob
