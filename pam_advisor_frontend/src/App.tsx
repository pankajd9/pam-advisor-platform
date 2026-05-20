import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import CompareTools from './pages/CompareTools';
import PAMAdvisor from './pages/PAMAdvisor';
import ArchitectureAdvisor from './pages/ArchitectureAdvisor';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/compare" element={<CompareTools />} />
          <Route path="/recommendations" element={<PAMAdvisor />} />
          <Route path="/architecture" element={<ArchitectureAdvisor />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

// Made with Bob
