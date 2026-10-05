import { BrowserRouter, NavLink, Route, Routes, Link } from 'react-router-dom'
import { AuthProvider, useAuth } from './AuthContext.jsx'
import HomePage from './pages/HomePage.jsx'
import EventListPage from './pages/EventListPage.jsx'
import EventDetailPage from './pages/EventDetailPage.jsx'
import AddEventPage from './pages/AddEventPage.jsx'
import EditEventPage from './pages/EditEventPage.jsx'
import CityDetailPage from './pages/CityDetailPage.jsx'
import UserDetailPage from './pages/UserDetailPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'

function Nav() {
  const { user, logOut } = useAuth()
  return (
    <header className="site-header">
      <NavLink to="/" className="site-title" end>Community Hub</NavLink>
      <nav className="site-nav">
        <NavLink to="/events" end>Events</NavLink>
        {user ? (
          <>
            <NavLink to="/events/new" className="button button-outline">+ Add event</NavLink>
            <Link to={`/users/${user.userId}`} className="nav-user">{user.userName}</Link>
            <button className="button-ghost" onClick={logOut}>Log out</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/signup" className="button">Sign up</NavLink>
          </>
        )}
      </nav>
    </header>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventListPage />} />
            <Route path="/events/new" element={<AddEventPage />} />
            <Route path="/events/:eventId" element={<EventDetailPage />} />
            <Route path="/events/:eventId/edit" element={<EditEventPage />} />
            <Route path="/cities/:cityId" element={<CityDetailPage />} />
            <Route path="/users/:userId" element={<UserDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<p>Page not found.</p>} />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
