import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/Login";
import EventsList from "./components/EventsList";
import CreateEventForm from "./components/CreateEventForm";
import EditEventForm from "./components/EditEventForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/events" element={<EventsList />} />
        <Route path="/events/create" element={<CreateEventForm />} />
        <Route path="/events/edit/:id" element={<EditEventForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
