import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { LearnPage } from './pages/LearnPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DesignSystemPage } from './pages/DesignSystemPage';
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/design-system" element={<Layout><DesignSystemPage /></Layout>} />
        <Route element={<Layout><LandingPage /></Layout>} path="/" />
        <Route element={<Layout><LearnPage /></Layout>} path="/learn" />
        <Route element={<Layout><SimulatorPage /></Layout>} path="/simulator" />
        <Route element={<Layout><DashboardPage /></Layout>} path="/dashboard" />
      </Routes>
    </Router>
  );
}

export default App;
