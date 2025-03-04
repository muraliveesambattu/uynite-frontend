import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHeader from "./Components/AdminHeader";
import Dashboard from "./Components/Dashboard/Dashboard";
import CelebrityRequest from "./Components/CelebrityRequest/CelebrityRequest";
import SponsoredEvent from "./Components/SponsoredEvent/SponsoredEvent";
import Reports from "./Components/Reports/Reports";
import Support from "./Components/Support/Support";
import BlockedUsers from "./Components/BlockedUsers/BlockedUsers";
import CreateEvent from "./Components/SponsoredEvent/CreateEvent";
import UpcomingEvents from "./Components/SponsoredEvent/UpcomingEvents";
import OnGoingEvents from "./Components/SponsoredEvent/OnGoingEvents";
import CompletedEvents from "./Components/SponsoredEvent/CompletedEvents";

function App() {
  return (
    <Router>
      <AdminHeader />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/celebrity-request" element={<CelebrityRequest />} />
        <Route path="/sponsored-event" element={<SponsoredEvent />}>
          {/* Child Routes for different sections */}
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="upcoming-events" element={<UpcomingEvents />} />
          <Route path="ongoing-events" element={<OnGoingEvents />} />
          <Route path="completed-events" element={<CompletedEvents />} />
        </Route>        
        <Route path="/reports" element={<Reports />} />
        <Route path="/support" element={<Support />} />
        <Route path="/blocked-users" element={<BlockedUsers />} />
      </Routes>
    </Router>
  );
}

export default App;