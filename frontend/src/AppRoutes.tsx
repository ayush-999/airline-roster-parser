import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import DashboardPage from './features/dashboard/DashboardPage';
import RosterUploadPage from './features/roster/RosterUploadPage';
import EventsPage from './features/events/EventsPage';
import FlightsPage from './features/flights/FlightsPage';
import StandbyPage from './features/standby/StandbyPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="upload" element={<RosterUploadPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="flights" element={<FlightsPage />} />
        <Route path="standby" element={<StandbyPage />} />
      </Route>
    </Routes>
  );
}