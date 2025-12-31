
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './components/layout/DashboardLayout';
import ExecutiveSummary from './pages/views/ExecutiveSummary';
import LocalSEO from './pages/views/LocalSEO';
import Competitors from './pages/views/Competitors';
import WebsiteExperience from './pages/views/WebsiteExperience';
import Conversions from './pages/views/Conversions';
import Rankings from './pages/views/Rankings';
import Technical from './pages/views/Technical';
import AdminDashboard from './pages/admin/AdminDashboard';
import ClientManager from './pages/admin/ClientManager';
import RequireClient from './components/auth/RequireClient';
import RequireAdmin from './components/auth/RequireAdmin';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route element={<RequireClient />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<ExecutiveSummary />} />
          <Route path="local-seo" element={<LocalSEO />} />
          <Route path="competitors" element={<Competitors />} />
          <Route path="website-experience" element={<WebsiteExperience />} />
          <Route path="conversions" element={<Conversions />} />
          <Route path="rankings" element={<Rankings />} />
          <Route path="technical" element={<Technical />} />

          {/* Protected Admin Route inside Dashboard */}
          <Route element={<RequireAdmin />}>
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Route>

      {/* Protected Admin Route external */}
      <Route element={<RequireAdmin />}>
        <Route path="/admin/clients" element={<ClientManager />} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
