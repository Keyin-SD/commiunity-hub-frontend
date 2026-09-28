import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import EventListPage from './pages/EventListPage.jsx'
import EventDetailPage from './pages/EventDetailPage.jsx'
import AddEventPage from './pages/AddEventPage.jsx'
import EditEventPage from './pages/EditEventPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <header className="site-header">
        <Link to="/">Community Hub</Link>
        <Link to="/events/new" className="button">+ Add event</Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<EventListPage />} />
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
