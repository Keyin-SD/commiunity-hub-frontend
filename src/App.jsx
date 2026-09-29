import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import EventListPage from './pages/EventListPage.jsx'
import EventDetailPage from './pages/EventDetailPage.jsx'
import AddEventPage from './pages/AddEventPage.jsx'
import EditEventPage from './pages/EditEventPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <header className="site-header">
        <NavLink to="/" className="site-title" end>Community Hub</NavLink>
        <nav className="site-nav">
          <NavLink to="/events" end>Events</NavLink>
          <NavLink to="/events/new" className="button">+ Add event</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventListPage />} />
          <Route path="/events/new" element={<AddEventPage />} />
          <Route path="/events/:eventId" element={<EventDetailPage />} />
          <Route path="/events/:eventId/edit" element={<EditEventPage />} />
          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
